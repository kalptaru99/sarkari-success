import pool from '@/lib/db.js';
export const metadata = { title: 'Rajasthan Government Jobs 2026 — RPSC, Rajasthan Police Recruitment | Sarkari Success', description: 'Latest Rajasthan government job notifications 2026. RPSC, Rajasthan Police, RSMSSB recruitment.', keywords: 'Rajasthan government jobs 2026, RPSC 2026, Rajasthan Police 2026' };
export default async function RajasthanJobsPage() {
  const stateJobs = await pool.query(`SELECT * FROM state_jobs WHERE state_code = 'RJ' AND is_active = true ORDER BY created_at DESC`);
  const orgs = [
    { name: 'RPSC', full: 'Rajasthan Public Service Commission', website: 'https://rpsc.rajasthan.gov.in', desc: 'RAS, RTS and other Group A/B posts' },
    { name: 'RSMSSB', full: 'Rajasthan Subordinate & Ministerial Services Board', website: 'https://rsmssb.rajasthan.gov.in', desc: 'Patwari, LDC, Junior Engineer posts' },
    { name: 'Rajasthan Police', full: 'Rajasthan Police Recruitment Board', website: 'https://police.rajasthan.gov.in', desc: 'Constable, SI recruitment' },
    { name: 'REET', full: 'Rajasthan Eligibility Exam for Teachers', website: 'https://rajeduboard.rajasthan.gov.in', desc: 'Primary and Upper Primary Teacher eligibility' },
  ];
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}><h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1></a>
        <a href="/states" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← State Jobs</a>
      </div>
      <div style={{ backgroundColor: '#FF9800', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Rajasthan Government Jobs 2026</h1>
        <p style={{ color: '#fff8f0', fontSize: '16px', margin: 0 }}>RPSC • Rajasthan Police • RSMSSB • REET — Complete Rajasthan Job Tracker</p>
      </div>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Rajasthan Recruitment Bodies 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '32px' }}>
          {orgs.map((org, i) => (
            <a key={i} href={org.website} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#FF9800', fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0' }}>{org.name}</h3>
              <p style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '700', margin: '0 0 6px 0' }}>{org.full}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{org.desc}</p>
            </a>
          ))}
        </div>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Rajasthan Government Jobs 2026</h2>
        {stateJobs.rows.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '24px' }}>No Rajasthan jobs found. Check back soon.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {stateJobs.rows.map((job, i) => (
              <a key={i} href={`/state-jobs/${job.slug}`} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0' }}>{job.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>{job.org}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Vacancies: {job.vacancies}</span>
                    <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600' }}>Last Date: {job.last_date}</span>
                  </div>
                </div>
                <span style={{ backgroundColor: '#FF9800', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>View Details</span>
              </a>
            ))}
          </div>
        )}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 RPSC / Rajasthan exam guidance</h3>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}