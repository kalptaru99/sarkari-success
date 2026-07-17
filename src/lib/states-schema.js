import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createStatesTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS state_jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        title_local VARCHAR(255),
        org VARCHAR(255) NOT NULL,
        org_local VARCHAR(255),
        state VARCHAR(100) NOT NULL,
        state_code VARCHAR(10) NOT NULL,
        language VARCHAR(50) NOT NULL,
        vacancies VARCHAR(100),
        last_date VARCHAR(100),
        exam_date VARCHAR(100),
        salary VARCHAR(255),
        eligibility TEXT,
        eligibility_local TEXT,
        description TEXT,
        description_local TEXT,
        apply_link VARCHAR(500),
        notification_link VARCHAR(500),
        category VARCHAR(100),
        slug VARCHAR(255) UNIQUE,
        is_new BOOLEAN DEFAULT true,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('State jobs table created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating state jobs table:', error);
    process.exit(1);
  }
}

createStatesTable();