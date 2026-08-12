import pool from './src/lib/db.js';

const result = await pool.query(`
  INSERT INTO subscriptions (user_id, plan, status, started_at, expires_at)
  VALUES ($1, 'annual', 'active', NOW(), NOW() + INTERVAL '1 year')
`, ['adminsarkarisuccess@gmail.com']);
console.log('Subscription added:', result.rowCount);
process.exit(0);