import pool from './src/lib/db.js';

const result = await pool.query(`SELECT COUNT(*) FROM jobs`);
console.log('Total jobs:', result.rows[0].count);

const recent = await pool.query(`SELECT id, title, last_date FROM jobs ORDER BY created_at DESC LIMIT 10`);
recent.rows.forEach(r => console.log(r.id, '|', r.title, '|', r.last_date));
process.exit(0);