import pool from './src/lib/db.js';

const result = await pool.query(
  "SELECT column_name FROM information_schema.columns WHERE table_name = 'state_jobs'"
);
result.rows.forEach(r => console.log(r.column_name));
process.exit(0);