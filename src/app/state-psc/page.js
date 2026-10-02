import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'State PSC Jobs 2026 — Latest State Public Service Commission Recruitment | Sarkari Success',
  description: 'Get latest BPSC, UPPSC, MPPSC, RPSC, TNPSC, Kerala PSC, KPSC recruitment notifications 2026. Check vacancies, eligibility and apply online for all State PSC jobs.',
  keywords: 'State PSC jobs 2026, BPSC 2026, UPPSC 2026, MPPSC 2026, RPSC 2026, TNPSC 2026, Kerala PSC 2026, state government jobs',
};

export default async function StatePSCPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'State PSC' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const statePSCs = [
    { name: 'BPSC', state: 'Bihar', desc: 'Bihar Public Service Commission — SDO, DSP and other Group A/B posts', website: 'bpsc.bihar.gov.in', icon: '🏛️' },
    { name: 'UPPSC', state: 'Uttar Pradesh', desc: 'UP Public Service Commission — PCS, RO/ARO, APS posts', website: 'uppsc.up.nic.in', icon: '🏛️' },
    { name: 'MPPSC', state: 'Madhya Pradesh', desc: 'MP Public Service Commission — State Service, Forest Service posts', website: 'mppsc.mp.gov.in', icon: '🏛️' },
    { name: 'RPSC', state: 'Rajasthan', desc: 'Rajasthan Public Service Commission — RAS, RTS and other posts', website: 'rpsc.rajasthan.gov.in', icon: '🏛️' },
    { name: 'TNPSC', state: 'Tamil Nadu', desc: 'Tamil Nadu Public Service Commission — Group 1, 2, 4 posts', website: 'tnpsc.gov.in', icon: '🏛️' },
    { name: 'Kerala PSC', state: 'Kerala', desc: 'Kerala Public Service Commission — various govt posts', website: 'keralapsc.gov.in', icon: '🏛️' },
    { name: 'KPSC', state: 'Karnataka', desc: 'Karnataka Public Service Commission — KAS and other posts', website: 'kpsc.kar.nic.in', icon: '🏛️' },
    { name: 'WBPSC', state: 'West Bengal', desc: 'West Bengal Public Service Commission — WBCS and other posts', website: 'pscwb.org.in', icon: '🏛️' },
    { name: 'GPSC', state: 'Gujarat', desc: 'Gujarat Public Service Commission — Class 1/2 posts', website: 'gpsc.gujarat.gov.in', icon: '🏛️' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <div style={{ backgroundColor: '#ca8a04', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>State PSC Recruitment 2026</h1>
        <p style={{ color: '#fef9c3', fontSize: '16px', margin: '0 0 16px 0' }}>BPSC, UPPSC, MPPSC, RPSC, TNPSC — All State PSC Jobs in One Place</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'State PSCs', value: '24+' },
            { label: 'States Covered', value: '24' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#fef9c3', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>State Public Service Commissions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {statePSCs.map((psc, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{psc.icon}</div>
              <h3 style={{ color: '#ca8a04', fontSize: '16px', fontWeight: '800', margin: '0 0 2px 0' }}>{psc.name}</h3>
              <p style={{ color: '#1e3a8a', fontSize: '11px', fontWeight: '700', margin: '0 0 6px 0' }}>{psc.state}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{psc.desc}</p>
              <a href={`https://${psc.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#ca8a04', fontSize: '11px', fontWeight: '700', textDecoration: 'none' }}>
                🌐 {psc.website}
              </a>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest State PSC Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            <p>No State PSC notifications found here.</p>
            <Link href="/states" style={{ color: '#ca8a04', fontWeight: '700', textDecoration: 'none' }}>→ Browse State Jobs by State</Link>
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
                <span style={{ backgroundColor: '#ca8a04', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — State PSC 2026</h2>
          {[
            { q: 'What is a State PSC?', a: 'State Public Service Commission (PSC) is a constitutional body that recruits officers for state government services. Each state has its own PSC — BPSC for Bihar, UPPSC for UP, MPPSC for MP etc.' },
            { q: 'Which is the best State PSC exam?', a: 'UPPSC PCS is one of the most competitive with good salary and perks. BPSC CCE is popular in Bihar. TNPSC Group 1 is prestigious in Tamil Nadu. The best exam depends on your state and preference.' },
            { q: 'What is the age limit for State PSC exams?', a: 'Age limit varies by state and post. Generally 21-40 years for most state PSC exams. SC/ST/OBC candidates get age relaxation as per state rules. Check the specific notification for exact age limits.' },
            { q: 'What is the salary of a State PSC officer?', a: 'State PSC officers (SDO/DSP level) typically earn ₹56,100 to ₹1,77,500 per month (Pay Level 10) as per 7th Pay Commission. Actual salary depends on the state and post.' },
            { q: 'How to prepare for State PSC exams?', a: 'Focus on state-specific GK, Indian Polity, History, Geography, Economy and current affairs. Use SarkariGPT for state-specific guidance. Practice mock tests and previous year questions regularly.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fefce8', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#ca8a04', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for State PSC Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '🏛️ State Jobs by State', href: '/states' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#ca8a04', fontSize: '13px', fontWeight: '600', border: '1px solid #fde68a' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}