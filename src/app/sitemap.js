import pool from '@/lib/db.js';

const BASE = 'https://sarkarisuccess.com';

const STATIC_PAGES = [
  { url: BASE, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE}/sarkarigpt`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/ssc`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/rrb`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/banking`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/upsc`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/defence`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/state-psc`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/psu`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/teaching`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/admit-card`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE}/states`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/mocktest`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/questions`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/exam-calendar`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE}/salary-comparison`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/eligibility-checker`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/toppers-plan`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE}/coach`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/mission`, changeFrequency: 'daily', priority: 0.7 },
  { url: `${BASE}/tools`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/exam-guide`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE}/login`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/register`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE}/privacy`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE}/terms`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE}/disclaimer`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE}/refund-policy`, changeFrequency: 'monthly', priority: 0.3 },
  { url: `${BASE}/cookie-policy`, changeFrequency: 'monthly', priority: 0.3 },
];

export default async function sitemap() {
  const now = new Date();

  // Static pages
  const staticEntries = STATIC_PAGES.map(p => ({
    ...p,
    lastModified: now,
  }));

  // Dynamic job pages
  let jobEntries = [];
  let resultEntries = [];
  let admitCardEntries = [];

  try {
    const jobsResult = await pool.query(
      `SELECT slug, updated_at, lifecycle_status FROM jobs
       WHERE is_active = TRUE AND (is_duplicate = FALSE OR is_duplicate IS NULL)
       ORDER BY created_at DESC`
    );
    jobEntries = jobsResult.rows.map(row => ({
      url: `${BASE}/jobs/${row.slug}`,
      lastModified: row.updated_at ? new Date(row.updated_at) : now,
      changeFrequency: row.lifecycle_status === 'CLOSED' ? 'monthly' : 'daily',
      priority: row.lifecycle_status === 'NEW' ? 0.9
               : row.lifecycle_status === 'CLOSING_SOON' ? 0.85
               : row.lifecycle_status === 'CLOSED' ? 0.3
               : 0.8,
    }));
  } catch (e) {
    console.error('Sitemap jobs error:', e.message);
  }

  try {
    const resultsResult = await pool.query(
      `SELECT slug, updated_at FROM results ORDER BY created_at DESC`
    );
    resultEntries = resultsResult.rows.map(row => ({
      url: `${BASE}/results/${row.slug}`,
      lastModified: row.updated_at ? new Date(row.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap results error:', e.message);
  }

  try {
    const acResult = await pool.query(
      `SELECT slug, updated_at FROM admit_cards ORDER BY created_at DESC`
    );
    admitCardEntries = acResult.rows.map(row => ({
      url: `${BASE}/admit-card/${row.slug}`,
      lastModified: row.updated_at ? new Date(row.updated_at) : now,
      changeFrequency: 'daily',
      priority: 0.8,
    }));
  } catch (e) {
    console.error('Sitemap admit cards error:', e.message);
  }

  return [...staticEntries, ...jobEntries, ...resultEntries, ...admitCardEntries];
}
