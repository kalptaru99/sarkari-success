/**
 * GET  /api/jobs/save?slug=...   → is this job saved by current user?
 * POST /api/jobs/save            → save a job { slug }
 * DELETE /api/jobs/save?slug=... → unsave a job
 * GET  /api/jobs/save?all=true   → return all saved job slugs for user
 */

import pool from '@/lib/db.js';
import { getServerSession } from 'next-auth';

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS saved_jobs (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      saved_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, job_id)
    )
  `);
}

async function getUserId(email) {
  const r = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  return r.rows[0]?.id || null;
}

async function getJobId(slug) {
  const r = await pool.query('SELECT id FROM jobs WHERE slug = $1 AND is_active = TRUE', [slug]);
  return r.rows[0]?.id || null;
}

export async function GET(request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json({ error: 'Login required' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const all = searchParams.get('all') === 'true';

  try {
    await ensureTable();
    const userId = await getUserId(session.user.email);
    if (!userId) return Response.json({ error: 'User not found' }, { status: 404 });

    if (all) {
      // Return all saved jobs with full details
      const result = await pool.query(
        `SELECT j.slug, j.title, j.org, j.vacancies, j.last_date, j.category,
                j.lifecycle_status, j.apply_link, sj.saved_at
         FROM saved_jobs sj
         JOIN jobs j ON j.id = sj.job_id
         WHERE sj.user_id = $1
         ORDER BY sj.saved_at DESC`,
        [userId]
      );
      return Response.json({ saved: result.rows });
    }

    if (slug) {
      const jobId = await getJobId(slug);
      if (!jobId) return Response.json({ saved: false });
      const result = await pool.query(
        'SELECT id FROM saved_jobs WHERE user_id = $1 AND job_id = $2',
        [userId, jobId]
      );
      return Response.json({ saved: result.rows.length > 0 });
    }

    return Response.json({ error: 'Provide slug or all=true' }, { status: 400 });
  } catch (error) {
    console.error('Save GET error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json({ error: 'Login required' }, { status: 401 });
  }

  try {
    const { slug } = await request.json();
    await ensureTable();

    const userId = await getUserId(session.user.email);
    const jobId = await getJobId(slug);

    if (!userId) return Response.json({ error: 'User not found' }, { status: 404 });
    if (!jobId) return Response.json({ error: 'Job not found' }, { status: 404 });

    await pool.query(
      `INSERT INTO saved_jobs (user_id, job_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [userId, jobId]
    );

    return Response.json({ success: true, saved: true });
  } catch (error) {
    console.error('Save POST error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json({ error: 'Login required' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    await ensureTable();
    const userId = await getUserId(session.user.email);
    const jobId = await getJobId(slug);

    if (!userId || !jobId) return Response.json({ success: true });

    await pool.query(
      'DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2',
      [userId, jobId]
    );

    return Response.json({ success: true, saved: false });
  } catch (error) {
    console.error('Save DELETE error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
