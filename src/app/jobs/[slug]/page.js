// Server component — handles generateMetadata for SEO, renders client child
import pool from '@/lib/db.js';
import JobPageClient from './JobPageClient';

const SITE_URL = 'https://sarkarisuccess.com';

async function getJob(slug) {
  try {
    const result = await pool.query(
      `SELECT * FROM jobs WHERE slug = $1 AND is_active = TRUE LIMIT 1`,
      [slug]
    );
    return result.rows[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: 'Job Not Found — Sarkari Success',
      description: 'This job notification is no longer available. Browse latest government jobs on Sarkari Success.',
    };
  }

  const title = `${job.title} ${new Date().getFullYear()} — ${job.vacancies || 'Vacancies'} Posts | ${job.org}`;
  const description = job.description
    ? job.description.substring(0, 155)
    : `Apply for ${job.title} by ${job.org}. ${job.vacancies || ''} vacancies, last date ${job.last_date || 'check notification'}. Full details, eligibility, salary, apply link.`;

  const keywords = [
    job.title,
    job.org,
    job.category,
    `${job.org} recruitment ${new Date().getFullYear()}`,
    `${job.title} apply online`,
    `${job.title} last date`,
    `${job.title} vacancy`,
    'sarkari naukri',
    'government job notification',
    'sarkari result',
  ].filter(Boolean).join(', ');

  const canonicalUrl = `${SITE_URL}/jobs/${slug}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Sarkari Success',
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(job.title)}&org=${encodeURIComponent(job.org)}&vacancies=${encodeURIComponent(job.vacancies || '')}&last_date=${encodeURIComponent(job.last_date || '')}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(job.title)}&org=${encodeURIComponent(job.org)}`],
    },
    robots: {
      index: job.lifecycle_status === 'CLOSED' ? false : true,
      follow: true,
    },
  };
}

export default async function JobPage({ params }) {
  const { slug } = await params;
  // Pass slug to client component — it fetches its own data for interactivity
  return <JobPageClient slug={slug} />;
}
