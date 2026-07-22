import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const slug = searchParams.get('slug');

    // Get single job by slug
    if (slug) {
      const result = await pool.query(
        'SELECT * FROM jobs WHERE slug = $1 AND is_active = true',
        [slug]
      );
      if (result.rows.length === 0) {
        return Response.json({ error: 'Job not found' }, { status: 404 });
      }
      return Response.json({ job: result.rows[0] });
    }

    // Get all jobs
    let query = 'SELECT * FROM jobs WHERE is_active = true';
    let params = [];

    if (category) {
      query += ' AND category = $1 ORDER BY created_at DESC LIMIT $2';
      params = [category, limit];
    } else {
      query += ' ORDER BY created_at DESC LIMIT $1';
      params = [limit];
    }

    const result = await pool.query(query, params);
    return Response.json({ jobs: result.rows });

  } catch (error) {
    console.error('Jobs fetch error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      title, org, vacancies, last_date, apply_link,
      notification_link, exam_date, salary, eligibility,
      description, category, slug
    } = await request.json();

    if (!title || !org || !slug) {
      return Response.json({ error: 'Title, org and slug are required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO jobs (title, org, vacancies, last_date, apply_link, notification_link, exam_date, salary, eligibility, description, category, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [title, org, vacancies, last_date, apply_link, notification_link, exam_date, salary, eligibility, description, category, slug]
    );

    const newJob = result.rows[0];

    try {
      await fetch(`${process.env.NEXTAUTH_URL || 'https://sarkarisuccess.com'}/api/indexnow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          urls: [`https://sarkarisuccess.com/jobs/${newJob.slug}`]
        }),
      });
    } catch (e) {
      console.error('IndexNow ping failed:', e);
    }

    return Response.json({ success: true, job: newJob });

  } catch (error) {
    console.error('Job insert error:', error);
    if (error.code === '23505') {
      return Response.json({ error: 'A job with this slug already exists' }, { status: 400 });
    }
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, is_active, is_new } = await request.json();

    await pool.query(
      'UPDATE jobs SET is_active = $1, is_new = $2, updated_at = NOW() WHERE id = $3',
      [is_active, is_new, id]
    );

    return Response.json({ success: true });

  } catch (error) {
    console.error('Job update error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}