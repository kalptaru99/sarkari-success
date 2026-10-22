/**
 * News Sitemap for Google News / Google Discover (T5.4)
 * Route: /news-sitemap.xml
 * Returns latest job notifications as NewsArticle entries for indexing by Google News
 */

const BASE_URL = 'https://www.sarkarisuccess.com';

export async function GET() {
  let jobs = [];

  try {
    const res = await fetch(`${BASE_URL}/api/jobs?limit=50&sort=latest`, {
      next: { revalidate: 3600 }, // refresh hourly
    });
    if (res.ok) {
      const data = await res.json();
      jobs = data.jobs || [];
    }
  } catch (e) {
    // If API fails, return empty sitemap — do not crash
  }

  const now = new Date();
  // Only include jobs posted in the last 48 hours (Google News requirement)
  const recentJobs = jobs.filter((job) => {
    if (!job.created_at) return false;
    const posted = new Date(job.created_at);
    const diffHours = (now - posted) / (1000 * 60 * 60);
    return diffHours <= 48;
  });

  const entries = recentJobs
    .map((job) => {
      const pubDate = job.created_at
        ? new Date(job.created_at).toISOString()
        : now.toISOString();
      const title = `${job.title} Recruitment 2026: Apply Online, Vacancies & Last Date`;
      const slug = job.slug || '';
      if (!slug) return '';

      return `
  <url>
    <loc>${BASE_URL}/jobs/${slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Sarkari Success</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>sarkari naukri, government jobs, recruitment 2026, ${(job.org || '').replace(/&/g, '&amp;')}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>
    <lastmod>${pubDate}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .filter(Boolean)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
