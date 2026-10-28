import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_clicks (
      id SERIAL PRIMARY KEY,
      job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
      slug TEXT NOT NULL,
      click_type TEXT NOT NULL CHECK (click_type IN ('apply','notification','view')),
      user_email TEXT,
      ip TEXT,
      clicked_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

// POST /api/jobs/track-click
// Body: { slug, click_type: 'apply' | 'notification' | 'view' }
export async function POST(request) {
  try {
    const { slug, click_type = 'apply' } = await request.json();
    if (!slug) return Response.json({ ok: false });

    await ensureTable();

    // Get job_id from slug
    const jobRes = await pool.query('SELECT id FROM jobs WHERE slug = $1', [slug]);
    const jobId = jobRes.rows[0]?.id || null;

    // Get user email from cookie if available (optional — not blocking)
    let userEmail = null;
    try {
      const { getServerSession } = await import('next-auth');
      const session = await getServerSession();
      userEmail = session?.user?.email || null;
    } catch {}

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || null;

    await pool.query(
      'INSERT INTO job_clicks (job_id, slug, click_type, user_email, ip) VALUES ($1, $2, $3, $4, $5)',
      [jobId, slug, click_type, userEmail, ip]
    );

    return Response.json({ ok: true });
  } catch (e) {
    console.error('track-click error:', e);
    return Response.json({ ok: false });
  }
}
