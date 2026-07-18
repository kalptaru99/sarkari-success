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
      `SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10`,
      [userId]
    );

    const subjectPerformance = await pool.query(
      `SELECT 
        subject,
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct,
        SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong,
        SUM(CASE WHEN is_unattempted THEN 1 ELSE 0 END) as unattempted,
        ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy
       FROM question_attempts 
       WHERE user_id = $1
       GROUP BY subject
       ORDER BY accuracy ASC`,
      [userId]
    );

    const mistakeBank = await pool.query(
      `SELECT subject, COUNT(*) as mistake_count
       FROM mistake_bank
       WHERE user_id = $1 AND is_resolved = false
       GROUP BY subject
       ORDER BY mistake_count DESC`,
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
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `You are an AI Selection Coach for Indian government exam aspirants.

Analyze this student's performance data and provide a detailed, actionable report.

Student: ${userName}
Total Mock Tests Taken: ${performanceData.totalMocks}

Recent Mock Scores:
${performanceData.recentAttempts.map(a => `- ${a.exam}: ${a.correct}/${a.total_questions} correct, ${a.wrong} wrong, ${a.unattempted} unattempted (${Math.round((a.correct/a.total_questions)*100)}%)`).join('\n')}

Subject-wise Performance:
${performanceData.subjectPerformance.map(s => `- ${s.subject}: ${s.accuracy}% accuracy, ${s.correct} correct, ${s.wrong} wrong out of ${s.total_questions} questions`).join('\n')}

Mistake Bank (repeated mistakes):
${performanceData.mistakeBank.map(m => `- ${m.subject}: ${m.mistake_count} repeated mistakes`).join('\n')}

Provide analysis in this exact format with no asterisks or special characters:

OVERALL ASSESSMENT
[2-3 sentences about overall performance trend]

TOP 3 WEAKNESSES
1. [Subject/Topic]: [specific problem and evidence from data]
2. [Subject/Topic]: [specific problem and evidence from data]  
3. [Subject/Topic]: [specific problem and evidence from data]

TODAY'S ACTION PLAN
1. [Specific task with time estimate]
2. [Specific task with time estimate]
3. [Specific task with time estimate]
4. [Specific task with time estimate]

THIS WEEK'S PRIORITY
[Most important thing to focus on this week with reason]

IMPROVEMENT PREDICTION
[If student follows the plan, what score improvement can they expect and in how many days]

Be specific, data-driven, and encouraging. Use the actual numbers from the data. ` + langNote
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