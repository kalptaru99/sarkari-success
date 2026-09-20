import pool from './src/lib/db.js';

const result = await pool.query(
  `UPDATE state_jobs SET apply_link = REPLACE(apply_link, 'bpsc.bih.nic.in', 'bpsc.bihar.gov.in'),
   notification_link = REPLACE(notification_link, 'bpsc.bih.nic.in', 'bpsc.bihar.gov.in')
   WHERE apply_link LIKE '%bpsc.bih.nic.in%' OR notification_link LIKE '%bpsc.bih.nic.in%'`
);
console.log('Updated rows:', result.rowCount);
process.exit(0);
