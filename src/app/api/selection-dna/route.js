import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id, name, created_at FROM users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;
    const userName = userResult.rows[0].name;
    const joinDate = userResult.rows[0].created_at;

    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    const attempts = await pool.query(
      'SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at ASC',
      [userId]
    );

    const subjectPerformance = await pool.query(
      'SELECT subject, COUNT(*) as total, SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct, SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong, SUM(CASE WHEN is_unattempted THEN 1 ELSE 0 END) as unattempted, ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy FROM question_attempts WHERE user_id = $1 GROUP BY subject ORDER BY accuracy DESC',
      [userId]
    );

    const mistakeBank = await pool.query(
      'SELECT subject, COUNT(*) as mistakes FROM mistake_bank WHERE user_id = $1 GROUP BY subject ORDER BY mistakes DESC',
      [userId]
    );

    const dailyMissions = await pool.query(
      'SELECT COUNT(*) as total, SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed FROM daily_missions WHERE user_id = $1',
      [userId]
    );

    if (attempts.rows.length === 0) {
      return Response.json({ hasData: false });
    }

    const scores = attempts.rows.map(a => Math.round((a.correct / a.total_questions) * 100));
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);
    const trend = scores.length >= 3
      ? scores[scores.length - 1] > scores[0] ? 'improving' : scores[scores.length - 1] < scores[0] ? 'declining' : 'stable'
      : 'stable';

    const strongSubjects = subjectPerformance.rows.filter(s => parseFloat(s.accuracy) >= 70);
    const weakSubjects = subjectPerformance.rows.filter(s => parseFloat(s.accuracy) < 40);

    const studentData = {
      name: userName,
      joinDate,
      targetExam: profile.rows[0]?.preferred_exam || 'SSC CGL',
      language: profile.rows[0]?.preferred_language || 'Hindi',
      studyHours: profile.rows[0]?.daily_study_hours || 4,
      examDate: profile.rows[0]?.exam_date,
      totalMocks: attempts.rows.length,
      avgScore,
      maxScore,
      minScore,
      trend,
      strongSubjects,
      weakSubjects,
      totalQuestions: subjectPerformance.rows.reduce((sum, s) => sum + parseInt(s.total), 0),
      totalMistakes: mistakeBank.rows.reduce((sum, m) => sum + parseInt(m.mistakes), 0),
      missionsCompleted: parseInt(dailyMissions.rows[0]?.completed) || 0,
      missionsTotal: parseInt(dailyMissions.rows[0]?.total) || 0,
    };

    const prompt = 'You are an AI Selection DNA analyzer for Indian government exam aspirants.\n\n'
      + 'Create a comprehensive Selection DNA profile for this student.\n\n'
      + 'Student: ' + studentData.name + '\n'
      + 'Target Exam: ' + studentData.targetExam + '\n'
      + 'Member Since: ' + new Date(studentData.joinDate).toLocaleDateString('en-IN') + '\n'
      + 'Total Mock Tests: ' + studentData.totalMocks + '\n'
      + 'Average Score: ' + studentData.avgScore + '%\n'
      + 'Best Score: ' + studentData.maxScore + '%\n'
      + 'Lowest Score: ' + studentData.minScore + '%\n'
      + 'Performance Trend: ' + studentData.trend + '\n'
      + 'Strong Subjects: ' + (studentData.strongSubjects.map(s => s.subject + ' (' + s.accuracy + '%)').join(', ') || 'None yet') + '\n'
      + 'Weak Subjects: ' + (studentData.weakSubjects.map(s => s.subject + ' (' + s.accuracy + '%)').join(', ') || 'None identified') + '\n'
      + 'Total Questions Attempted: ' + studentData.totalQuestions + '\n'
      + 'Total Mistakes: ' + studentData.totalMistakes + '\n'
      + 'Daily Missions Completed: ' + studentData.missionsCompleted + '/' + studentData.missionsTotal + '\n\n'
      + 'Create their Selection DNA profile in this exact format:\n\n'
      + 'DNA PROFILE TITLE\n'
      + '[Give student a unique profile title based on their performance e.g. "The Consistent Warrior" or "The Rising Star"]\n\n'
      + 'SPEED PROFILE\n'
      + '[Fast/Average/Slow — based on time taken per question]\n\n'
      + 'ACCURACY PROFILE\n'
      + '[High/Medium/Low — based on correct percentage]\n\n'
      + 'CONSISTENCY PROFILE\n'
      + '[Regular/Irregular/Just Started — based on mock frequency]\n\n'
      + 'STRENGTH DNA\n'
      + '[Top 2-3 strongest areas with specific details]\n\n'
      + 'WEAKNESS DNA\n'
      + '[Top 2-3 weakest areas with specific improvement actions]\n\n'
      + 'LEARNING STYLE\n'
      + '[Practice-based/Theory-based/Mixed — based on performance patterns]\n\n'
      + 'SELECTION READINESS SCORE\n'
      + '[Score out of 100 with breakdown]\n\n'
      + 'UNIQUE INSIGHT\n'
      + '[One unique observation about this student that nobody else would know]\n\n'
      + 'PERSONALIZED MOTTO\n'
      + '[A short motivational motto personalized for this student]\n\n'
      + 'Write in ' + studentData.language + ' language. Be insightful, specific and encouraging.';

    const aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    return Response.json({
      hasData: true,
      studentData,
      aiDNA: aiResponse.content[0].text,
    });

  } catch (error) {
    console.error('Selection DNA error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}