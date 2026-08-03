import pool from './src/lib/db.js';

const result = await pool.query(
  "SELECT topic, chapter, COUNT(*) as count FROM questions WHERE chapter IS NOT NULL GROUP BY topic, chapter ORDER BY topic, chapter"
);
result.rows.forEach(r => console.log(r.topic, '|', r.chapter, '|', r.count));
const total = await pool.query("SELECT COUNT(*) FROM questions WHERE chapter IS NOT NULL");
console.log('TOTAL chapter-tagged questions:', total.rows[0].count);
process.exit(0);