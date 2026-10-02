import pool from './src/lib/db.js';

const result = await pool.query(`
  INSERT INTO state_jobs (title, title_local, org, org_local, state, state_code, language, vacancies, last_date, exam_date, salary, description, apply_link, notification_link, category, slug, is_new, is_active)
  VALUES (
    'BTSC Bihar Technical Service Commission Recruitment 2026',
    'BTSC बिहार तकनीकी सेवा आयोग भर्ती 2026',
    'Bihar Technical Service Commission',
    'बिहार तकनीकी सेवा आयोग',
    'Bihar',
    'BR',
    'Hindi',
    'Check official website',
    'Check official website',
    'Check official website',
    'As per government norms',
    'Bihar Technical Service Commission (BTSC) conducts recruitment for technical and health sector posts in Bihar including ANM, Staff Nurse, Lab Technician and other posts. Check official website for latest notifications.',
    'https://btsc.bihar.gov.in',
    'https://btsc.bihar.gov.in',
    'State PSC',
    'btsc-bihar-technical-service-commission-2026',
    true,
    true
  )
`);
console.log('Added:', result.rowCount);
process.exit(0);