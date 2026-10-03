import Link from 'next/link';

export const metadata = {
  title: 'SSC Exam Calendar 2026-27 — SSC CGL, CHSL, MTS, GD Exam Dates | Sarkari Success',
  description: 'Complete SSC exam calendar 2026-27. Check SSC CGL, CHSL, MTS, GD, CPO, JE exam dates, notification dates, result dates and admit card dates.',
  keywords: 'SSC exam calendar 2026, SSC CGL exam date 2026, SSC CHSL exam date 2026, SSC MTS exam date 2026, SSC GD exam date 2026',
};

const sscEvents = [
  { exam: 'SSC CGL 2025', event: 'Tier 1 Result', date: 'July 2026', status: 'completed' },
  { exam: 'SSC CGL 2025', event: 'Tier 2 Exam', date: 'August 2026', status: 'ongoing' },
  { exam: 'SSC CHSL 2025', event: 'Tier 1 Result', date: 'August 2026', status: 'ongoing' },
  { exam: 'SSC CGL 2026', event: 'Notification Release', date: 'September 2026', status: 'upcoming' },
  { exam: 'SSC CGL 2026', event: 'Application Start', date: 'September 2026', status: 'upcoming' },
  { exam: 'SSC MTS 2026', event: 'Notification Release', date: 'September 2026', status: 'upcoming' },
  { exam: 'SSC CHSL 2026', event: 'Notification Release', date: 'October 2026', status: 'upcoming' },
  { exam: 'SSC CGL 2026', event: 'Tier 1 Exam', date: 'December 2026', status: 'upcoming' },
  { exam: 'SSC MTS 2026', event: 'Tier 1 Exam', date: 'October-November 2026', status: 'upcoming' },
  { exam: 'SSC GD Constable 2026', event: 'Notification Release', date: 'October 2026', status: 'upcoming' },
  { exam: 'SSC CPO 2026', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'SSC JE 2026', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'SSC CHSL 2026', event: 'Tier 1 Exam', date: 'January 2027', status: 'upcoming' },
  { exam: 'SSC GD Constable 2026', event: 'Exam', date: 'February 2027', status: 'upcoming' },
  { exam: 'SSC CGL 2027', event: 'Notification Release', date: 'March 2027', status: 'upcoming' },
];

const statusConfig = {
  completed: { label: 'Completed', bg: '#f1f5f9', color: '#64748b' },
  ongoing: { label: 'Ongoing', bg: '#dcfce7', color: '#16a34a' },
  upcoming: { label: 'Upcoming', bg: '#dbeafe', color: '#1e3a8a' },
};

const sscExamInfo = [
  { name: 'SSC CGL', eligibility: 'Graduate', age: '18-32 yrs', posts: 'Group B & C', vacancies: '17,727', color: '#1e3a8a' },
  { name: 'SSC CHSL', eligibility: '12th Pass', age: '18-27 yrs', posts: 'LDC, DEO, PA', vacancies: '3,712', color: '#7c3aed' },
  { name: 'SSC MTS', eligibility: '10th Pass', age: '18-25 yrs', posts: 'Multi Tasking Staff', vacancies: '10,000+', color: '#0f766e' },
  { name: 'SSC GD', eligibility: '10th Pass', age: '18-23 yrs', posts: 'Constable CAPF', vacancies: '39,481', color: '#dc2626' },
  { name: 'SSC CPO', eligibility: 'Graduate', age: '20-25 yrs', posts: 'SI, ASI Police', vacancies: '4,187', color: '#ca8a04' },
  { name: 'SSC JE', eligibility: 'Diploma/Degree', age: '18-32 yrs', posts: 'Junior Engineer', vacancies: '968', color: '#16a34a' },
];

export default function SSCCalendarPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/ssc" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← SSC Jobs</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>SSC Exam Calendar 2026-27</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>CGL • CHSL • MTS • GD • CPO • JE — All SSC Exam Dates in One Place</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Updated regularly • Bookmark this page</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* SSC Exam Info */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>SSC Exams 2026-27 — Quick Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {sscExamInfo.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${exam.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: exam.color, fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>📚 {exam.eligibility}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>🎂 Age: {exam.age}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>💼 {exam.posts}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: 0 }}>👥 {exam.vacancies} vacancies</p>
            </div>
          ))}
        </div>

        {/* Calendar Table */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📅 SSC Event Calendar 2026-27</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a' }}>
                  {['Exam', 'Event', 'Expected Date', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', color: 'white', fontWeight: '700' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sscEvents.map((event, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#1e3a8a', fontWeight: '700' }}>{event.exam}</td>
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

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>FAQ — SSC Exam Calendar 2026</h2>
          {[
            { q: 'When will SSC CGL 2026 notification come?', a: 'SSC CGL 2026 notification is expected in September 2026 based on previous year patterns. SSC typically releases CGL notification in the second half of the year.' },
            { q: 'When is SSC CHSL 2026 exam?', a: 'SSC CHSL 2026 Tier 1 exam is expected in January 2027. The notification is expected in October 2026.' },
            { q: 'What is the SSC exam schedule for 2026-27?', a: 'SSC conducts multiple exams throughout the year — CGL, CHSL, MTS, GD, CPO, JE. Major exams happen between October 2026 and March 2027.' },
            { q: 'How many SSC exams are there in 2026?', a: 'SSC conducts 6 major exams — CGL, CHSL, MTS, GD Constable, CPO and JE. Plus various departmental and stenographer exams.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Ask SarkariGPT about SSC exams</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Get SSC preparation strategy, syllabus and tips in Hindi & English</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}