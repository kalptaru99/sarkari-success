import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'RRB Railway Jobs 2026 — Latest Railway Recruitment Notifications | Sarkari Success',
  description: 'Get latest RRB NTPC, Group D, ALP, Technician, JE recruitment notifications 2026. Check vacancies, eligibility, last date and apply online for all Railway jobs.',
  keywords: 'RRB jobs 2026, RRB NTPC 2026, RRB Group D 2026, RRB ALP 2026, Railway recruitment 2026, Indian Railway jobs',
};

export default async function RRBPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'Railway' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const rrbExams = [
    { name: 'RRB NTPC', desc: 'Non-Technical Popular Categories — Clerk, Guard, TA', vacancies: '8,868', eligibility: 'Graduate/12th Pass', icon: '🚂' },
    { name: 'RRB Group D', desc: 'Level 1 Posts — Track Maintainer, Helper, Porter', vacancies: '32,438', eligibility: '10th Pass + ITI', icon: '🔧' },
    { name: 'RRB ALP', desc: 'Assistant Loco Pilot — Drive trains', vacancies: '18,799', eligibility: '10th Pass + ITI', icon: '🚆' },
    { name: 'RRB Technician', desc: 'Technician Grade 1 & 3 — Technical posts', vacancies: '14,298', eligibility: '10th Pass + ITI', icon: '⚙️' },
    { name: 'RRB JE', desc: 'Junior Engineer — Civil, Mechanical, Electrical', vacancies: '7,951', eligibility: 'Diploma/Degree', icon: '📐' },
    { name: 'RPF', desc: 'Railway Protection Force — Constable, SI', vacancies: '4,660', eligibility: '10th/12th Pass', icon: '👮' },
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
      <div style={{ backgroundColor: '#0f766e', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Railway Recruitment 2026</h1>
        <p style={{ color: '#99f6e4', fontSize: '16px', margin: '0 0 16px 0' }}>Railway Recruitment Board — Latest Jobs, Notifications & Results</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '87,000+' },
            { label: 'Exams', value: '6+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#99f6e4', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* RRB Exams Grid */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Railway Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {rrbExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#0f766e', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        {/* Latest Railway Jobs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Railway Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b' }}>
            No Railway notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#0f766e', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — Railway 2026</h2>
          {[
            { q: 'What is RRB?', a: 'Railway Recruitment Board (RRB) is an Indian government agency responsible for recruiting staff for Indian Railways. There are 21 RRBs across India.' },
            { q: 'Which is the best Railway exam for 10th pass?', a: 'RRB Group D and RRB ALP are best for 10th pass candidates. Group D offers salary of ₹18,000-₹56,900 per month with job security.' },
            { q: 'What is the age limit for Railway jobs?', a: 'Age limit varies: RRB NTPC: 18-33 years, RRB Group D: 18-33 years, RRB ALP: 18-28 years. Age relaxation for SC/ST/OBC/PWD candidates.' },
            { q: 'How to apply for Railway jobs?', a: 'Visit the official RRB website at rrbapply.gov.in or your regional RRB website. Register, fill the form, upload documents and pay fees.' },
            { q: 'What is the salary in Railway jobs?', a: 'Railway salaries: Group D: ₹18,000+, ALP/Technician: ₹19,900+, NTPC Graduate Posts: ₹35,400+, Junior Engineer: ₹35,400+. Plus allowances and perks.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* Internal Links */}
        <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#0f766e', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for Railway Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📝 Free Mock Test', href: '/questions' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#0f766e', fontSize: '13px', fontWeight: '600', border: '1px solid #bbf7d0' }}>
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