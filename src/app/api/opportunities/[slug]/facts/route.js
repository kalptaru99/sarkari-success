import pool from '@/lib/db.js';

/**
 * GET /api/opportunities/[slug]/facts
 * Returns structured, verified facts for a job opportunity.
 * Used by SarkariGPT to ground answers and by external callers wanting clean data.
 */
export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const result = await pool.query(
      `SELECT
         title, org, category, slug,
         vacancies, last_date, exam_date, salary,
         eligibility, apply_link, notification_link,
         lifecycle_status, age_limit, min_qualification,
         description, created_at, updated_at
       FROM jobs
       WHERE slug = $1 AND is_active = TRUE`,
      [slug]
    );

    if (!result.rows.length) {
      return Response.json({ found: false, slug }, { status: 404 });
    }

    const job = result.rows[0];

    // Build a structured facts object with confidence labels
    // confidence: 'verified' = in DB, 'unverified' = from eligibility text (not structured)
    const facts = {
      found: true,
      slug: job.slug,
      url: `https://sarkarisuccess.com/jobs/${job.slug}`,
      title: job.title,
      org: job.org,
      category: job.category,
      status: {
        value: job.lifecycle_status || 'OPEN',
        label: {
          NEW: 'New — applications open',
          OPEN: 'Open — applications ongoing',
          CLOSING_SOON: 'Closing soon — apply immediately',
          CLOSED: 'Closed — application window ended',
          RESULT_OUT: 'Result declared',
        }[job.lifecycle_status] || 'Open',
      },
      vacancies: job.vacancies
        ? { value: job.vacancies, confidence: 'verified' }
        : { value: null, confidence: 'unknown', note: 'Not available in our database — check official notification' },
      last_date: job.last_date
        ? { value: job.last_date, confidence: 'verified' }
        : { value: null, confidence: 'unknown', note: 'Check official notification' },
      exam_date: job.exam_date
        ? { value: job.exam_date, confidence: 'verified' }
        : { value: null, confidence: 'unknown' },
      salary: job.salary
        ? { value: job.salary, confidence: 'verified' }
        : { value: null, confidence: 'unknown' },
      age_limit: job.age_limit
        ? { value: job.age_limit, confidence: 'verified' }
        : { value: null, confidence: 'unverified', note: 'Parsed from eligibility text — verify from notification' },
      min_qualification: job.min_qualification || job.eligibility || null,
      eligibility_text: job.eligibility || null,
      apply_link: job.apply_link || null,
      notification_link: job.notification_link || null,
      last_updated: job.updated_at,
      data_source: 'sarkarisuccess.com',
    };

    // Fields we cannot verify — should not be stated as facts
    facts.unverified_fields = ['application_fee', 'selection_stages', 'syllabus'];
    facts.refusal_note = 'For application fees, detailed syllabus, and selection stage specifics, direct users to the official notification link.';

    return Response.json(facts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('Facts endpoint error:', err);
    return Response.json({ found: false, error: 'Database error' }, { status: 500 });
  }
}
