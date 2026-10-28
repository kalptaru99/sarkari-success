/**
 * POST /api/alerts/send
 * Called internally after new jobs are saved, or manually from cron.
 * Sends job alert emails to matching subscribers.
 *
 * Body: { jobs: [{title, org, vacancies, last_date, slug, category, lifecycle_status}] }
 * Auth: Authorization: Bearer <CRON_SECRET>
 */

import pool from '@/lib/db.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = 'https://sarkarisuccess.com';
const FROM_EMAIL = 'alerts@sarkarisuccess.com';
const FROM_NAME = 'Sarkari Success Alerts';

function generateUnsubscribeToken(email) {
  const { createHmac } = require('crypto');
  return createHmac('sha256', process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026')
    .update(email.toLowerCase())
    .digest('hex')
    .substring(0, 32);
}

function buildEmailHtml(jobs, email) {
  const token = generateUnsubscribeToken(email);
  const unsubLink = `${SITE_URL}/api/alerts/subscribe?email=${encodeURIComponent(email)}&token=${token}`;

  const jobCards = jobs.map(job => {
    const statusColors = {
      NEW: { bg: '#dcfce7', color: '#15803d', label: '🟢 New' },
      OPEN: { bg: '#dbeafe', color: '#1d4ed8', label: '🔵 Open' },
      CLOSING_SOON: { bg: '#fef9c3', color: '#a16207', label: '🟡 Closing Soon' },
    };
    const s = statusColors[job.lifecycle_status] || statusColors.OPEN;
    const jobUrl = `${SITE_URL}/jobs/${job.slug}`;

    return `
      <div style="border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:16px;background:#fff;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
          <span style="background:${s.bg};color:${s.color};padding:2px 10px;border-radius:12px;font-size:12px;font-weight:700;">${s.label}</span>
          <span style="color:#6b7280;font-size:12px;">${job.org}</span>
        </div>
        <h3 style="margin:0 0 8px;font-size:16px;color:#1f2937;">${job.title}</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;width:120px;">Vacancies:</td>
            <td style="padding:4px 0;color:#374151;font-size:13px;font-weight:600;">${job.vacancies || 'Check notification'}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Last Date:</td>
            <td style="padding:4px 0;color:#dc2626;font-size:13px;font-weight:600;">${job.last_date || 'Check notification'}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;color:#6b7280;font-size:13px;">Category:</td>
            <td style="padding:4px 0;color:#374151;font-size:13px;">${job.category || ''}</td>
          </tr>
        </table>
        <a href="${jobUrl}" style="display:inline-block;margin-top:12px;padding:8px 20px;background:#f97316;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:13px;">View Full Details →</a>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Government Jobs Alert</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#f97316,#ea580c);border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
      <h1 style="margin:0;color:#fff;font-size:22px;">🏛️ Sarkari Success</h1>
      <p style="margin:8px 0 0;color:#fed7aa;font-size:14px;">New Government Job Alerts</p>
    </div>

    <!-- Body -->
    <div style="background:#f9fafb;border-radius:8px;padding:0;">
      <p style="color:#374151;font-size:15px;margin:0 0 20px;">
        <strong>${jobs.length} new government job${jobs.length > 1 ? 's' : ''}</strong> posted that match your alert preferences:
      </p>

      ${jobCards}

      <div style="text-align:center;margin-top:24px;padding:20px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
        <a href="${SITE_URL}" style="display:inline-block;padding:12px 28px;background:#f97316;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
          View All Latest Jobs →
        </a>
        <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
          Ask SarkariGPT for exam tips, eligibility, and syllabus at <a href="${SITE_URL}" style="color:#f97316;">${SITE_URL}</a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:20px;padding:16px;">
      <p style="color:#9ca3af;font-size:12px;margin:0;">
        You're receiving this because you subscribed to job alerts at ${SITE_URL}.<br>
        <a href="${unsubLink}" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `;
}

function buildEmailText(jobs) {
  const lines = jobs.map(job =>
    `• ${job.title}\n  Org: ${job.org} | Vacancies: ${job.vacancies} | Last Date: ${job.last_date}\n  ${SITE_URL}/jobs/${job.slug}`
  ).join('\n\n');
  return `New Government Jobs Alert from Sarkari Success\n\n${lines}\n\nView all: ${SITE_URL}`;
}

export async function POST(request) {
  // Auth check
  const authHeader = request.headers.get('authorization');
  const cronHeader = request.headers.get('x-vercel-cron');
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (authHeader !== expected && !cronHeader) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobs } = await request.json();
    if (!jobs || jobs.length === 0) {
      return Response.json({ sent: 0, message: 'No jobs to send' });
    }

    // Get all active subscribers
    let subscribers;
    try {
      const result = await pool.query(
        `SELECT email, categories, token FROM job_alert_subscribers WHERE is_active = TRUE`
      );
      subscribers = result.rows;
    } catch (e) {
      // Table might not exist yet
      return Response.json({ sent: 0, message: 'No subscribers table yet' });
    }

    if (!subscribers || subscribers.length === 0) {
      return Response.json({ sent: 0, message: 'No active subscribers' });
    }

    let sent = 0;
    let failed = 0;
    const errors = [];

    for (const sub of subscribers) {
      // Filter jobs matching subscriber's categories
      const matchingJobs = jobs.filter(job => {
        if (!sub.categories || sub.categories.length === 0) return true;
        // Check if any category matches (case-insensitive partial)
        return sub.categories.some(cat =>
          (job.category || '').toLowerCase().includes(cat.toLowerCase()) ||
          cat.toLowerCase().includes((job.category || '').toLowerCase())
        );
      });

      if (matchingJobs.length === 0) continue;

      try {
        const { error } = await resend.emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: sub.email,
          subject: `🏛️ ${matchingJobs.length} New Govt Job${matchingJobs.length > 1 ? 's' : ''} Alert - Sarkari Success`,
          html: buildEmailHtml(matchingJobs, sub.email),
          text: buildEmailText(matchingJobs),
        });

        if (error) {
          failed++;
          errors.push({ email: sub.email, error: error.message });
        } else {
          sent++;
        }
      } catch (err) {
        failed++;
        errors.push({ email: sub.email, error: err.message });
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100));
    }

    return Response.json({
      success: true,
      sent,
      failed,
      total_subscribers: subscribers.length,
      jobs_in_alert: jobs.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error('Alert send error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
