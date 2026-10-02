import pool from './src/lib/db.js';

const result = await pool.query(`
  ALTER TABLE jobs 
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_content JSONB
`);
console.log('Columns added:', result.command);
process.exit(0);