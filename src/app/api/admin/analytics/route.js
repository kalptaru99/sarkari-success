import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Verify admin access via bearer token (same cron secret)
function isAdmin(request) {
  const auth = request.headers.get('authorization') || '';
  const cronSecret = process.env.CRON_SECRET || 'sarkari_success_cron_secret_2026';
  // Check bearer or referrer from admin panel (same origin)
  const referer = request.headers.get('referer') || '';
  return auth === `Bearer ${cronSecret}` || referer.includes('/manage-ss-2026-xk9');
}

export async function GET(request) {
  if (!isAdmin(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Run all analytics queries in parallel
    const [
      summaryRes,
      topSavedRes,
      topClicksRes,
      byCategoryRes,
      eduDistRes,
    ] = await Promise.all([
      // Summary stats
      pool.query(`
        SELECT
          (SELECT COUNT(*) FROM saved_jobs) AS total_saves,
          (SELECT COUNT(DISTINCT user_id) FROM saved_jobs) AS unique_savers,
          (SELECT COUNT(*) FROM job_clicks WHERE click_type = 'apply' AND clicked_at > NOW() - INTERVAL '7 days') AS apply_clicks_7d,
          (SELECT COUNT(*) FROM candidate_profiles) AS profiles_count
      `).catch(() => ({ rows: [{}] })),

      // Top saved jobs
      pool.query(`
        SELECT j.title, j.slug, COUNT(sj.id) AS save_count
        FROM saved_jobs sj
        JOIN jobs j ON j.id = sj.job_id
        GROUP BY j.id, j.title, j.slug
        ORDER BY save_count DESC
        LIMIT 10
      `).catch(() => ({ rows: [] })),

      // Top clicked jobs (7 days)
      pool.query(`
        SELECT slug, COUNT(*) AS click_count
        FROM job_clicks
        WHERE click_type = 'apply' AND clicked_at > NOW() - INTERVAL '7 days'
        GROUP BY slug
        ORDER BY click_count DESC
        LIMIT 10
      `).catch(() => ({ rows: [] })),

      // Saves by category
      pool.query(`
        SELECT j.category, COUNT(sj.id) AS count
        FROM saved_jobs sj
        JOIN jobs j ON j.id = sj.job_id
        GROUP BY j.category
        ORDER BY count DESC
      `).catch(() => ({ rows: [] })),

      // Education distribution
      pool.query(`
        SELECT education, COUNT(*) AS count
        FROM candidate_profiles
        GROUP BY education
        ORDER BY count DESC
      `).catch(() => ({ rows: [] })),
    ]);

    return Response.json({
      summary: summaryRes.rows[0] || {},
      top_saved: topSavedRes.rows,
      top_clicks: topClicksRes.rows,
      by_category: byCategoryRes.rows,
      edu_distribution: eduDistRes.rows,
    });
  } catch (e) {
    console.error('Analytics error:', e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
