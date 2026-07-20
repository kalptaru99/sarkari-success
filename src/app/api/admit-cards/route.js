import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 20;

    const result = await pool.query(
      'SELECT * FROM admit_cards ORDER BY created_at DESC LIMIT $1',
      [limit]
    );

    return Response.json({ admit_cards: result.rows });
  } catch (error) {
    console.error('Admit cards error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { exam, org, slug, exam_date, admit_card_date, official_link, description } = await request.json();

    const result = await pool.query(
      'INSERT INTO admit_cards (exam, org, slug, exam_date, admit_card_date, official_link, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [exam, org, slug, exam_date, admit_card_date, official_link, description]
    );

    return Response.json({ admit_card: result.rows[0] });
  } catch (error) {
    console.error('Add admit card error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}