import pool from '@/lib/db.js';

export const metadata = {
  title: 'Bihar Government Jobs 2026 — Latest BPSC, Bihar Police, BTSC Recruitment | Sarkari Success',
  description: 'Get latest Bihar government job notifications 2026. BPSC, Bihar Police, BTSC, BPSSC recruitment. Check vacancies, eligibility, last date and apply online.',
  keywords: 'Bihar government jobs 2026, BPSC 2026, Bihar Police recruitment 2026, BTSC 2026, Bihar sarkari naukri 2026',
};

export default async function BiharJobsPage() {
  const [centralJobs, stateJobs] = await Promise.all([
    pool.query(`SELECT * FROM jobs WHERE title ILIKE '%bihar%' OR org ILIKE '%bihar%' OR org ILIKE '%bpsc%' ORDER BY created_at DESC LIMIT 20`),
    pool.query(`SELECT * FROM state_jobs WHERE state_code = 'BR' AND is_active = true ORDER BY created_at DESC`),
  ]);

  const allJobs = centralJobs.rows;
  const stateJobsList = stateJobs.rows;

  const biharOrgs = [
    { name: 'BPSC', full: 'Bihar Public Service Commission', website: 'https://bpsc.bihar.gov.in', desc: 'CCE, TRE, APO and other competitive exams' },
    { name: 'BPSSC', full: 'Bihar Police Subordinate Services Commission', website: 'https://bpssc.bihar.gov.in', desc: 'Police SI, Constable recruitment' },
    { name: 'CSBC', full: 'Central Selection Board of Constables', website: 'https://csbc.bihar.gov.in', desc: 'Bihar Police Constable recruitment' },
    { name: 'BTSC', full: 'Bihar Technical Service Commission', website: 'https://btsc.bihar.gov.in', desc: 'ANM, Staff Nurse, Lab Technician posts' },
    { name: 'BSSC', full: 'Bihar Staff Selection Commission', website: 'https://bssc.bihar.gov.in', desc: 'Group B and C non-gazetted posts' },
    { name: 'BSSB', full: 'Bihar School Service Board', website: 'https://bseb.nic.in', desc: 'Teacher recruitment in Bihar schools' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/states" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← State Jobs</a>
      </div>

      <div style={{ backgroundColor: '#FF6B35', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ color: 'white', fontSize: '13px', margin: '0 0 8px 0' }}>🏛️ Home → State Jobs → Bihar</p>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Bihar Government Jobs 2026</h1>
        <p style={{ color: '#fff3ee', fontSize: '16px', margin: '0 0 16px 0' }}>BPSC • Bihar Police • BTSC • BPSSC • BSSC — Complete Bihar Job Tracker</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Jobs', value: stateJobsList.length + '+' },
            { label: 'Major Orgs', value: '6+' },
            { label: 'Language', value: 'Hindi' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#fff3ee', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Bihar Orgs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Bihar Recruitment Bodies 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {biharOrgs.map((org, i) => (
            <a key={i} href={org.website} target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', textDecoration: 'none' }}>
              <h3 style={{ color: '#FF6B35', fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0' }}>{org.name}</h3>
              <p style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '700', margin: '0 0 6px 0' }}>{org.full}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{org.desc}</p>
              <p style={{ color: '#FF6B35', fontSize: '11px', fontWeight: '700', margin: 0 }}>🌐 {org.website.replace('https://', '')}</p>
            </a>
          ))}
        </div>

        {/* State Jobs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Bihar Government Jobs 2026</h2>
        {stateJobsList.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '24px' }}>
            No Bihar jobs found. Check back soon.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {stateJobsList.map((job, i) => (
              <a key={i} href={`/state-jobs/${job.slug}`}
                style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                    <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: 0 }}>{job.title}</h3>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>{job.org}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Vacancies: {job.vacancies}</span>
                    <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600' }}>Last Date: {job.last_date}</span>
                  </div>
                </div>
                <span style={{ backgroundColor: '#FF6B35', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>View Details</span>
              </a>
            ))}
          </div>
        )}

        {/* Central Govt Jobs related to Bihar */}
        {allJobs.length > 0 && (
          <>
            <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Central Govt Jobs for Bihar Aspirants</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
              {allJobs.map((job, i) => (
                <a key={i} href={`/jobs/${job.slug}`}
                  style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0' }}>{job.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>{job.org}</p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Vacancies: {job.vacancies}</span>
                      <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600' }}>Last Date: {job.last_date}</span>
                    </div>
                  </div>
                  <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>View Details</span>
                </a>
              ))}
            </div>
          </>
        )}

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — Bihar Government Jobs</h2>
          {[
            { q: 'Which is the most important exam for Bihar government jobs?', a: 'BPSC (Bihar Public Service Commission) CCE is the most prestigious exam for Group A and B posts. Bihar Police SI exam conducted by BPSSC is popular for police service.' },
            { q: 'What is the official website for BPSC?', a: 'The official BPSC website is bpsc.bihar.gov.in. All notifications, admit cards and results are published there.' },
            { q: 'What is BPSSC?', a: 'BPSSC (Bihar Police Subordinate Services Commission) conducts recruitment for police subordinate service posts including Sub-Inspector and other posts in Bihar Police.' },
            { q: 'What is BTSC Bihar?', a: 'BTSC (Bihar Technical Service Commission) conducts recruitment for technical and health sector posts in Bihar including ANM, Staff Nurse, Lab Technician, Radiographer and other posts.' },
            { q: 'How to get Bihar government job notifications?', a: 'Bookmark Sarkari Success Bihar jobs page, check bpsc.bihar.gov.in, bpssc.bihar.gov.in and btsc.bihar.gov.in regularly. All Bihar job notifications are updated here daily.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 BPSC / Bihar Police preparation tips?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT in Hindi — get Bihar exam guidance, syllabus and strategy</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>
            Ask in Hindi →
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}