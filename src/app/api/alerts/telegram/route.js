/**
 * POST /api/alerts/telegram
 * Posts new job alerts to the Sarkari Success Telegram channel.
 *
 * Body: { jobs: [{title, org, vacancies, last_date, slug, category, lifecycle_status}] }
 * Auth: Authorization: Bearer <CRON_SECRET>
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — get from @BotFather on Telegram
 *   TELEGRAM_CHANNEL_ID — channel username like @sarkarisuccess or numeric -100xxxxxx
 */

const SITE_URL = 'https://sarkarisuccess.com';
const TELEGRAM_API = 'https://api.telegram.org';

function formatJobMessage(job) {
  const statusEmoji = {
    NEW: '🟢',
    OPEN: '🔵',
    CLOSING_SOON: '🟡⚡',
    CLOSED: '🔴',
    RESULT_OUT: '🏆',
  }[job.lifecycle_status] || '🔵';

  const lines = [
    `${statusEmoji} *${escapeMarkdown(job.title)}*`,
    `🏢 ${escapeMarkdown(job.org)}`,
  ];

  if (job.vacancies) lines.push(`👥 Vacancies: *${escapeMarkdown(String(job.vacancies))}*`);
  if (job.last_date) lines.push(`📅 Last Date: *${escapeMarkdown(job.last_date)}*`);
  if (job.category) lines.push(`📂 Category: ${escapeMarkdown(job.category)}`);

  lines.push('');
  lines.push(`[📋 View Full Details](${SITE_URL}/jobs/${job.slug})`);

  return lines.join('\n');
}

// Escape special characters for Telegram MarkdownV2
function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

async function sendToTelegram(botToken, channelId, text) {
  const url = `${TELEGRAM_API}/bot${botToken}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: channelId,
      text,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: false,
    }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram error: ${data.description}`);
  return data;
}

export async function POST(request) {
  // Auth check
  const authHeader = request.headers.get('authorization');
  const cronHeader = request.headers.get('x-vercel-cron');
  const expected = `Bearer ${process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026'}`;
  if (authHeader !== expected && !cronHeader) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!botToken || !channelId) {
    return Response.json({
      sent: 0,
      message: 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHANNEL_ID not configured',
    });
  }

  try {
    const { jobs } = await request.json();
    if (!jobs || jobs.length === 0) {
      return Response.json({ sent: 0, message: 'No jobs to post' });
    }

    // Filter to only NEW / OPEN / CLOSING_SOON
    const activeJobs = jobs.filter(j =>
      ['NEW', 'OPEN', 'CLOSING_SOON'].includes(j.lifecycle_status)
    );

    if (activeJobs.length === 0) {
      return Response.json({ sent: 0, message: 'No active jobs to post' });
    }

    let sent = 0;
    let failed = 0;
    const errors = [];

    // Post each job as its own message (richer than a digest for Telegram)
    // For large batches, cap at 10 per call to avoid flood limits
    const toPost = activeJobs.slice(0, 10);

    for (const job of toPost) {
      try {
        await sendToTelegram(botToken, channelId, formatJobMessage(job));
        sent++;
        // Telegram rate limit: 1 message/second per chat
        await new Promise(r => setTimeout(r, 1100));
      } catch (err) {
        failed++;
        errors.push({ slug: job.slug, error: err.message });
        console.error('Telegram post error:', err.message);
      }
    }

    // If more than 10 jobs, post a summary card for the rest
    if (activeJobs.length > 10) {
      const remaining = activeJobs.length - 10;
      try {
        const summaryText = `📢 *${escapeMarkdown(String(remaining))} more new jobs posted today\\!*\n\n[View all latest jobs →](${SITE_URL})`;
        await sendToTelegram(botToken, channelId, summaryText);
        sent++;
      } catch (err) {
        console.error('Telegram summary error:', err.message);
      }
    }

    return Response.json({
      success: true,
      sent,
      failed,
      total_jobs: activeJobs.length,
      errors: errors.length > 0 ? errors : undefined,
    });

  } catch (error) {
    console.error('Telegram alert error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
