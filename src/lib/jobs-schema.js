import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createJobsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        org VARCHAR(255) NOT NULL,
        vacancies VARCHAR(100),
        last_date VARCHAR(100),
        apply_link VARCHAR(500),
        notification_link VARCHAR(500),
        exam_date VARCHAR(100),
        salary VARCHAR(255),
        eligibility TEXT,
        description TEXT,
        category VARCHAR(100),
        is_new BOOLEAN DEFAULT true,
        is_active BOOLEAN DEFAULT true,
        slug VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Jobs table created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating jobs table:', error);
    process.exit(1);
  }
}

createJobsTable();