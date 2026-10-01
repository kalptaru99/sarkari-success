import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'Banking Jobs 2026 — Latest Bank Recruitment Notifications | Sarkari Success',
  description: 'Get latest IBPS PO, Clerk, SBI PO, SBI Clerk, RBI recruitment notifications 2026. Check vacancies, eligibility, last date and apply online for all Banking jobs.',
  keywords: 'Banking jobs 2026, IBPS PO 2026, IBPS Clerk 2026, SBI PO 2026, SBI Clerk 2026, RBI 2026, bank recruitment',
};

export default async function BankingPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'Banking' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const bankingExams = [
    { name: 'IBPS PO', desc: 'Probationary Officer — Public Sector Banks', vacancies: '4,455', eligibility: 'Graduate', icon: '🏦' },
    { name: 'IBPS Clerk', desc: 'Clerical Cadre — Public Sector Banks', vacancies: '6,128', eligibility: 'Graduate', icon: '📋' },
    { name: 'SBI PO', desc: 'State Bank of India Probationary Officer', vacancies: '600', eligibility: 'Graduate', icon: '💼' },
    { name: 'SBI Clerk', desc: 'State Bank of India Junior Associate', vacancies: '13,735', eligibility: 'Graduate', icon: '📝' },
    { name: 'RBI Grade B', desc: 'Reserve Bank of India Grade B Officer', vacancies: '94', eligibility: 'Graduate', icon: '🏛️' },
    { name: 'IBPS RRB', desc: 'Regional Rural Banks — Officer & Assistant', vacancies: '9,995', eligibility: 'Graduate', icon: '🌾' },
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
      <div style={{ backgroundColor: '#1e40af', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Banking Recruitment 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 16px 0' }}>IBPS, SBI, RBI — Latest Jobs, Notifications & Results</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '35,000+' },
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

        {/* Banking Exams Grid */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Banking Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {bankingExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#1e40af', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        {/* Latest Banking Jobs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Banking Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No Banking notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#1e40af', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — Banking 2026</h2>
          {[
            { q: 'What is IBPS?', a: 'Institute of Banking Personnel Selection (IBPS) conducts recruitment exams for Probationary Officers, Clerks and Specialist Officers in public sector banks across India.' },
            { q: 'What is the salary of a Bank PO?', a: 'Bank PO starting salary is approximately ₹52,000 per month including basic pay, DA, HRA and other allowances. It increases with promotions and experience.' },
            { q: 'What is the age limit for Banking exams?', a: 'Age limit: IBPS PO: 20-30 years, IBPS Clerk: 20-28 years, SBI PO: 21-30 years, SBI Clerk: 20-28 years. Age relaxation for SC/ST/OBC candidates.' },
            { q: 'What is the selection process for IBPS PO?', a: 'IBPS PO selection: Preliminary Exam → Mains Exam → Interview → Document Verification. Prelims has English, Quantitative Aptitude and Reasoning sections.' },
            { q: 'Which subjects are important for Banking exams?', a: 'Important subjects: Quantitative Aptitude, Reasoning Ability, English Language, General Awareness (Banking), Computer Knowledge. Maths and Reasoning carry maximum weightage.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* Internal Links */}
        <div style={{ backgroundColor: '#eff6ff', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e40af', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for Banking Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📝 Free Mock Test', href: '/questions' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#1e40af', fontSize: '13px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
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