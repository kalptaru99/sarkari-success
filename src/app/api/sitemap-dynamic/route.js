import pool from '@/lib/db.js';

export async function GET() {
  const baseUrl = 'https://sarkarisuccess.com';

  try {
    const [jobsResult, resultsResult, admitResult, stateResult] = await Promise.all([
      pool.query('SELECT slug, created_at FROM jobs ORDER BY created_at DESC'),
      pool.query('SELECT slug, created_at FROM results ORDER BY created_at DESC'),
      pool.query('SELECT slug, created_at FROM admit_cards ORDER BY created_at DESC'),
      pool.query('SELECT slug, created_at FROM state_jobs ORDER BY created_at DESC LIMIT 200'),
    ]);

    const urls = [
      ...jobsResult.rows.map(j => ({ loc: `${baseUrl}/jobs/${j.slug}`, lastmod: new Date(j.created_at).toISOString(), priority: '0.9' })),
      ...resultsResult.rows.map(r => ({ loc: `${baseUrl}/results/${r.slug}`, lastmod: new Date(r.created_at).toISOString(), priority: '0.8' })),
      ...admitResult.rows.map(a => ({ loc: `${baseUrl}/admit-card/${a.slug}`, lastmod: new Date(a.created_at).toISOString(), priority: '0.9' })),
      ...stateResult.rows.map(s => ({ loc: `${baseUrl}/state-jobs/${s.slug}`, lastmod: new Date(s.created_at).toISOString(), priority: '0.8' })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Dynamic sitemap error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}