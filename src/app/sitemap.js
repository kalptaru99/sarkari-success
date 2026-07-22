import pool from '@/lib/db.js';

export default async function sitemap() {
  const baseUrl = 'https://sarkarisuccess.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/sarkarigpt`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/mocktest`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/questions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/admit-card`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/states`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/toppers-plan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/exam-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/coach`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/mission`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/revision`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/learning-hub`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/rank-predictor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/selection-dna`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    const jobsResult = await pool.query('SELECT slug, created_at FROM jobs ORDER BY created_at DESC');
    const jobPages = jobsResult.rows.map(job => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: new Date(job.created_at),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    const resultsResult = await pool.query('SELECT slug, created_at FROM results ORDER BY created_at DESC');
    const resultPages = resultsResult.rows.map(result => ({
      url: `${baseUrl}/results/${result.slug}`,
      lastModified: new Date(result.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const admitResult = await pool.query('SELECT slug, created_at FROM admit_cards ORDER BY created_at DESC');
    const admitPages = admitResult.rows.map(card => ({
      url: `${baseUrl}/admit-card/${card.slug}`,
      lastModified: new Date(card.created_at),
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    const stateResult = await pool.query('SELECT slug, created_at FROM state_jobs ORDER BY created_at DESC');
    const statePages = stateResult.rows.map(job => ({
      url: `${baseUrl}/state-jobs/${job.slug}`,
      lastModified: new Date(job.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticPages, ...jobPages, ...resultPages, ...admitPages, ...statePages];
  } catch (error) {
    console.error('Sitemap error:', error);
    return staticPages;
  }
}