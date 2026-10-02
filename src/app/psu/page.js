import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'PSU Jobs 2026 — Latest Public Sector Undertaking Recruitment | Sarkari Success',
  description: 'Get latest BHEL, ONGC, NTPC, DRDO, HAL, ISRO, GAIL, SAIL recruitment notifications 2026. Check vacancies, eligibility and apply online for all PSU jobs.',
  keywords: 'PSU jobs 2026, BHEL recruitment 2026, ONGC recruitment 2026, NTPC recruitment 2026, DRDO recruitment 2026, HAL recruitment 2026, ISRO recruitment 2026',
};

export default async function PSUPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'PSU' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const psus = [
    { name: 'DRDO', desc: 'Defence Research & Development Organisation — Scientist posts', icon: '🔬', color: '#1e3a8a' },
    { name: 'HAL', desc: 'Hindustan Aeronautics Limited — Management & Design Trainee', icon: '✈️', color: '#0f766e' },
    { name: 'ISRO', desc: 'Indian Space Research Organisation — Scientist/Engineer posts', icon: '🚀', color: '#7c3aed' },
    { name: 'ONGC', desc: 'Oil & Natural Gas Corporation — Engineer, Geologist posts', icon: '⛽', color: '#ca8a04' },
    { name: 'NTPC', desc: 'National Thermal Power Corporation — Engineer Trainee posts', icon: '⚡', color: '#dc2626' },
    { name: 'BHEL', desc: 'Bharat Heavy Electricals Limited — Engineer, Supervisor posts', icon: '🏭', color: '#16a34a' },
    { name: 'GAIL', desc: 'Gas Authority of India Limited — Executive posts', icon: '🔥', color: '#ea580c' },
    { name: 'SAIL', desc: 'Steel Authority of India Limited — Operator, Technician posts', icon: '⚙️', color: '#0891b2' },
    { name: 'BEL', desc: 'Bharat Electronics Limited — Project Engineer posts', icon: '📡', color: '#6d28d9' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <div style={{ backgroundColor: '#0891b2', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>PSU Recruitment 2026</h1>
        <p style={{ color: '#e0f2fe', fontSize: '16px', margin: '0 0 16px 0' }}>DRDO, HAL, ISRO, ONGC, NTPC, BHEL — Latest PSU Jobs & Notifications</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'PSUs Covered', value: '20+' },
            { label: 'Total Vacancies', value: '5,000+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#e0f2fe', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Major PSUs Recruiting in 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {psus.map((psu, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{psu.icon}</div>
              <h3 style={{ color: psu.color, fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{psu.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{psu.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest PSU Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            No PSU notifications found. Check back soon.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            {jobs.map((job, i) => (
              <Link key={i} href={`/jobs/${job.slug}`} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                    <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: 0 }}>{job.title}</h3>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>{job.org}</p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Vacancies: {job.vacancies}</span>
                    <span style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600' }}>Last Date: {job.last_date}</span>
                  </div>
                </div>
                <span style={{ backgroundColor: '#0891b2', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — PSU 2026</h2>
          {[
            { q: 'What is a PSU job?', a: 'PSU (Public Sector Undertaking) jobs are government-owned company jobs. Major PSUs include DRDO, HAL, ISRO, ONGC, NTPC, BHEL, GAIL, SAIL etc. These offer excellent salary, job security and perks.' },
            { q: 'What is the salary in PSU jobs?', a: 'PSU salaries are very competitive. Entry level Engineer/Officer: ₹50,000-₹80,000 per month. Senior positions can earn ₹1,50,000+ per month. Plus HRA, DA, medical, pension and other benefits.' },
            { q: 'How to get a PSU job?', a: 'Most PSUs recruit through GATE score (for technical posts), direct written test, or campus placement. DRDO, HAL, ISRO, ONGC, BHEL all accept GATE scores. Check individual PSU websites for specific recruitment process.' },
            { q: 'Is GATE mandatory for PSU jobs?', a: 'Not all PSUs require GATE. DRDO, HAL, ISRO, ONGC, NTPC, BHEL, GAIL recruit through GATE. Some PSUs like BEL, Coal India conduct their own written tests. Non-technical posts don\'t require GATE.' },
            { q: 'Which PSU pays the highest salary?', a: 'ONGC, IOCL, BPCL and other Navratna/Maharatna PSUs pay the highest. Entry level pay can be ₹60,000-₹80,000 per month with excellent perks including company accommodation and medical facilities.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}