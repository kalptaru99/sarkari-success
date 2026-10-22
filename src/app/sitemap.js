export default function sitemap() {
  const baseUrl = 'https://www.sarkarisuccess.com';

  return [
    // Core pages — highest priority
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/results`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/admit-card`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },

    // Tools — high priority (T4.1)
    { url: `${baseUrl}/eligibility-checker`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/salary-comparison`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/document-checklist`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/exam-calendar`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/vacancy-database`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.88 },
    { url: `${baseUrl}/cutoff-analysis`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/job-statistics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

    // Mock Tests (T4.1)
    { url: `${baseUrl}/mocktest`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/mocktest/ssc-cgl`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/mocktest/railway-ntpc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/mocktest/upsc-prelims`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.88 },
    { url: `${baseUrl}/mocktest/sbi-po`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/mocktest/ibps-clerk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },

    // SarkariGPT AI Tool
    { url: `${baseUrl}/sarkarigpt`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },

    // Exam categories
    { url: `${baseUrl}/ssc`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/rrb`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/upsc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/banking`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/defence`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/teaching`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/psu`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/state-psc`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

    // State job hubs (T3.2)
    { url: `${baseUrl}/states`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/jobs/bihar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/jobs/uttar-pradesh`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/jobs/rajasthan`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.82 },
    { url: `${baseUrl}/jobs/madhya-pradesh`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.82 },
    { url: `${baseUrl}/jobs/tamil-nadu`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.82 },

    // E-E-A-T pages (T5.6)
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },

    // Questions / exam guide
    { url: `${baseUrl}/questions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/exam-guide`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },

    // Legal pages — lowest priority
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    { url: `${baseUrl}/cookie-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
  ];
}
