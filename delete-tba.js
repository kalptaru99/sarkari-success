import pool from './src/lib/db.js';

const result = await pool.query(
  "DELETE FROM jobs WHERE slug = 'advertisement-07-2026-joint-director-crops'"
);
console.log('Deleted:', result.rowCount);
process.exit(0);