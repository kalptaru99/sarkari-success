/**
 * POST /api/push/send
 * Fans out browser push notifications to all saved subscriptions.
 *
 * Body: { jobs: [{title, org, vacancies, last_date, slug, lifecycle_status}] }
 * Auth: Authorization: Bearer <CRON_SECRET>
 *
 * Required env vars:
 *   NEXT_PUBLIC_VAPID_PUBLIC_KEY
 *   VAPID_PRIVATE_KEY
 *   VAPID_MAILTO (defaults to contact.sarkarisuccess@gmail.com)
 */

import pool from '@/lib/db.js';
import webpush from 'web-push';

const SITE_URL = 'https://sarkarisuccess.com';
const VAPID_MAILTO = 'mailto:contact.sarkarisuccess@gmail.com';

function initWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(VAPID_MAILTO, publicKey, privateKey);
  return true;
}

export async function POST(request) {
  // Auth check
  const authHeader = request.headers.get('authorization');
  const cronHeader = request.headers.get('x-vercel-cron');
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (authHeader !== expected && !cronHeader) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!initWebPush()) {
    return Response.json({ sent: 0, message: 'VAPID keys not configured' });
  }

  try {
    const { jobs } = await request.json();
    if (!jobs || jobs.length === 0) {
      return Response.json({ sent: 0, message: 'No jobs to push' });
    }

    // Build notification payload (use first/most urgent job for the notification)
    const urgentJob = jobs.find(j => j.lifecycle_status === 'CLOSING_SOON') || jobs[0];
    const jobCount = jobs.length;

    const notificationPayload = JSON.stringify({
      title: jobCount === 1
        ? `🏛️ New Job: ${urgentJob.title}`
        : `🏛️ ${jobCount} New Government Jobs Posted`,
      body: jobCount === 1
        ? `${urgentJob.org}${urgentJob.last_date ? ` · Last Date: ${urgentJob.last_date}` : ''}`
        : `Including ${urgentJob.org} and ${jobCount - 1} more. Tap to view.`,
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      url: jobCount === 1
        ? `${SITE_URL}/jobs/${urgentJob.slug}`
        : SITE_URL,
      tag: 'sarkari-job-alert',
      renotify: true,
    });

    // Get all push subscriptions
    let subscriptions;
    try {
      const result = await pool.query(
        `SELECT id, endpoint, p256dh, auth FROM push_subscriptions`
      );
      subscriptions = result.rows;
    } catch (e) {
      return Response.json({ sent: 0, message: 'No push subscriptions table yet' });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return Response.json({ sent: 0, message: 'No push subscribers' });
    }

    let sent = 0;
    let failed = 0;
    const expiredIds = [];

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          notificationPayload
        );
        sent++;
        // Update last_used_at
        await pool.query(
          `UPDATE push_subscriptions SET last_used_at = NOW() WHERE id = $1`,
          [sub.id]
        ).catch(() => {});
      } catch (err) {
        // 410 Gone = subscription expired, clean it up
        if (err.statusCode === 410 || err.statusCode === 404) {
          expiredIds.push(sub.id);
        } else {
          failed++;
          console.error('Push send error:', err.message);
        }
      }
    }

    // Clean up expired subscriptions
    if (expiredIds.length > 0) {
      await pool.query(
        `DELETE FROM push_subscriptions WHERE id = ANY($1)`,
        [expiredIds]
      ).catch(() => {});
    }

    return Response.json({
      success: true,
      sent,
      failed,
      expired_cleaned: expiredIds.length,
      total_subscriptions: subscriptions.length,
    });

  } catch (error) {
    console.error('Push send error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
