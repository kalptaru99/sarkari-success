import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'Defence Jobs 2026 — Latest Army, Navy, Air Force Recruitment | Sarkari Success',
  description: 'Get latest Indian Army, Navy, Air Force, Coast Guard, Agniveer recruitment notifications 2026. Check vacancies, eligibility, last date and apply online.',
  keywords: 'Defence jobs 2026, Indian Army recruitment 2026, Navy recruitment 2026, Air Force recruitment 2026, Agniveer 2026, Coast Guard 2026',
};

export default async function DefencePage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'Defence' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const defenceExams = [
    { name: 'Indian Army Agniveer', desc: 'Short term service — 4 years with 25% retention', vacancies: '25,000+', eligibility: '10th/12th Pass', icon: '⚔️' },
    { name: 'Indian Navy Agniveer', desc: 'Agniveernavy — MR, SSR, AA posts', vacancies: '3,000+', eligibility: '10th/12th Pass', icon: '⚓' },
    { name: 'Air Force Agniveer', desc: 'Agnipath scheme — Agniveervayu', vacancies: '3,500+', eligibility: '12th Pass', icon: '✈️' },
    { name: 'Indian Army Officer', desc: 'NDA, CDS, TES, JAG, SSC Tech entries', vacancies: '1,000+', eligibility: 'Graduate/12th Pass', icon: '🎖️' },
    { name: 'Coast Guard', desc: 'Navik, Yantrik, Assistant Commandant posts', vacancies: '500+', eligibility: '10th/12th/Graduate', icon: '🚢' },
    { name: 'Territorial Army', desc: 'Part time soldiering for employed citizens', vacancies: 'Various', eligibility: 'Graduate', icon: '🏅' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <div style={{ backgroundColor: '#dc2626', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Defence Recruitment 2026</h1>
        <p style={{ color: '#fecaca', fontSize: '16px', margin: '0 0 16px 0' }}>Indian Army, Navy, Air Force, Coast Guard — Latest Jobs & Notifications</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '35,000+' },
            { label: 'Forces', value: '6+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#fecaca', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Defence Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {defenceExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#dc2626', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Defence Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            No Defence notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — Defence 2026</h2>
          {[
            { q: 'What is Agnipath scheme?', a: 'Agnipath is a short-term military service scheme launched in 2022. Agniveers serve for 4 years, after which 25% are retained as regular soldiers. The rest receive a Seva Nidhi package of ₹11.71 lakh.' },
            { q: 'What is the age limit for Agniveer?', a: 'Age limit for Agniveer is 17.5 to 23 years. The upper age limit was extended from 21 to 23 years for the 2022 batch. Educational qualification varies by category — 10th pass for some, 12th pass for others.' },
            { q: 'What is the salary of Agniveer?', a: 'Agniveer salary starts at ₹30,000 per month in Year 1, increasing to ₹40,000 in Year 4. Additionally, 30% is contributed to Seva Nidhi corpus. Total package over 4 years is approximately ₹11.71 lakh.' },
            { q: 'How to join Indian Army as officer?', a: 'To join as officer: NDA exam (after 12th), CDS exam (after graduation), TES entry (after 12th PCM), SSC Tech (after engineering), JAG entry (after law degree). UPSC conducts NDA and CDS exams.' },
            { q: 'What is Coast Guard recruitment process?', a: 'Indian Coast Guard recruits Navik (GD/DB), Yantrik and Assistant Commandant through separate notifications. Selection includes written test, physical fitness test, medical examination and interview.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fee2e2', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h2 style={{ color: '#dc2626', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Prepare for Defence Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { label: '🌍 GK/GS AI — 6,000+ Questions', href: '/gk-ai' },
              { label: '📗 Maths AI — 6,000+ Questions', href: '/maths-ai' },
              { label: '🧩 Reasoning AI — 6,000+ Questions', href: '/reasoning-ai' },
              { label: '📘 English AI — 6,000+ Questions', href: '/english-ai' },
              { label: '📝 Free Mock Test', href: '/questions' },
              { label: '🤖 SarkariGPT — AI Career Guide', href: '/sarkarigpt' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '12px 16px', textDecoration: 'none', color: '#dc2626', fontSize: '13px', fontWeight: '600', border: '1px solid #fecaca' }}>
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