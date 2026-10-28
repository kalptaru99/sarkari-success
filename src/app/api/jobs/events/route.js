/**
 * GET /api/jobs/events?slug=...  → timeline for a specific job
 * POST /api/jobs/events          → log an event (internal/cron use)
 */

import pool from '@/lib/db.js';

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS opportunity_events (
      id SERIAL PRIMARY KEY,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      event_type TEXT NOT NULL CHECK (event_type IN ('STATUS_CHANGE','DEADLINE_CHANGE','NEW_JOB','VACANCY_CHANGE','NOTIFY_SENT')),
      old_value TEXT,
      new_value TEXT NOT NULL,
      happened_at TIMESTAMPTZ DEFAULT NOW(),
      source TEXT DEFAULT 'system'
    )
  `);
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_opportunity_events_job_id ON opportunity_events(job_id);
    CREATE INDEX IF NOT EXISTS idx_opportunity_events_happened_at ON opportunity_events(happened_at DESC);
  `);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return Response.json({ error: 'slug required' }, { status: 400 });
  }

  try {
    await ensureTable();

    const jobRes = await pool.query(
      'SELECT id FROM jobs WHERE slug = $1 AND is_active = TRUE LIMIT 1',
      [slug]
    );
    if (!jobRes.rows[0]) {
      return Response.json({ events: [] });
    }

    const eventsRes = await pool.query(
      `SELECT event_type, old_value, new_value, happened_at, source
       FROM opportunity_events
       WHERE job_id = $1
       ORDER BY happened_at DESC
       LIMIT 20`,
      [jobRes.rows[0].id]
    );

    return Response.json({ events: eventsRes.rows });
  } catch (error) {
    console.error('Events GET error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  // Internal use — require bearer auth
  const authHeader = request.headers.get('Authorization');
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (authHeader !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { job_id, event_type, old_value, new_value, source } = await request.json();

    if (!job_id || !event_type || !new_value) {
      return Response.json({ error: 'job_id, event_type, new_value required' }, { status: 400 });
    }

    await ensureTable();

    await pool.query(
      `INSERT INTO opportunity_events (job_id, event_type, old_value, new_value, source)
       VALUES ($1, $2, $3, $4, $5)`,
      [job_id, event_type, old_value || null, new_value, source || 'system']
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error('Events POST error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
