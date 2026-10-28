import pkg from 'pg';
const { Pool } = pkg;
import { getServerSession } from 'next-auth';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS candidate_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
      age INTEGER,
      education TEXT,
      category TEXT CHECK (category IN ('general','obc','sc','st','ews')),
      state TEXT,
      preferred_exams TEXT[],
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  // Also ensure jobs table has age_limit and min_qualification columns
  await pool.query(`
    ALTER TABLE jobs ADD COLUMN IF NOT EXISTS age_limit VARCHAR(50);
    ALTER TABLE jobs ADD COLUMN IF NOT EXISTS min_qualification VARCHAR(100);
  `).catch(() => {});
}

async function getUserId(email) {
  const r = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (!r.rows.length) throw new Error('User not found');
  return r.rows[0].id;
}

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return Response.json({ error: 'Login required' }, { status: 401 });

  await ensureTable();
  const userId = await getUserId(session.user.email);
  const r = await pool.query(
    'SELECT age, education, category, state, preferred_exams FROM candidate_profiles WHERE user_id = $1',
    [userId]
  );
  return Response.json({ profile: r.rows[0] || null });
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session?.user?.email) return Response.json({ error: 'Login required' }, { status: 401 });

  const { age, education, category, state, preferred_exams } = await request.json();

  await ensureTable();
  const userId = await getUserId(session.user.email);

  await pool.query(`
    INSERT INTO candidate_profiles (user_id, age, education, category, state, preferred_exams, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
      age = EXCLUDED.age,
      education = EXCLUDED.education,
      category = EXCLUDED.category,
      state = EXCLUDED.state,
      preferred_exams = EXCLUDED.preferred_exams,
      updated_at = NOW()
  `, [userId, age || null, education || null, category || null, state || null, preferred_exams || []]);

  return Response.json({ success: true });
}
