import pool from '@/lib/db.js';
import Link from 'next/link';

export const metadata = {
  title: 'Teaching Jobs 2026 — Latest Teacher Recruitment Notifications | Sarkari Success',
  description: 'Get latest CTET, DSSSB, KVS, NVS, TGT, PGT, Primary Teacher recruitment notifications 2026. Check vacancies, eligibility and apply online for all Teaching jobs.',
  keywords: 'Teaching jobs 2026, CTET 2026, DSSSB teacher 2026, KVS recruitment 2026, NVS recruitment 2026, TGT PGT 2026, government teacher jobs',
};

export default async function TeachingPage() {
  const result = await pool.query(
    `SELECT * FROM jobs WHERE category = 'Teaching' ORDER BY created_at DESC`
  );
  const jobs = result.rows;

  const teachingExams = [
    { name: 'CTET', desc: 'Central Teacher Eligibility Test — Paper 1 & 2', vacancies: 'Eligibility Test', eligibility: '12th/Graduate + B.Ed', icon: '📚' },
    { name: 'KVS', desc: 'Kendriya Vidyalaya Sangathan — PRT, TGT, PGT posts', vacancies: '13,000+', eligibility: 'Graduate + B.Ed', icon: '🏫' },
    { name: 'NVS', desc: 'Navodaya Vidyalaya Samiti — TGT, PGT, Staff posts', vacancies: '2,000+', eligibility: 'Graduate + B.Ed', icon: '🎓' },
    { name: 'DSSSB', desc: 'Delhi Subordinate Services Selection Board — TGT, PGT', vacancies: '1,000+', eligibility: 'Graduate + B.Ed', icon: '🏛️' },
    { name: 'State TET', desc: 'State Teacher Eligibility Tests — UPTET, BTET, MPTET', vacancies: 'Eligibility Test', eligibility: '12th/Graduate + B.Ed', icon: '✏️' },
    { name: 'Army School', desc: 'Army Public School — PGT, TGT, PRT posts', vacancies: '8,000+', eligibility: 'Graduate + B.Ed', icon: '⚔️' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <div style={{ backgroundColor: '#16a34a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Teaching Jobs 2026</h1>
        <p style={{ color: '#dcfce7', fontSize: '16px', margin: '0 0 16px 0' }}>KVS, NVS, DSSSB, CTET, State TET — Latest Teacher Recruitment</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Active Notifications', value: jobs.length + '+' },
            { label: 'Total Vacancies', value: '25,000+' },
            { label: 'Exams', value: '6+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#dcfce7', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Teaching Exams 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {teachingExams.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{exam.icon}</div>
              <h3 style={{ color: '#16a34a', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>{exam.desc}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: '0 0 2px 0' }}>Vacancies: {exam.vacancies}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Eligibility: {exam.eligibility}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Latest Teaching Notifications 2026</h2>
        {jobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#64748b', marginBottom: '40px' }}>
            No Teaching notifications found. Check back soon.
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
                <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>View Details</span>
              </Link>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions — Teaching Jobs 2026</h2>
          {[
            { q: 'What is CTET?', a: 'Central Teacher Eligibility Test (CTET) is conducted by CBSE twice a year. It is mandatory for teaching in KVS, NVS and other central government schools. Paper 1 for Class 1-5, Paper 2 for Class 6-8.' },
            { q: 'What is the salary of a KVS teacher?', a: 'KVS teacher salary: PRT (Primary): ₹35,400-₹1,12,400, TGT (Trained Graduate): ₹44,900-₹1,42,400, PGT (Post Graduate): ₹47,600-₹1,51,100 per month as per 7th Pay Commission.' },
            { q: 'What is the eligibility for government teacher jobs?', a: 'For Primary Teacher: 12th pass with 50% marks + 2-year D.El.Ed + CTET/TET. For TGT: Graduate with subject + B.Ed + CTET. For PGT: Post-Graduate with subject + B.Ed.' },
            { q: 'What is KVS vs NVS?', a: 'KVS (Kendriya Vidyalaya Sangathan) runs central government schools across India with 1,200+ schools. NVS (Navodaya Vidyalaya Samiti) runs residential schools for rural talented students with 600+ schools.' },
            { q: 'How to prepare for teaching recruitment exams?', a: 'Focus on Child Development & Pedagogy, subject knowledge, English/Hindi language and general knowledge. Practice CTET previous year papers. Use SarkariGPT for teaching exam guidance.' },
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