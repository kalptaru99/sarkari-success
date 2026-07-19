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
      'SELECT id, name FROM users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;
    const userName = userResult.rows[0].name;

    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    const subjectPerformance = await pool.query(
      `SELECT 
        subject,
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
        SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong,
        ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy
       FROM question_attempts 
       WHERE user_id = $1
       GROUP BY subject
       ORDER BY accuracy ASC`,
      [userId]
    );

    const mistakeBank = await pool.query(
      `SELECT subject, topic, COUNT(*) as mistake_count
       FROM mistake_bank
       WHERE user_id = $1 AND is_resolved = false
       GROUP BY subject, topic
       ORDER BY mistake_count DESC
       LIMIT 10`,
      [userId]
    );

    const recentAttempts = await pool.query(
      'SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );

    const studentData = {
      name: userName,
      targetExam: profile.rows[0]?.preferred_exam || 'SSC CGL',
      language: profile.rows[0]?.preferred_language || 'Hindi',
      studyHours: profile.rows[0]?.daily_study_hours || 4,
      examDate: profile.rows[0]?.exam_date || null,
      subjectPerformance: subjectPerformance.rows,
      mistakeBank: mistakeBank.rows,
      totalMocks: recentAttempts.rows.length,
    };

    const daysUntilExam = studentData.examDate
      ? Math.ceil((new Date(studentData.examDate) - new Date()) / (1000 * 60 * 60 * 24))
      : null;

    const prompt = 'You are an AI Revision Planner for Indian government exam aspirants.\n\n'
      + 'Create a smart 7-day revision plan for this student.\n\n'
      + 'Student: ' + studentData.name + '\n'
      + 'Target Exam: ' + studentData.targetExam + '\n'
      + 'Daily Study Hours: ' + studentData.studyHours + '\n'
      + (daysUntilExam ? 'Days Until Exam: ' + daysUntilExam + '\n' : '')
      + 'Subject Performance:\n'
      + studentData.subjectPerformance.map(s => '- ' + s.subject + ': ' + s.accuracy + '% accuracy').join('\n')
      + '\nRepeated Mistakes:\n'
      + studentData.mistakeBank.map(m => '- ' + m.subject + ': ' + m.mistake_count + ' mistakes').join('\n')
      + '\n\nCreate a 7-day revision plan. Return ONLY a JSON array:\n'
      + '[\n'
      + '  {\n'
      + '    "day": 1,\n'
      + '    "day_name": "Day name in ' + studentData.language + '",\n'
      + '    "focus": "Main subject to focus",\n'
      + '    "topics": ["topic1", "topic2", "topic3"],\n'
      + '    "duration": "2 hours",\n'
      + '    "priority": "high",\n'
      + '    "reason": "Why this day focuses on this subject in ' + studentData.language + '",\n'
      + '    "skip": "What to skip today and why"\n'
      + '  }\n'
      + ']\n\n'
      + 'Rules:\n'
      + '- Weakest subjects get more days\n'
      + '- Strongest subjects get 1 day max\n'
      + '- Last 2 days should be revision and mock test\n'
      + '- Write day_name and reason in ' + studentData.language + '\n'
      + '- Return ONLY JSON, nothing else';

    const aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = aiResponse.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const revisionPlan = JSON.parse(clean);

    return Response.json({
      success: true,
      revisionPlan,
      studentData,
      daysUntilExam,
    });

  } catch (error) {
    console.error('Revision plan error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}