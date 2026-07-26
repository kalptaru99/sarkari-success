import pool from './src/lib/db.js';

const result = await pool.query(
  "DELETE FROM jobs WHERE vacancies = 'TBA' OR vacancies IS NULL"
);
console.log('Deleted:', result.rowCount);
process.exit(0);