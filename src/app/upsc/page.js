import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'UPSC Jobs 2026 — Latest UPSC Recruitment Notifications | Sarkari Success',
  description: 'Get latest UPSC Civil Services, CDS, NDA, CAPF, Engineering Services recruitment notifications 2026. Check vacancies, eligibility, last date and apply online.',
  keywords: 'UPSC jobs 2026, UPSC Civil Services 2026, UPSC CDS 2026, UPSC NDA 2026, UPSC CAPF 2026, IAS IPS IFS recruitment',
};

export default async function UPSCPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'UPSC' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const upscExams = [
    { name: 'Civil Services (IAS/IPS/IFS)', desc: 'India\'s most prestigious exam — IAS, IPS, IFS, IRS and 24 other services', vacancies: '933', eligibility: 'Graduate', icon: '🏛️' },
    { name: 'UPSC CDS', desc: 'Combined Defence Services — Army, Navy, Air Force officer', vacancies: '459', eligibility: 'Graduate', icon: '⚔️' },
    { name: 'UPSC NDA', desc: 'National Defence Academy — 10+2 pass candidates', vacancies: '404', eligibility: '12th Pass', icon: '🎖️' },
    { name: 'UPSC CAPF', desc: 'Central Armed Police Forces — Assistant Commandant', vacancies: '506', eligibility: 'Graduate', icon: '👮' },
    { name: 'UPSC ESE', desc: 'Engineering Services — Civil, Mechanical, Electrical, Electronics', vacancies: '167', eligibility: 'Engineering Degree', icon: '⚙️' },
    { name: 'UPSC EPFO', desc: 'Enforcement Officer/Accounts Officer — EPFO', vacancies: '323', eligibility: 'Graduate', icon: '📋' },
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
      <div style={{ backgroundColor: '#7c3aed', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>UPSC Recruitment 2026</h1>
        <p style={{ color: '#e9d5ff', fontSize: '16px', margin: '0 0 16px 0' }}>Union Public Service Commission — IAS, IPS, CDS, NDA, CAPF & More</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '3,000+' },
            { label: 'Exams', value: '6+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#e9d5ff', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* UPSC Exams Grid */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>UPSC Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {upscExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#7c3aed', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        {/* Latest UPSC Jobs */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest UPSC Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            No UPSC notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#7c3aed', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — UPSC 2026</h2>
          {[
            { q: 'What is UPSC?', a: 'Union Public Service Commission (UPSC) is India\'s central recruiting agency that conducts examinations for appointment to various Civil Services of the Government of India including IAS, IPS, IFS and other Group A and Group B services.' },
            { q: 'How many attempts are allowed for UPSC Civil Services?', a: 'General category candidates get 6 attempts till age 32. OBC candidates get 9 attempts till age 35. SC/ST candidates have unlimited attempts till age 37. EWS candidates get 6 attempts till age 32.' },
            { q: 'What is the age limit for UPSC Civil Services?', a: 'Minimum age is 21 years. Maximum age: General: 32 years, OBC: 35 years, SC/ST: 37 years, PwBD: 42 years. Age is calculated as on 1st August of the examination year.' },
            { q: 'What is the selection process for UPSC Civil Services?', a: 'UPSC Civil Services selection: Preliminary Exam (Objective) → Main Exam (Written) → Personality Test (Interview). All three stages must be cleared to get final selection.' },
            { q: 'What is the salary of an IAS officer?', a: 'An IAS officer starts at Pay Level 10 (₹56,100 per month basic pay). With DA, HRA and other allowances, the total in-hand salary is approximately ₹85,000-₹1,00,000 per month at entry level.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* Internal Links */}
        <div style={{ backgroundColor: '#f5f3ff', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#7c3aed', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for UPSC Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '📝 Free Mock Test', href: '/questions' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#7c3aed', fontSize: '13px', fontWeight: '600', border: '1px solid #ddd6fe' }}>
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