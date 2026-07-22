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
    const [jobsRes, resultsRes, admitRes, stateRes] = await Promise.all([
      fetch(`${baseUrl}/api/jobs?limit=100`),
      fetch(`${baseUrl}/api/results?limit=100`),
      fetch(`${baseUrl}/api/admit-cards?limit=100`),
      fetch(`${baseUrl}/api/state-jobs?limit=200`),
    ]);

    const [jobsData, resultsData, admitData, stateData] = await Promise.all([
      jobsRes.json(),
      resultsRes.json(),
      admitRes.json(),
      stateRes.json(),
    ]);

    const jobPages = (jobsData.jobs || []).map(job => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: new Date(job.created_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    const resultPages = (resultsData.results || []).map(result => ({
      url: `${baseUrl}/results/${result.slug}`,
      lastModified: new Date(result.created_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const admitPages = (admitData.admit_cards || []).map(card => ({
      url: `${baseUrl}/admit-card/${card.slug}`,
      lastModified: new Date(card.created_at || new Date()),
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    const statePages = (stateData.state_jobs || []).map(job => ({
      url: `${baseUrl}/state-jobs/${job.slug}`,
      lastModified: new Date(job.created_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticPages, ...jobPages, ...resultPages, ...admitPages, ...statePages];
  } catch (error) {
    console.error('Sitemap error:', error);
    return staticPages;
  }
}