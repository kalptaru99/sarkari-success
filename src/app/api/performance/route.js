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

    const attempts = await pool.query(
      'SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
      [userId]
    );

    const subjectPerformance = await pool.query(
      'SELECT subject, COUNT(*) as total_questions, SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct, SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong, SUM(CASE WHEN is_unattempted THEN 1 ELSE 0 END) as unattempted, ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy FROM question_attempts WHERE user_id = $1 GROUP BY subject ORDER BY accuracy ASC',
      [userId]
    );

    const mistakeBank = await pool.query(
      'SELECT subject, COUNT(*) as mistake_count FROM mistake_bank WHERE user_id = $1 AND is_resolved = false GROUP BY subject ORDER BY mistake_count DESC',
      [userId]
    );

    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    if (attempts.rows.length === 0) {
      return Response.json({
        hasData: false,
        message: 'Take at least one mock test to get AI analysis'
      });
    }

    const performanceData = {
      userName,
      totalMocks: attempts.rows.length,
      recentAttempts: attempts.rows,
      subjectPerformance: subjectPerformance.rows,
      mistakeBank: mistakeBank.rows,
      profile: profile.rows[0] || null,
    };

    const langNote = profile.rows[0]?.preferred_language && profile.rows[0]?.preferred_language !== 'English'
      ? 'Respond in ' + profile.rows[0].preferred_language + ' language.'
      : 'Respond in Hindi or English.';

    const prompt = 'You are an AI Selection Coach for Indian government exam aspirants.\n\n'
      + 'Analyze this student performance data and provide a detailed actionable report.\n\n'
      + 'Student: ' + userName + '\n'
      + 'Total Mock Tests Taken: ' + performanceData.totalMocks + '\n\n'
      + 'Recent Mock Scores:\n'
      + performanceData.recentAttempts.map(function(a) {
          return '- ' + a.exam + ': ' + a.correct + '/' + a.total_questions + ' correct, ' + a.wrong + ' wrong, ' + a.unattempted + ' unattempted (' + Math.round((a.correct/a.total_questions)*100) + '%)';
        }).join('\n')
      + '\n\nSubject-wise Performance:\n'
      + performanceData.subjectPerformance.map(function(s) {
          return '- ' + s.subject + ': ' + s.accuracy + '% accuracy, ' + s.correct + ' correct, ' + s.wrong + ' wrong out of ' + s.total_questions + ' questions';
        }).join('\n')
      + '\n\nMistake Bank (repeated mistakes):\n'
      + performanceData.mistakeBank.map(function(m) {
          return '- ' + m.subject + ': ' + m.mistake_count + ' repeated mistakes';
        }).join('\n')
      + '\n\nProvide analysis in this exact format with no asterisks or special characters:\n\n'
      + 'OVERALL ASSESSMENT\n'
      + '[2-3 sentences about overall performance trend]\n\n'
      + 'TOP 3 WEAKNESSES\n'
      + '1. [Subject/Topic]: [specific problem and evidence from data]\n'
      + '2. [Subject/Topic]: [specific problem and evidence from data]\n'
      + '3. [Subject/Topic]: [specific problem and evidence from data]\n\n'
      + 'TODAY\'S ACTION PLAN\n'
      + '1. [Specific task with time estimate]\n'
      + '2. [Specific task with time estimate]\n'
      + '3. [Specific task with time estimate]\n'
      + '4. [Specific task with time estimate]\n\n'
      + 'THIS WEEK\'S PRIORITY\n'
      + '[Most important thing to focus on this week with reason]\n\n'
      + 'IMPROVEMENT PREDICTION\n'
      + '[If student follows the plan, what score improvement can they expect and in how many days]\n\n'
      + 'Be specific, data-driven, and encouraging. Use the actual numbers from the data. ' + langNote;

    const aiAnalysis = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt,
      }]
    });

    return Response.json({
      hasData: true,
      performanceData,
      aiAnalysis: aiAnalysis.content[0].text,
    });

  } catch (error) {
    console.error('Performance analysis error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}