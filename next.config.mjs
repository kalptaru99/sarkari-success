/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Core redirect
      { source: '/home', destination: '/', permanent: true },

      // Legacy job URLs → new /jobs/ pattern
      { source: '/rajasthan-high-court-rhc-system-assistant-recruitment-2023', destination: '/jobs/rajasthan-high-court-system-assistant-recruitment', permanent: true },
      { source: '/rajasthan-high-court-rhc-system-assistant-recruitment-2023/:path*', destination: '/jobs/rajasthan-high-court-system-assistant-recruitment', permanent: true },
      { source: '/upsssc-assembly-forest-guard-syllabus-2018', destination: '/exams/upsssc-forest-guard', permanent: true },
      { source: '/iocl-apprentice-recruitment-2025-apply-for-1770-vacancies', destination: '/jobs/iocl-apprentice-recruitment', permanent: true },
      { source: '/iocl-apprentice-recruitment-2025-apply-for-1770-vacancies/:path*', destination: '/jobs/iocl-apprentice-recruitment', permanent: true },
      { source: '/isro-scientist-engineer-recruitment-2025-apply', destination: '/jobs/isro-scientist-engineer-recruitment', permanent: true },
      { source: '/isro-scientist-engineer-recruitment-2025-apply/:path*', destination: '/jobs/isro-scientist-engineer-recruitment', permanent: true },
      { source: '/indian-ordnance-factory-recruitment-for-the-chargeman-post', destination: '/jobs/indian-ordnance-factory-chargeman-recruitment', permanent: true },
      { source: '/upsc-capf-assistant-commandant-online-form-2025', destination: '/jobs/upsc-capf-assistant-commandant-recruitment', permanent: true },
      { source: '/upsc-capf-assistant-commandant-online-form-2025/:path*', destination: '/jobs/upsc-capf-assistant-commandant-recruitment', permanent: true },

      // Policy pages
      { source: '/terms-and-conditions-sarkari-success', destination: '/terms', permanent: true },
      { source: '/terms-and-conditions-sarkari-success/:path*', destination: '/terms', permanent: true },
      { source: '/privacy-policy-sarkari-success', destination: '/privacy', permanent: true },
      { source: '/privacy-policy-sarkari-success/:path*', destination: '/privacy', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/:path*', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
