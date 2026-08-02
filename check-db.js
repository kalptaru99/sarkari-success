import pool from './src/lib/db.js';

const result = await pool.query('ALTER TABLE questions ADD COLUMN IF NOT EXISTS chapter VARCHAR(100)');
console.log('Chapter column added:', result.command);
process.exit(0);