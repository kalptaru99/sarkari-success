import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return Response.json({ error: 'Login required' }, { status: 401 });
    }

    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [session.user.email]
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    const profile = await pool.query(
      'SELECT * FROM student_profiles WHERE user_id = $1',
      [userId]
    );

    return Response.json({
      profile: profile.rows[0] || null
    });

  } catch (error) {
    console.error('Get profile error:', error);
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

    if (userResult.rows.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = userResult.rows[0].id;

    const {
      preferred_exam,
      preferred_language,
      daily_study_hours,
      exam_date,
      state,
    } = await request.json();

    await pool.query(
      `INSERT INTO student_profiles 
        (user_id, preferred_exam, preferred_language, daily_study_hours, exam_date, state, last_active)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_DATE)
       ON CONFLICT (user_id) DO UPDATE SET
         preferred_exam = $2,
         preferred_language = $3,
         daily_study_hours = $4,
         exam_date = $5,
         state = $6,
         last_active = CURRENT_DATE,
         updated_at = NOW()`,
      [userId, preferred_exam, preferred_language, daily_study_hours, exam_date || null, state]
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error('Save profile error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}