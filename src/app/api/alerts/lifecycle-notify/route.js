/**
 * POST /api/alerts/lifecycle-notify
 * Called by lifecycle cron when job statuses change.
 * Emails users who saved those jobs.
 *
 * Body: { changedJobIds: number[], changes: [{job_id, old_status, new_status}] }
 */

import pool from '@/lib/db.js';

const STATUS_LABELS = {
  NEW: '🆕 New',
  OPEN: '✅ Open',
  CLOSING_SOON: '⚠️ Closing Soon',
  CLOSED: '🔴 Closed',
  RESULT_OUT: '🎉 Result Out',
};

const STATUS_COLORS = {
  NEW: '#3b82f6',
  OPEN: '#22c55e',
  CLOSING_SOON: '#f59e0b',
  CLOSED: '#ef4444',
  RESULT_OUT: '#8b5cf6',
};

function buildEmail(userName, job, oldStatus, newStatus) {
  const statusLabel = STATUS_LABELS[newStatus] || newStatus;
  const statusColor = STATUS_COLORS[newStatus] || '#6b7280';
  const jobUrl = `https://sarkarisuccess.com/jobs/${job.slug}`;

  const isUrgent = newStatus === 'CLOSING_SOON';
  const isClosed = newStatus === 'CLOSED';

  const urgencyLine = isUrgent
    ? `<p style="color:#b45309;font-weight:bold;margin:12px 0;">⚡ Last chance! Apply before it closes.</p>`
    : isClosed
    ? `<p style="color:#6b7280;margin:12px 0;">This vacancy has now closed. Keep an eye out for new openings.</p>`
    : `<p style="color:#374151;margin:12px 0;">Check the latest details and apply if you haven't already.</p>`;

  return {
    subject: `${isUrgent ? '⚠️ URGENT: ' : ''}${job.title} is now ${statusLabel} — Sarkari Success`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:24px 16px;">
  <div style="background:#1e3a5f;padding:20px 24px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="margin:0;color:#fff;font-size:20px;">🏛️ Sarkari Success</h1>
    <p style="margin:4px 0 0;color:#93c5fd;font-size:13px;">Job Status Update</p>
  </div>
  <div style="background:#fff;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none;">
    <p style="margin:0 0 16px;color:#374151;">Hi ${userName || 'there'},</p>
    <p style="margin:0 0 16px;color:#374151;">A job you saved has a new status update:</p>

    <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:0 0 16px;">
      <h2 style="margin:0 0 8px;color:#1e3a5f;font-size:16px;">${job.title}</h2>
      <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">${job.org}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;">
        <span style="background:${statusColor};color:#fff;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:bold;">${statusLabel}</span>
        ${job.vacancies ? `<span style="background:#f3f4f6;color:#374151;padding:3px 10px;border-radius:12px;font-size:12px;">👥 ${job.vacancies} posts</span>` : ''}
        ${job.last_date ? `<span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:12px;font-size:12px;">📅 Last date: ${job.last_date}</span>` : ''}
      </div>
      <p style="margin:8px 0 0;color:#6b7280;font-size:12px;">Status changed: ${STATUS_LABELS[oldStatus] || oldStatus} → ${statusLabel}</p>
    </div>

    ${urgencyLine}

    <div style="text-align:center;margin:20px 0;">
      <a href="${jobUrl}" style="background:#1e3a5f;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">
        View Full Details →
      </a>
    </div>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
    <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
      You're receiving this because you saved this job on Sarkari Success.<br>
      <a href="https://sarkarisuccess.com/dashboard" style="color:#3b82f6;text-decoration:none;">Manage saved jobs</a>
    </p>
  </div>
</div>
</body>
</html>`,
    text: `Hi ${userName || 'there'},

${job.title} (${job.org}) status update:
${STATUS_LABELS[oldStatus] || oldStatus} → ${statusLabel}

Vacancies: ${job.vacancies || 'N/A'}
Last Date: ${job.last_date || 'N/A'}

View full details: ${jobUrl}

---
You're receiving this because you saved this job on Sarkari Success.
Manage saved jobs: https://sarkarisuccess.com/dashboard`,
  };
}

export async function POST(request) {
  const authHeader = request.headers.get('Authorization');
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (authHeader !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { changes } = await request.json();
    if (!changes?.length) return Response.json({ sent: 0, skipped: 'no changes' });

    const jobIds = changes.map(c => c.job_id);

    // Get job details
    const jobsRes = await pool.query(
      `SELECT id, title, org, slug, vacancies, last_date, category FROM jobs WHERE id = ANY($1)`,
      [jobIds]
    );
    const jobsMap = Object.fromEntries(jobsRes.rows.map(j => [j.id, j]));

    // Get users who saved any of these jobs
    const savedRes = await pool.query(
      `SELECT sj.job_id, u.email, u.name
       FROM saved_jobs sj
       JOIN users u ON u.id = sj.user_id
       WHERE sj.job_id = ANY($1)`,
      [jobIds]
    );

    if (!savedRes.rows.length) {
      return Response.json({ sent: 0, skipped: 'no saved-job followers' });
    }

    // Check Resend is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log('lifecycle-notify: RESEND_API_KEY not set, skipping emails');
      return Response.json({ sent: 0, skipped: 'RESEND_API_KEY not configured' });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    let sent = 0;
    let failed = 0;

    // Build change map for quick lookup
    const changeMap = Object.fromEntries(changes.map(c => [c.job_id, c]));

    for (const row of savedRes.rows) {
      const change = changeMap[row.job_id];
      const job = jobsMap[row.job_id];
      if (!change || !job) continue;

      const { subject, html, text } = buildEmail(row.name, job, change.old_status, change.new_status);

      try {
        await resend.emails.send({
          from: 'Sarkari Success Alerts <alerts@sarkarisuccess.com>',
          to: row.email,
          subject,
          html,
          text,
        });
        sent++;
        await new Promise(r => setTimeout(r, 100));
      } catch (e) {
        console.error(`lifecycle-notify email failed for ${row.email}:`, e.message);
        failed++;
      }
    }

    return Response.json({ sent, failed, total_followers: savedRes.rows.length });
  } catch (error) {
    console.error('lifecycle-notify error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
