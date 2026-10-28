/**
 * GET /api/admin/health
 * Returns error rate, freshness SLA, and retention metrics for admin dashboard.
 */

import pool from '@/lib/db.js';

export async function GET(request) {
  const referer = request.headers.get('referer') || '';
  const auth = request.headers.get('authorization') || '';
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (!referer.includes('/manage-ss-2026-xk9') && auth !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  const [
    freshnessRes,
    missingFieldsRes,
    lifecycleDistRes,
    subscribersRes,
    pushSubsRes,
    emailBatchesRes,
    openEventsRes,
    recentJobsRes,
  ] = await Promise.all([
    // Freshness SLA: how many active jobs haven't been updated in >24h
    pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '24 hours') AS fresh_24h,
        COUNT(*) FILTER (WHERE updated_at > NOW() - INTERVAL '48 hours') AS fresh_48h,
        COUNT(*) FILTER (WHERE updated_at <= NOW() - INTERVAL '48 hours') AS stale,
        COUNT(*) AS total_active,
        AVG(EXTRACT(EPOCH FROM (NOW() - updated_at))/3600)::NUMERIC(6,1) AS avg_hours_since_update
      FROM jobs
      WHERE is_active = TRUE AND (is_duplicate = FALSE OR is_duplicate IS NULL)
    `).catch(() => ({ rows: [{}] })),

    // Missing critical fields
    pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE last_date IS NULL OR last_date = '') AS missing_last_date,
        COUNT(*) FILTER (WHERE apply_link IS NULL OR apply_link = '') AS missing_apply_link,
        COUNT(*) FILTER (WHERE vacancies IS NULL OR vacancies = '') AS missing_vacancies,
        COUNT(*) FILTER (WHERE notification_link IS NULL OR notification_link = '') AS missing_notification_link,
        COUNT(*) AS total_active
      FROM jobs
      WHERE is_active = TRUE AND lifecycle_status IN ('NEW','OPEN','CLOSING_SOON')
    `).catch(() => ({ rows: [{}] })),

    // Lifecycle distribution
    pool.query(`
      SELECT lifecycle_status, COUNT(*) AS count
      FROM jobs
      WHERE is_active = TRUE AND (is_duplicate = FALSE OR is_duplicate IS NULL)
      GROUP BY lifecycle_status
      ORDER BY count DESC
    `).catch(() => ({ rows: [] })),

    // Email subscribers: total, new last 7d, new last 30d
    pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') AS new_7d,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') AS new_30d,
        COUNT(*) FILTER (WHERE last_sent_at IS NOT NULL) AS ever_sent
      FROM job_alert_subscribers
      WHERE is_active = TRUE
    `).catch(() => ({ rows: [{}] })),

    // Push subscribers
    pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days') AS new_7d,
        COUNT(*) FILTER (WHERE last_used_at IS NOT NULL) AS ever_reached
      FROM push_subscriptions
    `).catch(() => ({ rows: [{}] })),

    // Email batches: last 10
    pool.query(`
      SELECT id, sent_at, recipient_count, job_count, opens, clicks
      FROM email_batches
      ORDER BY sent_at DESC
      LIMIT 10
    `).catch(() => ({ rows: [] })),

    // Open events last 30d
    pool.query(`
      SELECT
        COUNT(*) AS total_opens,
        COUNT(DISTINCT email_hash) AS unique_openers,
        DATE_TRUNC('day', created_at) AS day
      FROM email_events
      WHERE event_type = 'open' AND created_at > NOW() - INTERVAL '30 days'
      GROUP BY day
      ORDER BY day DESC
    `).catch(() => ({ rows: [] })),

    // Jobs added in last 7d
    pool.query(`
      SELECT DATE_TRUNC('day', created_at) AS day, COUNT(*) AS count
      FROM jobs
      WHERE created_at > NOW() - INTERVAL '7 days'
      GROUP BY day
      ORDER BY day DESC
    `).catch(() => ({ rows: [] })),
  ]);

  const freshness = freshnessRes.rows[0] || {};
  const missing = missingFieldsRes.rows[0] || {};
  const totalActive = parseInt(freshness.total_active) || 0;
  const freshCount = parseInt(freshness.fresh_24h) || 0;
  const slaPct = totalActive > 0 ? Math.round((freshCount / totalActive) * 100) : 0;

  return Response.json({
    generated_at: now.toISOString(),
    freshness: {
      fresh_24h: parseInt(freshness.fresh_24h) || 0,
      fresh_48h: parseInt(freshness.fresh_48h) || 0,
      stale: parseInt(freshness.stale) || 0,
      total_active: totalActive,
      avg_hours_since_update: parseFloat(freshness.avg_hours_since_update) || 0,
      sla_pct: slaPct,
    },
    data_quality: {
      missing_last_date: parseInt(missing.missing_last_date) || 0,
      missing_apply_link: parseInt(missing.missing_apply_link) || 0,
      missing_vacancies: parseInt(missing.missing_vacancies) || 0,
      missing_notification_link: parseInt(missing.missing_notification_link) || 0,
      total_open_jobs: parseInt(missing.total_active) || 0,
    },
    lifecycle_distribution: lifecycleDistRes.rows.map(r => ({
      status: r.lifecycle_status,
      count: parseInt(r.count),
    })),
    email_subscribers: {
      total: parseInt(subscribersRes.rows[0]?.total) || 0,
      new_7d: parseInt(subscribersRes.rows[0]?.new_7d) || 0,
      new_30d: parseInt(subscribersRes.rows[0]?.new_30d) || 0,
      ever_sent: parseInt(subscribersRes.rows[0]?.ever_sent) || 0,
    },
    push_subscribers: {
      total: parseInt(pushSubsRes.rows[0]?.total) || 0,
      new_7d: parseInt(pushSubsRes.rows[0]?.new_7d) || 0,
      ever_reached: parseInt(pushSubsRes.rows[0]?.ever_reached) || 0,
    },
    email_batches: emailBatchesRes.rows,
    open_events_30d: openEventsRes.rows,
    jobs_added_7d: recentJobsRes.rows,
  });
}
