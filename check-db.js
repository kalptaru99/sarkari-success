import pool from './src/lib/db.js';

const result = await pool.query(`
  SELECT id, title, slug, apply_link FROM state_jobs 
  WHERE title ILIKE '%Bihar Police%' OR title ILIKE '%Constable%'
  LIMIT 5
`);
result.rows.forEach(r => console.log(r.id, '|', r.title, '|', r.slug));
console.log('Total:', result.rows.length);
process.exit(0);