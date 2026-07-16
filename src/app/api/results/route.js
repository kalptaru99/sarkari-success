import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit')) || 20;

    if (slug) {
      const result = await pool.query(
        'SELECT * FROM results WHERE slug = $1 AND is_active = true',
        [slug]
      );
      if (result.rows.length === 0) {
        return Response.json({ error: 'Result not found' }, { status: 404 });
      }
      return Response.json({ result: result.rows[0] });
    }

    const result = await pool.query(
      'SELECT * FROM results WHERE is_active = true ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
    return Response.json({ results: result.rows });

  } catch (error) {
    console.error('Results fetch error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      exam, org, result_date, status, result_link,
      scorecard_link, cutoff_link, description, category, slug
    } = await request.json();

    if (!exam || !org || !slug) {
      return Response.json({ error: 'Exam, org and slug are required' }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO results (exam, org, result_date, status, result_link, scorecard_link, cutoff_link, description, category, slug)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [exam, org, result_date, status, result_link, scorecard_link, cutoff_link, description, category, slug]
    );

    return Response.json({ success: true, result: result.rows[0] });

  } catch (error) {
    console.error('Result insert error:', error);
    if (error.code === '23505') {
      return Response.json({ error: 'A result with this slug already exists' }, { status: 400 });
    }
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}