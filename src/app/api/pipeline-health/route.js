import pool from '@/lib/db.js';

export async function GET(request) {
  const secret = new URL(request.url).searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check total jobs
    const totalJobs = await pool.query(`SELECT COUNT(*) FROM jobs`);
    
    // Jobs added in last 24 hours
    const last24h = await pool.query(`SELECT COUNT(*) FROM jobs WHERE created_at > NOW() - INTERVAL '24 hours'`);
    
    // Jobs added in last 7 days
    const last7d = await pool.query(`SELECT COUNT(*) FROM jobs WHERE created_at > NOW() - INTERVAL '7 days'`);

    // Jobs without SEO content
    const noContent = await pool.query(`SELECT COUNT(*) FROM jobs WHERE seo_content IS NULL`);

    // Jobs expiring in next 7 days
    const expiringSoon = await pool.query(`
      SELECT title, last_date FROM jobs 
      WHERE last_date NOT LIKE '%Check%' 
      AND last_date NOT LIKE '%TBA%'
      AND last_date NOT LIKE '%See%'
      ORDER BY created_at DESC LIMIT 5
    `);

    // Category breakdown
    const categories = await pool.query(`
      SELECT category, COUNT(*) as count 
      FROM jobs 
      GROUP BY category 
      ORDER BY count DESC
    `);

    // Recent jobs
    const recentJobs = await pool.query(`
      SELECT title, org, last_date, created_at 
      FROM jobs 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    const health = {
      timestamp: new Date().toISOString(),
      status: 'operational',
      database: {
        total_jobs: parseInt(totalJobs.rows[0].count),
        added_last_24h: parseInt(last24h.rows[0].count),
        added_last_7d: parseInt(last7d.rows[0].count),
        jobs_without_seo_content: parseInt(noContent.rows[0].count),
      },
      pipeline: {
        auto_fetch_schedule: 'Daily at 6 AM UTC',
        state_fetch_schedule: 'Daily at 8 AM UTC',
        content_generation_schedule: 'Daily at 8 AM UTC',
        batches: 2,
        queries_per_run: 16,
      },
      categories: categories.rows,
      recent_jobs: recentJobs.rows,
      alerts: [],
    };

    // Add alerts
    if (parseInt(last24h.rows[0].count) === 0) {
      health.alerts.push({ level: 'warning', message: 'No new jobs added in last 24 hours — check auto-fetch pipeline' });
      health.status = 'degraded';
    }
    if (parseInt(noContent.rows[0].count) > 10) {
      health.alerts.push({ level: 'warning', message: `${noContent.rows[0].count} jobs missing SEO content — run generate-job-content API` });
    }
    if (parseInt(totalJobs.rows[0].count) < 50) {
      health.alerts.push({ level: 'critical', message: 'Total job count below 50 — pipeline may have issues' });
      health.status = 'critical';
    }

    return Response.json(health);

  } catch (error) {
    return Response.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}