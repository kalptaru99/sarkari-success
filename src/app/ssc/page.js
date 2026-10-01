import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'SSC Jobs 2026 — Latest SSC Recruitment Notifications | Sarkari Success',
  description: 'Get latest SSC CGL, CHSL, MTS, GD, CPO, JE recruitment notifications 2026. Check vacancies, eligibility, last date and apply online for all SSC jobs.',
  keywords: 'SSC jobs 2026, SSC CGL 2026, SSC CHSL 2026, SSC MTS 2026, SSC GD 2026, SSC CPO 2026, SSC recruitment',
};

export default async function SSCPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'SSC' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const sscExams = [
    { name: 'SSC CGL', desc: 'Combined Graduate Level — Group B & C posts', vacancies: '17,727', eligibility: 'Graduate', icon: '🎓' },
    { name: 'SSC CHSL', desc: 'Combined Higher Secondary Level — LDC, DEO posts', vacancies: '3,712', eligibility: '12th Pass', icon: '📋' },
    { name: 'SSC MTS', desc: 'Multi Tasking Staff — Group C Non-Gazetted posts', vacancies: '10,000+', eligibility: '10th Pass', icon: '📝' },
    { name: 'SSC GD', desc: 'General Duty Constable — CAPF, NIA, SSF', vacancies: '39,481', eligibility: '10th Pass', icon: '🛡️' },
    { name: 'SSC CPO', desc: 'Central Police Organisation — SI, ASI posts', vacancies: '4,187', eligibility: 'Graduate', icon: '👮' },
    { name: 'SSC JE', desc: 'Junior Engineer — Civil, Mechanical, Electrical', vacancies: '968', eligibility: 'Diploma/Degree', icon: '⚙️' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>SSC Recruitment 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 16px 0' }}>Staff Selection Commission — Latest Jobs, Notifications & Results</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '75,000+' },
            { label: 'Exams', value: '6+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#bfdbfe', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* SSC Exams Grid */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>SSC Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {sscExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        {/* Latest SSC Jobs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest SSC Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No SSC notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — SSC 2026</h2>
          {[
            { q: 'What is SSC?', a: 'Staff Selection Commission (SSC) is a central government organisation that recruits staff for various posts in ministries, departments and organisations of Government of India.' },
            { q: 'Which is the best SSC exam for graduates?', a: 'SSC CGL (Combined Graduate Level) is the best exam for graduates. It offers Group B and C posts with salary range of ₹25,500 to ₹1,51,100 per month.' },
            { q: 'What is the age limit for SSC exams?', a: 'Age limit varies by exam: SSC CGL: 18-32 years, SSC CHSL: 18-27 years, SSC MTS: 18-25 years, SSC GD: 18-23 years. Age relaxation is given to SC/ST/OBC candidates.' },
            { q: 'How to apply for SSC jobs?', a: 'Visit the official SSC website at ssc.gov.in. Register with your details, fill the application form, upload documents and pay the application fee online.' },
            { q: 'What is the selection process for SSC CGL?', a: 'SSC CGL selection process: Tier 1 (Computer Based Test) → Tier 2 (CBT) → Tier 3 (Descriptive Paper) → Tier 4 (Computer Proficiency/Skill Test) → Document Verification.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* Internal Links */}
        <div style={{ backgroundColor: '#eff6ff', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for SSC Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📝 Free Mock Test', href: '/questions' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#1e3a8a', fontSize: '13px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
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