import pool from '@/lib/db.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const exam = searchParams.get('exam') || 'SSC CGL';
    const topic = searchParams.get('topic') || null;
    const limit = parseInt(searchParams.get('limit')) || 10;

    let query = 'SELECT * FROM questions WHERE exam = $1';
    let params = [exam];

    if (topic) {
      query += ' AND topic = $2 ORDER BY RANDOM() LIMIT $3';
      params.push(topic, limit);
    } else {
      query += ' ORDER BY RANDOM() LIMIT $2';
      params.push(limit);
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return Response.json({ 
        questions: [],
        message: 'No questions found. Generate some first.'
      });
    }

    return Response.json({ questions: result.rows });

  } catch (error) {
    console.error('Questions fetch error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { exam, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty } = await request.json();

    const result = await pool.query(
      `INSERT INTO questions (exam, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [exam, topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty]
    );

    return Response.json({ success: true, question: result.rows[0] });

  } catch (error) {
    console.error('Question insert error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}