import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit')) || 20;

    if (slug) {
      const result = await pool.query(
        'SELECT * FROM state_jobs WHERE slug = $1 AND is_active = true',
        [slug]
      );
      if (result.rows.length === 0) {
        return Response.json({ error: 'Job not found' }, { status: 404 });
      }
      return Response.json({ job: result.rows[0] });
    }

    if (state) {
      const result = await pool.query(
        'SELECT * FROM state_jobs WHERE state_code = $1 AND is_active = true ORDER BY created_at DESC LIMIT $2',
        [state.toUpperCase(), limit]
      );
      return Response.json({ jobs: result.rows });
    }

    const result = await pool.query(
      'SELECT * FROM state_jobs WHERE is_active = true ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    return Response.json({ jobs: result.rows });

  } catch (error) {
    console.error('State jobs fetch error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      title, title_local, org, org_local, state, state_code,
      language, vacancies, last_date, exam_date, salary,
      eligibility, eligibility_local, description, description_local,
      apply_link, notification_link, category, slug
    } = await request.json();

    if (!title || !org || !state || !slug) {
      return Response.json({ error: 'Title, org, state and slug are required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO state_jobs (title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, category, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
       RETURNING *`,
      [title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, eligibility, eligibility_local, description, description_local, apply_link, notification_link, category, slug]
    );

    return Response.json({ success: true, job: result.rows[0] });

  } catch (error) {
    console.error('State job insert error:', error);
    if (error.code === '23505') {
      return Response.json({ error: 'A job with this slug already exists' }, { status: 400 });
    }
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}