import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function addLanguageColumn() {
  try {
    await pool.query(`
      ALTER TABLE student_profiles 
      ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(20) DEFAULT 'English',
      ADD COLUMN IF NOT EXISTS preferred_exam VARCHAR(100) DEFAULT 'SSC CGL',
      ADD COLUMN IF NOT EXISTS state VARCHAR(50),
      ADD COLUMN IF NOT EXISTS daily_study_hours INTEGER DEFAULT 4,
      ADD COLUMN IF NOT EXISTS exam_date DATE;
    `);
    console.log('Language columns added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addLanguageColumn();