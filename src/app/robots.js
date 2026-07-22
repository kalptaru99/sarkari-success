export default function robots() {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/api/sitemap-dynamic',
        ],
        disallow: [
          '/manage-ss-2026-xk9',
          '/admin-login',
        ],
      },
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/sitemap-dynamic',
        ],
        disallow: [
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
    ],
    sitemap: [
      'https://sarkarisuccess.com/sitemap.xml',
      'https://sarkarisuccess.com/api/sitemap-dynamic',
    ],
  };
}