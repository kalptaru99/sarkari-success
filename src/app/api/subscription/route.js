import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

export async function GET(request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return Response.json({ hasSubscription: false, reason: 'not_logged_in' });
    }

    const result = await pool.query(
      `SELECT * FROM subscriptions 
       WHERE user_id = $1 
       AND status = 'active' 
       AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [session.user.email]
    );

    if (result.rows.length > 0) {
      return Response.json({ 
        hasSubscription: true, 
        plan: result.rows[0].plan,
        expires_at: result.rows[0].expires_at 
      });
    }

    return Response.json({ hasSubscription: false, reason: 'no_active_subscription' });

  } catch (error) {
    console.error('Subscription check error:', error);
    return Response.json({ hasSubscription: false, reason: 'error' });
  }
}