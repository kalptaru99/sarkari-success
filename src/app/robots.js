export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/jobs/',
          '/results/',
          '/admit-card/',
          '/states/',
          '/state-jobs/',
          '/sarkarigpt',
          '/mocktest',
          '/questions',
          '/toppers-plan',
          '/exam-guide',
          '/privacy',
          '/terms',
          '/disclaimer',
          '/refund-policy',
          '/cookie-policy',
        ],
        disallow: [
          '/api/',
          '/manage-ss-2026-xk9',
          '/admin-login',
          '/dashboard',
          '/profile',
          '/coach',
          '/mission',
          '/revision',
          '/learning-hub',
          '/rank-predictor',
          '/selection-dna',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/manage-ss-2026-xk9',
          '/admin-login',
        ],
      },
    ],
    sitemap: [
  'https://sarkarisuccess.com/sitemap.xml',
  'https://sarkarisuccess.com/api/sitemap-dynamic',
],
  };
}