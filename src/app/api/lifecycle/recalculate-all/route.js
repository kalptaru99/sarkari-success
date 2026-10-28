/**
 * GET /api/lifecycle/recalculate-all
 *     Cron endpoint — runs nightly at 2am IST (20:30 UTC).
 *     Recalculates lifecycle_status for ALL active jobs.
 *     - Fixes stale NEW labels
 *     - Marks expired jobs as CLOSED
 *     - Flags CLOSING_SOON jobs
 *
 * Auth: Bearer CRON_SECRET (set in Vercel env vars)
 * Also callable from admin panel.
 */

import pool from '@/lib/db.js';
import { calculateLifecycleStatus } from '@/lib/lifecycle.js';

export async function GET(request) {
  // Auth: Vercel cron sends Authorization header, or admin can call with secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const startTime = Date.now();
  const stats = {
    total: 0,
    updated: 0,
    unchanged: 0,
    errors: 0,
    changes: {
      NEW_to_OPEN: 0,
      NEW_to_CLOSING_SOON: 0,
      NEW_to_CLOSED: 0,
      OPEN_to_CLOSING_SOON: 0,
      OPEN_to_CLOSED: 0,
      CLOSING_SOON_to_CLOSED: 0,
      other: 0,
    },
  };

  try {
    // Fetch all active, non-duplicate jobs
    const jobsResult = await pool.query(
      `SELECT id, title, org, slug, last_date, created_at, lifecycle_status, is_new
       FROM jobs
       WHERE is_active = TRUE AND (is_duplicate = FALSE OR is_duplicate IS NULL)
       ORDER BY id`
    );

    const jobs = jobsResult.rows;
    stats.total = jobs.length;

    // Batch fetch all events to avoid N+1 queries
    let eventsMap = {};
    try {
      const eventsResult = await pool.query(
        `SELECT job_id, event_type, event_date
         FROM opportunity_events
         WHERE job_id = ANY($1)`,
        [jobs.map(j => j.id)]
      );
      for (const event of eventsResult.rows) {
        if (!eventsMap[event.job_id]) eventsMap[event.job_id] = [];
        eventsMap[event.job_id].push(event);
      }
    } catch {
      // opportunity_events table doesn't exist yet — that's OK
      eventsMap = {};
    }

    // Process in batches of 50 to avoid overwhelming DB
    const BATCH_SIZE = 50;
    const auditRows = [];

    for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
      const batch = jobs.slice(i, i + BATCH_SIZE);

      // Build update queries for this batch
      const updates = [];

      for (const job of batch) {
        try {
          const events = eventsMap[job.id] || [];
          const { status } = calculateLifecycleStatus(job, events);
          const oldStatus = job.lifecycle_status || 'OPEN';

          if (status !== oldStatus) {
            updates.push({ id: job.id, status, oldStatus, isNew: status === 'NEW' });

            // Track change type
            const changeKey = `${oldStatus}_to_${status}`;
            if (stats.changes[changeKey] !== undefined) {
              stats.changes[changeKey]++;
            } else {
              stats.changes.other++;
            }

            auditRows.push([job.id, oldStatus, status]);
          } else {
            stats.unchanged++;
          }
        } catch (err) {
          console.error(`Error calculating status for job ${job.id}:`, err);
          stats.errors++;
        }
      }

      // Bulk update this batch
      if (updates.length > 0) {
        for (const upd of updates) {
          await pool.query(
            `UPDATE jobs
             SET lifecycle_status = $1,
                 status_updated_at = NOW(),
                 is_new = $2,
                 updated_at = NOW()
             WHERE id = $3`,
            [upd.status, upd.isNew, upd.id]
          );
          stats.updated++;
        }
      }
    }

    // Write audit entries + opportunity_events for changes
    if (auditRows.length > 0) {
      // Ensure opportunity_events table exists
      try {
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
      } catch { /* already exists */ }

      for (const [jobId, oldStatus, newStatus] of auditRows) {
        // Log to opportunity_events
        try {
          await pool.query(
            `INSERT INTO opportunity_events (job_id, event_type, old_value, new_value, source)
             VALUES ($1, 'STATUS_CHANGE', $2, $3, 'cron:lifecycle')`,
            [jobId, oldStatus, newStatus]
          );
        } catch (e) {
          console.error('opportunity_events insert error:', e.message);
        }

        // Legacy audit_log
        try {
          await pool.query(
            `INSERT INTO audit_log (table_name, record_id, action, field_name, old_value, new_value, changed_by, change_reason)
             VALUES ('jobs', $1, 'UPDATE', 'lifecycle_status', $2, $3, 'cron:recalculate-all', 'Nightly lifecycle recalculation')`,
            [jobId, oldStatus, newStatus]
          );
        } catch {
          // audit_log may not exist yet
        }
      }

      // Notify saved-job followers whose jobs changed status
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarkarisuccess.com';
        const changedJobIds = auditRows.map(r => r[0]);
        await fetch(`${siteUrl}/api/alerts/lifecycle-notify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`,
          },
          body: JSON.stringify({ changedJobIds, changes: auditRows.map(([id, old, nw]) => ({ job_id: id, old_status: old, new_status: nw })) }),
        });
      } catch (e) {
        console.error('lifecycle-notify call error:', e.message);
      }
    }

    const durationMs = Date.now() - startTime;

    return Response.json({
      success: true,
      stats,
      duration_ms: durationMs,
      ran_at: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Recalculate-all error:', error);
    return Response.json({ error: 'Something went wrong', detail: error.message }, { status: 500 });
  }
}
