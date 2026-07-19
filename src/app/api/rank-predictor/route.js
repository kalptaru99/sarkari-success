import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const cutoffData = {
  "SSC CGL": {
    "General": { "2024": 142, "2023": 138, "2022": 144, "2021": 140 },
    "OBC": { "2024": 135, "2023": 131, "2022": 137, "2021": 133 },
    "SC": { "2024": 125, "2023": 121, "2022": 127, "2021": 123 },
    "ST": { "2024": 118, "2023": 114, "2022": 120, "2021": 116 },
    "totalMarks": 200,
    "subjects": ["Quantitative Aptitude", "General Intelligence", "English Language", "General Awareness"],
    "negativeMarking": 0.5,
  },
  "SSC CHSL": {
    "General": { "2024": 132, "2023": 128, "2022": 134, "2021": 130 },
    "OBC": { "2024": 125, "2023": 121, "2022": 127, "2021": 123 },
    "SC": { "2024": 115, "2023": 111, "2022": 117, "2021": 113 },
    "ST": { "2024": 108, "2023": 104, "2022": 110, "2021": 106 },
    "totalMarks": 200,
    "subjects": ["Quantitative Aptitude", "General Intelligence", "English Language", "General Awareness"],
    "negativeMarking": 0.5,
  },
  "RRB NTPC": {
    "General": { "2024": 75, "2023": 72, "2022": 78, "2021": 74 },
    "OBC": { "2024": 70, "2023": 67, "2022": 73, "2021": 69 },
    "SC": { "2024": 63, "2023": 60, "2022": 66, "2021": 62 },
    "ST": { "2024": 58, "2023": 55, "2022": 61, "2021": 57 },
    "totalMarks": 100,
    "subjects": ["Mathematics", "General Intelligence", "General Awareness"],
    "negativeMarking": 0.33,
  },
  "IBPS PO": {
    "General": { "2024": 58, "2023": 55, "2022": 60, "2021": 56 },
    "OBC": { "2024": 54, "2023": 51, "2022": 56, "2021": 52 },
    "SC": { "2024": 47, "2023": 44, "2022": 49, "2021": 45 },
    "ST": { "2024": 43, "2023": 40, "2022": 45, "2021": 41 },
    "totalMarks": 100,
    "subjects": ["Quantitative Aptitude", "Reasoning Ability", "English Language"],
    "negativeMarking": 0.25,
  },
  "SBI PO": {
    "General": { "2024": 62, "2023": 59, "2022": 64, "2021": 60 },
    "OBC": { "2024": 58, "2023": 55, "2022": 60, "2021": 56 },
    "SC": { "2024": 51, "2023": 48, "2022": 53, "2021": 49 },
    "ST": { "2024": 46, "2023": 43, "2022": 48, "2021": 44 },
    "totalMarks": 100,
    "subjects": ["Data Analysis", "Reasoning", "English Language"],
    "negativeMarking": 0.25,
  },
  "BPSC": {
    "General": { "2024": 112, "2023": 108, "2022": 115, "2021": 110 },
    "OBC": { "2024": 105, "2023": 101, "2022": 108, "2021": 103 },
    "SC": { "2024": 95, "2023": 91, "2022": 98, "2021": 93 },
    "ST": { "2024": 88, "2023": 84, "2022": 91, "2021": 86 },
    "totalMarks": 150,
    "subjects": ["GS Paper 1", "GS Paper 2"],
    "negativeMarking": 0,
  },
  "UPPSC": {
    "General": { "2024": 102, "2023": 98, "2022": 105, "2021": 100 },
    "OBC": { "2024": 95, "2023": 91, "2022": 98, "2021": 93 },
    "SC": { "2024": 85, "2023": 81, "2022": 88, "2021": 83 },
    "ST": { "2024": 78, "2023": 74, "2022": 81, "2021": 76 },
    "totalMarks": 150,
    "subjects": ["GS Paper 1", "GS Paper 2"],
    "negativeMarking": 0,
  },
};

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

    const attempts = await pool.query(
      'SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
      [userId]
    );

    const subjectPerformance = await pool.query(
      'SELECT subject, COUNT(*) as total_questions, SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct, SUM(CASE WHEN NOT is_correct AND NOT is_unattempted THEN 1 ELSE 0 END) as wrong, ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy FROM question_attempts WHERE user_id = $1 GROUP BY subject ORDER BY accuracy ASC',
      [userId]
    );

    const targetExam = profile.rows[0]?.preferred_exam || 'SSC CGL';
    const language = profile.rows[0]?.preferred_language || 'Hindi';
    const category = 'General';

    const examCutoffs = cutoffData[targetExam] || cutoffData['SSC CGL'];
    const categoryCutoffs = examCutoffs[category] || examCutoffs['General'];
    const avgCutoff = Math.round(Object.values(categoryCutoffs).reduce((a, b) => a + b, 0) / Object.values(categoryCutoffs).length);
    const latestCutoff = categoryCutoffs['2024'];

    const avgScore = attempts.rows.length > 0
      ? Math.round(attempts.rows.reduce((sum, a) => sum + (a.correct / a.total_questions * examCutoffs.totalMarks), 0) / attempts.rows.length)
      : 0;

    const scoreGap = latestCutoff - avgScore;

    const prompt = 'You are an AI Rank Predictor for Indian government exam aspirants.\n\n'
      + 'Analyze this student data and predict their rank improvement potential.\n\n'
      + 'Student: ' + userName + '\n'
      + 'Target Exam: ' + targetExam + '\n'
      + 'Category: ' + category + '\n'
      + 'Language: ' + language + '\n\n'
      + 'Current Performance:\n'
      + 'Average Mock Score: ' + avgScore + '/' + examCutoffs.totalMarks + '\n'
      + 'Recent Attempts: ' + attempts.rows.length + '\n\n'
      + 'Subject-wise Accuracy:\n'
      + subjectPerformance.rows.map(function(s) { return '- ' + s.subject + ': ' + s.accuracy + '%'; }).join('\n') + '\n\n'
      + 'Cutoff Data for ' + targetExam + ' (' + category + ' category):\n'
      + Object.entries(categoryCutoffs).map(function(entry) { return entry[0] + ': ' + entry[1] + '/' + examCutoffs.totalMarks; }).join('\n') + '\n'
      + 'Average Cutoff: ' + avgCutoff + '/' + examCutoffs.totalMarks + '\n'
      + 'Latest Cutoff (2024): ' + latestCutoff + '/' + examCutoffs.totalMarks + '\n'
      + 'Score Gap: ' + scoreGap + ' marks\n\n'
      + 'Provide a rank prediction analysis in this exact format:\n\n'
      + 'CURRENT STATUS\n'
      + '[Current score vs cutoff assessment]\n\n'
      + 'RANK IMPROVEMENT POTENTIAL\n'
      + '[If student improves specific subjects, what rank improvement is possible]\n\n'
      + 'SUBJECT-WISE IMPACT\n'
      + '[For each weak subject: if improved by X marks, rank improves by Y positions]\n\n'
      + 'SELECTION PROBABILITY\n'
      + '[Honest assessment of selection chances based on current trajectory]\n\n'
      + 'ACTION PLAN FOR RANK IMPROVEMENT\n'
      + '[3-4 specific actions that will improve rank the most]\n\n'
      + 'DAYS TO CUTOFF LEVEL\n'
      + '[Realistic estimate of days needed to reach cutoff score]\n\n'
      + 'Write in ' + language + ' language. Be honest, specific and encouraging.';

    const aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    return Response.json({
      success: true,
      userName,
      targetExam,
      category,
      avgScore,
      totalMarks: examCutoffs.totalMarks,
      latestCutoff,
      avgCutoff,
      scoreGap,
      subjectPerformance: subjectPerformance.rows,
      cutoffHistory: categoryCutoffs,
      aiAnalysis: aiResponse.content[0].text,
      language,
    });

  } catch (error) {
    console.error('Rank predictor error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}