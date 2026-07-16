import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    const session = await getServerSession();
    const { exam, score, total, timeTaken } = await request.json();

    if (session?.user?.email) {
      const userResult = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [session.user.email]
      );

      if (userResult.rows.length > 0) {
        const userId = userResult.rows[0].id;
        await pool.query(
          'INSERT INTO mock_results (user_id, exam, score, total, time_taken) VALUES ($1, $2, $3, $4, $5)',
          [userId, exam, score, total, timeTaken]
        );
      }
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Save result error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}