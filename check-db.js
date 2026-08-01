import pool from './src/lib/db.js';

const result = await pool.query('SELECT DISTINCT exam, topic FROM questions ORDER BY exam, topic LIMIT 30');
result.rows.forEach(row => console.log(row.exam, '|', row.topic));
process.exit(0);