import pool from './src/lib/db.js';

const result = await pool.query(
  `SELECT category, COUNT(*) as count FROM jobs GROUP BY category ORDER BY count DESC`
);
result.rows.forEach(r => console.log(r.category, ':', r.count));
process.exit(0);