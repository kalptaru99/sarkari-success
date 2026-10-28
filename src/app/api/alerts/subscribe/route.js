/**
 * POST /api/alerts/subscribe
 *   Body: { email, categories: ['SSC','Railway',...] }
 *   Subscribe user to job alerts for selected categories.
 *
 * DELETE /api/alerts/subscribe?email=...&token=...
 *   Unsubscribe.
 */

import pool from '@/lib/db.js';
import crypto from 'crypto';

function generateToken(email) {
  return crypto.createHmac('sha256', process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026')
    .update(email.toLowerCase())
    .digest('hex')
    .substring(0, 32);
}

// Ensure table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_alert_subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      categories TEXT[] NOT NULL DEFAULT '{}',
      token TEXT NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(email)
    )
  `);
}

export async function POST(request) {
  try {
    const { email, categories } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 });
    }

    const cats = Array.isArray(categories) && categories.length > 0
      ? categories
      : ['SSC', 'Railway', 'Banking', 'UPSC', 'Defence', 'State PSC', 'PSU', 'Teaching'];

    await ensureTable();

    const token = generateToken(email);

    // Upsert — update categories if already subscribed
    await pool.query(`
      INSERT INTO job_alert_subscribers (email, categories, token, is_active)
      VALUES ($1, $2, $3, TRUE)
      ON CONFLICT (email) DO UPDATE
        SET categories = $2, is_active = TRUE, token = $3, updated_at = NOW()
    `, [email.toLowerCase(), cats, token]);

    return Response.json({ success: true, message: 'Subscribed! You will get alerts for new job notifications.' });

  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      return Response.json({ error: 'Email and token required' }, { status: 400 });
    }

    const expectedToken = generateToken(email);
    if (token !== expectedToken) {
      return Response.json({ error: 'Invalid token' }, { status: 403 });
    }

    await pool.query(
      `UPDATE job_alert_subscribers SET is_active = FALSE, updated_at = NOW() WHERE email = $1`,
      [email.toLowerCase()]
    );

    return Response.json({ success: true, message: 'Unsubscribed successfully.' });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
