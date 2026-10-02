import pool from './src/lib/db.js';

const result = await pool.query(
  `SELECT id, slug, title FROM jobs WHERE seo_content IS NOT NULL LIMIT 5`
);
result.rows.forEach(r => console.log(r.id, '|', r.slug));
process.exit(0);