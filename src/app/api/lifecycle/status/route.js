/**
 * GET  /api/lifecycle/status?job_id=123
 *      Returns current lifecycle status + events for one job.
 *
 * POST /api/lifecycle/status
 *      Body: { job_id: 123 }
 *      Recalculates status for one job and persists it to DB.
 *      Admin-only (requires CRON_SECRET or admin session).
 */

import pool from '@/lib/db.js';
import { calculateLifecycleStatus } from '@/lib/lifecycle.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('job_id');
    const slug = searchParams.get('slug');

    if (!jobId && !slug) {
      return Response.json({ error: 'Provide job_id or slug' }, { status: 400 });
    }

    // Fetch job
    let jobResult;
    if (slug) {
      jobResult = await pool.query(
        'SELECT * FROM jobs WHERE slug = $1 AND is_active = TRUE',
        [slug]
      );
    } else {
      jobResult = await pool.query(
        'SELECT * FROM jobs WHERE id = $1 AND is_active = TRUE',
        [parseInt(jobId)]
      );
    }

    if (jobResult.rows.length === 0) {
      return Response.json({ error: 'Job not found' }, { status: 404 });
    }

    const job = jobResult.rows[0];

    // Fetch events
    let events = [];
    try {
      const eventsResult = await pool.query(
        'SELECT * FROM opportunity_events WHERE job_id = $1 ORDER BY event_date ASC',
        [job.id]
      );
      events = eventsResult.rows;
    } catch {
      // Table may not exist yet — non-fatal
      events = [];
    }

    // Calculate status
    const statusResult = calculateLifecycleStatus(job, events);

    // Fetch facts if table exists
    let facts = [];
    try {
      const factsResult = await pool.query(
        'SELECT fact_key, fact_value, fact_unit, is_verified FROM opportunity_facts WHERE job_id = $1 AND superseded_by IS NULL',
        [job.id]
      );
      facts = factsResult.rows;
    } catch {
      facts = [];
    }

    return Response.json({
      job_id: job.id,
      slug: job.slug,
      title: job.title,
      org: job.org,
      lifecycle: {
        ...statusResult,
        db_status: job.lifecycle_status,
        status_updated_at: job.status_updated_at,
        human_verified: job.human_verified || false,
      },
      events,
      facts,
    });

  } catch (error) {
    console.error('Lifecycle status GET error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Auth check
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { job_id } = await request.json();
    if (!job_id) {
      return Response.json({ error: 'job_id required' }, { status: 400 });
    }

    const jobResult = await pool.query('SELECT * FROM jobs WHERE id = $1', [job_id]);
    if (jobResult.rows.length === 0) {
      return Response.json({ error: 'Job not found' }, { status: 404 });
    }

    const job = jobResult.rows[0];

    // Fetch events
    let events = [];
    try {
      const eventsResult = await pool.query(
        'SELECT * FROM opportunity_events WHERE job_id = $1',
        [job.id]
      );
      events = eventsResult.rows;
    } catch {
      events = [];
    }

    const { status } = calculateLifecycleStatus(job, events);
    const oldStatus = job.lifecycle_status;

    // Persist new status
    await pool.query(
      `UPDATE jobs
       SET lifecycle_status = $1,
           status_updated_at = NOW(),
           is_new = $2,
           updated_at = NOW()
       WHERE id = $3`,
      [
        status,
        status === 'NEW',
        job.id,
      ]
    );

    // Write to audit_log
    if (status !== oldStatus) {
      try {
        await pool.query(
          `INSERT INTO audit_log (table_name, record_id, action, field_name, old_value, new_value, changed_by, change_reason)
           VALUES ('jobs', $1, 'UPDATE', 'lifecycle_status', $2, $3, 'system:lifecycle', 'Automated recalculation')`,
          [job.id, oldStatus, status]
        );
      } catch {
        // audit_log may not exist yet
      }
    }

    return Response.json({
      success: true,
      job_id: job.id,
      old_status: oldStatus,
      new_status: status,
      changed: status !== oldStatus,
    });

  } catch (error) {
    console.error('Lifecycle status POST error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
