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

    const today = new Date().toISOString().split('T')[0];
    const existing = await pool.query(
      'SELECT * FROM daily_missions WHERE user_id = $1 AND mission_date = $2',
      [userId, today]
    );

    if (existing.rows.length > 0) {
      return Response.json({ mission: existing.rows[0] });
    }

    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    const attempts = await pool.query(
      'SELECT * FROM mock_attempts WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );

    const subjectPerformance = await pool.query(
      'SELECT subject, ROUND(AVG(CASE WHEN is_correct THEN 100.0 ELSE 0 END), 1) as accuracy FROM question_attempts WHERE user_id = $1 GROUP BY subject ORDER BY accuracy ASC LIMIT 3',
      [userId]
    );

    const studentData = {
      name: userName,
      targetExam: profile.rows[0]?.preferred_exam || 'SSC CGL',
      language: profile.rows[0]?.preferred_language || 'Hindi',
      studyHours: profile.rows[0]?.daily_study_hours || 4,
      examDate: profile.rows[0]?.exam_date || null,
      totalMocks: attempts.rows.length,
      weakSubjects: subjectPerformance.rows,
    };

    const daysUntilExam = studentData.examDate
      ? Math.ceil((new Date(studentData.examDate) - new Date()) / (1000 * 60 * 60 * 24))
      : null;

    const prompt = 'You are an AI Daily Mission Generator for Indian government exam aspirants.\n\n'
      + 'Generate a personalized study mission for today based on this student data:\n\n'
      + 'Student: ' + studentData.name + '\n'
      + 'Target Exam: ' + studentData.targetExam + '\n'
      + 'Daily Study Hours Available: ' + studentData.studyHours + ' hours\n'
      + (daysUntilExam ? 'Days Until Exam: ' + daysUntilExam + ' days\n' : '')
      + 'Weak Subjects: ' + (studentData.weakSubjects.length > 0
        ? studentData.weakSubjects.map(function(s) { return s.subject + ' (' + s.accuracy + '% accuracy)'; }).join(', ')
        : 'Not enough data yet — generate general mission')
      + '\n\nGenerate exactly 4-5 tasks. Return ONLY a JSON array like this:\n'
      + '[\n'
      + '  {\n'
      + '    "task": "Task description in ' + studentData.language + '",\n'
      + '    "duration": "30 minutes",\n'
      + '    "subject": "Quantitative Aptitude",\n'
      + '    "priority": "high",\n'
      + '    "reason": "Why this task is important today in ' + studentData.language + '"\n'
      + '  }\n'
      + ']\n\n'
      + 'Priority must be: high, medium, or low\n'
      + 'Tasks must be specific and actionable\n'
      + 'Total time must not exceed ' + studentData.studyHours + ' hours\n'
      + 'Write task and reason in ' + studentData.language + ' language\n'
      + 'Return ONLY the JSON array, nothing else';

    const aiResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    const text = aiResponse.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const tasks = JSON.parse(clean);

    const mission = await pool.query(
      'INSERT INTO daily_missions (user_id, mission_date, tasks) VALUES ($1, $2, $3) RETURNING *',
      [userId, today, JSON.stringify(tasks)]
    );

    return Response.json({ mission: mission.rows[0] });

  } catch (error) {
    console.error('Daily mission error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    );

    const userId = userResult.rows[0].id;
    const { taskIndex } = await request.json();
    const today = new Date().toISOString().split('T')[0];

    const mission = await pool.query(
      'SELECT * FROM daily_missions WHERE user_id = $1 AND mission_date = $2',
      [userId, today]
    );

    if (mission.rows.length === 0) {
      return Response.json({ error: 'No mission found' }, { status: 404 });
    }

    const completedTasks = mission.rows[0].completed_tasks || [];
    if (!completedTasks.includes(taskIndex)) {
      completedTasks.push(taskIndex);
    }

    const tasks = mission.rows[0].tasks;
    const isCompleted = completedTasks.length >= tasks.length;

    await pool.query(
      'UPDATE daily_missions SET completed_tasks = $1, is_completed = $2 WHERE user_id = $3 AND mission_date = $4',
      [JSON.stringify(completedTasks), isCompleted, userId, today]
    );

    return Response.json({ success: true, completedTasks, isCompleted });

  } catch (error) {
    console.error('Complete task error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}