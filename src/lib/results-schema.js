import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function createResultsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        exam VARCHAR(255) NOT NULL,
        org VARCHAR(255) NOT NULL,
        result_date VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Declared',
        result_link VARCHAR(500),
        scorecard_link VARCHAR(500),
        cutoff_link VARCHAR(500),
        description TEXT,
        category VARCHAR(100),
        slug VARCHAR(255) UNIQUE,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Results table created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating results table:', error);
    process.exit(1);
  }
}

createResultsTable();