import Link from 'next/link';

export const metadata = {
  title: 'RRB Railway Recruitment Tracker 2026-27 — NTPC, Group D, ALP Exam Dates | Sarkari Success',
  description: 'Complete RRB Railway recruitment tracker 2026-27. Check RRB NTPC, Group D, ALP, Technician, JE exam dates, notification dates and result dates.',
  keywords: 'RRB recruitment tracker 2026, RRB NTPC exam date 2026, RRB Group D exam date 2026, RRB ALP exam date 2026, Railway exam calendar 2026',
};

const rrbEvents = [
  { exam: 'RRB NTPC 2024-25', event: 'CBT 1 Result', date: 'July 2026', status: 'completed' },
  { exam: 'RRB NTPC 2024-25', event: 'CBT 2 Exam', date: 'August-September 2026', status: 'ongoing' },
  { exam: 'RRB ALP 2024', event: 'CBT 2 Result', date: 'August 2026', status: 'ongoing' },
  { exam: 'RRB NTPC 2026', event: 'Notification Release', date: 'October 2026', status: 'upcoming' },
  { exam: 'RRB Group D 2026', event: 'Notification Release', date: 'October 2026', status: 'upcoming' },
  { exam: 'RRB Technician 2026', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'RRB JE 2026', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'RRB NTPC 2026', event: 'Application Start', date: 'October-November 2026', status: 'upcoming' },
  { exam: 'RPF Constable 2026', event: 'Notification Release', date: 'October 2026', status: 'upcoming' },
  { exam: 'RRB NTPC 2026', event: 'CBT 1 Exam', date: 'January-February 2027', status: 'upcoming' },
  { exam: 'RRB Group D 2026', event: 'CBT Exam', date: 'February-March 2027', status: 'upcoming' },
  { exam: 'RRB ALP 2026', event: 'Notification Release', date: 'December 2026', status: 'upcoming' },
  { exam: 'RRB Technician 2026', event: 'CBT Exam', date: 'March 2027', status: 'upcoming' },
];

const rrbExamInfo = [
  { name: 'RRB NTPC', eligibility: 'Graduate/12th', age: '18-33 yrs', posts: 'Clerk, Guard, TA', vacancies: '8,868', color: '#0f766e' },
  { name: 'RRB Group D', eligibility: '10th + ITI', age: '18-33 yrs', posts: 'Track Maintainer', vacancies: '32,438', color: '#dc2626' },
  { name: 'RRB ALP', eligibility: '10th + ITI', age: '18-28 yrs', posts: 'Loco Pilot', vacancies: '18,799', color: '#7c3aed' },
  { name: 'RRB Technician', eligibility: '10th + ITI', age: '18-33 yrs', posts: 'Grade 1 & 3', vacancies: '14,298', color: '#ca8a04' },
  { name: 'RRB JE', eligibility: 'Diploma/Degree', age: '18-33 yrs', posts: 'Junior Engineer', vacancies: '7,951', color: '#1e3a8a' },
  { name: 'RPF', eligibility: '10th/12th Pass', age: '18-28 yrs', posts: 'Constable, SI', vacancies: '4,660', color: '#16a34a' },
];

const statusConfig = {
  completed: { label: 'Completed', bg: '#f1f5f9', color: '#64748b' },
  ongoing: { label: 'Ongoing', bg: '#dcfce7', color: '#16a34a' },
  upcoming: { label: 'Upcoming', bg: '#dbeafe', color: '#1e3a8a' },
};

export default function RRBTrackerPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/rrb" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Railway Jobs</a>
      </div>

      <div style={{ backgroundColor: '#0f766e', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>RRB Railway Recruitment Tracker 2026-27</h1>
        <p style={{ color: '#99f6e4', fontSize: '16px', margin: '0 0 8px 0' }}>NTPC • Group D • ALP • Technician • JE • RPF — All Railway Exam Dates</p>
        <p style={{ color: '#5eead4', fontSize: '13px', margin: 0 }}>Updated regularly • Bookmark this page</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Railway Exams 2026-27 — Quick Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {rrbExamInfo.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${exam.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: exam.color, fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>📚 {exam.eligibility}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>🎂 Age: {exam.age}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>💼 {exam.posts}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: 0 }}>👥 {exam.vacancies} vacancies</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📅 RRB Recruitment Event Tracker 2026-27</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#0f766e' }}>
                  {['Exam', 'Event', 'Expected Date', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', color: 'white', fontWeight: '700' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rrbEvents.map((event, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#0f766e', fontWeight: '700' }}>{event.exam}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{event.event}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{event.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: statusConfig[event.status].bg, color: statusConfig[event.status].color, padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                        {statusConfig[event.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>FAQ — RRB Railway Recruitment 2026</h2>
          {[
            { q: 'When will RRB NTPC 2026 notification come?', a: 'RRB NTPC 2026 notification is expected in October-November 2026. The previous NTPC cycle had 8,868 vacancies. Check rrbapply.gov.in for official notification.' },
            { q: 'When is RRB Group D 2026 exam?', a: 'RRB Group D 2026 notification is expected in October 2026 with exam likely in February-March 2027. The previous cycle had 32,438 vacancies.' },
            { q: 'What is the difference between RRB NTPC and Group D?', a: 'RRB NTPC requires 12th/Graduate qualification for various posts. RRB Group D requires 10th pass + ITI for track maintainer and similar posts. NTPC pays more (₹35,400+) vs Group D (₹18,000+).' },
            { q: 'How to apply for Railway jobs?', a: 'Visit rrbapply.gov.in or your regional RRB website. Register with your details, fill the application form, upload documents and pay the fee before the last date.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f766e', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Ask SarkariGPT about Railway exams</h3>
          <p style={{ color: '#99f6e4', fontSize: '14px', margin: '0 0 16px 0' }}>Get Railway preparation strategy, syllabus and tips in Hindi & English</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}