/**
 * POST /api/push/subscribe   — save a browser push subscription
 * DELETE /api/push/subscribe — remove a subscription
 *
 * Body: { subscription: PushSubscription JSON }
 */

import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id SERIAL PRIMARY KEY,
      endpoint TEXT NOT NULL UNIQUE,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      user_email TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      last_used_at TIMESTAMPTZ
    )
  `);
}

export async function POST(request) {
  try {
    await ensureTable();

    const { subscription } = await request.json();
    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth) {
      return Response.json({ error: 'Invalid subscription object' }, { status: 400 });
    }

    // Optionally associate with logged-in user
    const session = await getServerSession().catch(() => null);
    const userEmail = session?.user?.email || null;

    await pool.query(
      `INSERT INTO push_subscriptions (endpoint, p256dh, auth, user_email)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (endpoint) DO UPDATE SET
         p256dh = EXCLUDED.p256dh,
         auth = EXCLUDED.auth,
         user_email = COALESCE(EXCLUDED.user_email, push_subscriptions.user_email)`,
      [subscription.endpoint, subscription.keys.p256dh, subscription.keys.auth, userEmail]
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Push subscribe error:', err);
    return Response.json({ error: 'Failed to save subscription' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { subscription } = await request.json();
    if (!subscription?.endpoint) {
      return Response.json({ error: 'Missing endpoint' }, { status: 400 });
    }

    await pool.query(
      `DELETE FROM push_subscriptions WHERE endpoint = $1`,
      [subscription.endpoint]
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Push unsubscribe error:', err);
    return Response.json({ error: 'Failed to remove subscription' }, { status: 500 });
  }
}
