import pool from '@/lib/db.js';

export const metadata = {
  title: 'UP Sarkari Naukri 2026 (यूपी सरकारी नौकरी): Latest UPPSC, UP Police, UPSSSC Recruitment | Sarkari Success',
  description: 'UP sarkari naukri 2026 — UPPSC PCS, UP Police Constable, UPSSSC Lekhpal, VDO recruitment notifications. Vacancies, eligibility, last date. यूपी सरकारी नौकरी की जानकारी हिंदी में।',
  keywords: 'UP sarkari naukri 2026, UPPSC 2026, UP police recruitment 2026, UPSSSC 2026, यूपी सरकारी नौकरी, Uttar Pradesh government jobs 2026',
  alternates: {
    canonical: 'https://www.sarkarisuccess.com/jobs/uttar-pradesh',
  },
  openGraph: {
    title: 'UP Sarkari Naukri 2026 (यूपी सरकारी नौकरी) | Sarkari Success',
    description: 'Latest UPPSC, UP Police, UPSSSC recruitment notifications 2026. Complete UP job tracker.',
    url: 'https://www.sarkarisuccess.com/jobs/uttar-pradesh',
    siteName: 'Sarkari Success',
    locale: 'en_IN',
    type: 'website',
  },
};

export default async function UPJobsPage() {
  const stateJobs = await pool.query(`SELECT * FROM state_jobs WHERE state_code = 'UP' AND is_active = true ORDER BY created_at DESC`);

  const orgs = [
    { name: 'UPPSC', full: 'Uttar Pradesh Public Service Commission', website: 'https://uppsc.up.nic.in', desc: 'PCS, RO/ARO, APS and other competitive exams' },
    { name: 'UP Police', full: 'Uttar Pradesh Police Recruitment Board', website: 'https://uppbpb.gov.in', desc: 'Constable, SI, ASI recruitment' },
    { name: 'UPSSSC', full: 'UP Subordinate Service Selection Commission', website: 'https://upsssc.gov.in', desc: 'Lekhpal, VDO, Forest Guard posts' },
    { name: 'UPSESSB', full: 'UP Secondary Education Service Board', website: 'https://upsessb.org', desc: 'TGT, PGT teacher recruitment' },
    { name: 'UP TET', full: 'UP Teacher Eligibility Test', website: 'https://updeled.gov.in', desc: 'Primary and Upper Primary Teacher eligibility' },
    { name: 'UPCL', full: 'UP Power Corporation Limited', website: 'https://www.upenergy.in', desc: 'Technical and non-technical posts' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}><h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1></a>
        <a href="/states" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← State Jobs</a>
      </div>
      <div style={{ backgroundColor: '#4CAF50', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>
          UP Sarkari Naukri 2026 <span style={{ fontSize: '22px', fontWeight: '700' }}>(यूपी सरकारी नौकरी)</span>
        </h1>
        <p style={{ color: '#f0fff0', fontSize: '16px', margin: '0 0 12px 0' }}>UPPSC • UP Police • UPSSSC • UPSESSB — Complete UP Job Tracker | उत्तर प्रदेश भर्ती 2026</p>
        <p style={{ color: '#e0ffe0', fontSize: '14px', margin: 0, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
          Uttar Pradesh is India's largest state by population with the highest number of government job aspirants. UPPSC PCS, UP Police Constable and UPSSSC Lekhpal are the most-applied exams. This page tracks all UP sarkari bharti 2026 notifications from official sources — updated daily.
        </p>
      </div>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>UP Recruitment Bodies 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '32px' }}>
          {orgs.map((org, i) => (
            <a key={i} href={org.website} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#4CAF50', fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0' }}>{org.name}</h3>
              <p style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '700', margin: '0 0 6px 0' }}>{org.full}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{org.desc}</p>
            </a>
          ))}
        </div>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest UP Government Jobs 2026</h2>
        {stateJobs.rows.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '24px' }}>No UP jobs found. Check back soon.</div>
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
                <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>View Details</span>
              </a>
            ))}
          </div>
        )}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 UPPSC / UP Police guidance in Hindi</h3>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>
      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}