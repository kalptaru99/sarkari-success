export const metadata = {
  title: 'Banking Recruitment Tracker 2026-27 — IBPS PO, Clerk, SBI PO Exam Dates | Sarkari Success',
  description: 'Complete banking recruitment tracker 2026-27. Check IBPS PO, Clerk, RRB, SBI PO, SBI Clerk, RBI exam dates, notification dates and result dates.',
  keywords: 'banking recruitment tracker 2026, IBPS PO exam date 2026, SBI PO exam date 2026, IBPS Clerk exam date 2026, bank exam calendar 2026',
};

const bankingEvents = [
  { exam: 'IBPS RRB Officer 2026', event: 'Prelims Exam', date: 'August 2026', status: 'ongoing' },
  { exam: 'IBPS RRB Clerk 2026', event: 'Prelims Exam', date: 'August 2026', status: 'ongoing' },
  { exam: 'IBPS PO 2026', event: 'Prelims Exam', date: 'August-September 2026', status: 'ongoing' },
  { exam: 'IBPS RRB Officer 2026', event: 'Mains Exam', date: 'September 2026', status: 'upcoming' },
  { exam: 'IBPS PO 2026', event: 'Mains Exam', date: 'October 2026', status: 'upcoming' },
  { exam: 'IBPS Clerk 2026', event: 'Notification Release', date: 'September 2026', status: 'upcoming' },
  { exam: 'IBPS Clerk 2026', event: 'Prelims Exam', date: 'November 2026', status: 'upcoming' },
  { exam: 'SBI PO 2027', event: 'Notification Release', date: 'January 2027', status: 'upcoming' },
  { exam: 'SBI Clerk 2027', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'RBI Grade B 2026', event: 'Phase 1 Exam', date: 'October 2026', status: 'upcoming' },
  { exam: 'RBI Assistant 2026', event: 'Notification Release', date: 'November 2026', status: 'upcoming' },
  { exam: 'IBPS PO 2026', event: 'Interview', date: 'December 2026', status: 'upcoming' },
  { exam: 'IBPS Clerk 2026', event: 'Mains Exam', date: 'January 2027', status: 'upcoming' },
  { exam: 'SBI PO 2027', event: 'Prelims Exam', date: 'March 2027', status: 'upcoming' },
  { exam: 'IBPS PO 2027', event: 'Notification Release', date: 'July 2027', status: 'upcoming' },
];

const bankExamInfo = [
  { name: 'IBPS PO', eligibility: 'Graduate', age: '20-30 yrs', posts: 'Probationary Officer', vacancies: '4,455', color: '#1e40af' },
  { name: 'IBPS Clerk', eligibility: 'Graduate', age: '20-28 yrs', posts: 'Clerical Cadre', vacancies: '6,128', color: '#0f766e' },
  { name: 'SBI PO', eligibility: 'Graduate', age: '21-30 yrs', posts: 'Probationary Officer', vacancies: '600', color: '#dc2626' },
  { name: 'SBI Clerk', eligibility: 'Graduate', age: '20-28 yrs', posts: 'Junior Associate', vacancies: '13,735', color: '#7c3aed' },
  { name: 'RBI Grade B', eligibility: 'Graduate', age: '21-30 yrs', posts: 'Grade B Officer', vacancies: '94', color: '#ca8a04' },
  { name: 'IBPS RRB', eligibility: 'Graduate', age: '18-30 yrs', posts: 'Officer & Assistant', vacancies: '9,995', color: '#16a34a' },
];

const statusConfig = {
  completed: { label: 'Completed', bg: '#f1f5f9', color: '#64748b' },
  ongoing: { label: 'Ongoing', bg: '#dcfce7', color: '#16a34a' },
  upcoming: { label: 'Upcoming', bg: '#dbeafe', color: '#1e3a8a' },
};

export default function BankingTrackerPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/banking" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Banking Jobs</a>
      </div>

      <div style={{ backgroundColor: '#1e40af', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Banking Recruitment Tracker 2026-27</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>IBPS PO • Clerk • SBI PO • RBI • RRB — All Bank Exam Dates</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Updated regularly • Bookmark this page</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Banking Exams 2026-27 — Quick Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {bankExamInfo.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${exam.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: exam.color, fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0' }}>{exam.name}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>📚 {exam.eligibility}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>🎂 Age: {exam.age}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>💼 {exam.posts}</p>
              <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '700', margin: 0 }}>👥 {exam.vacancies} vacancies</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📅 Banking Exam Calendar 2026-27</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e40af' }}>
                  {['Exam', 'Event', 'Expected Date', 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', color: 'white', fontWeight: '700' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bankingEvents.map((event, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#1e40af', fontWeight: '700' }}>{event.exam}</td>
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
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>FAQ — Banking Recruitment 2026</h2>
          {[
            { q: 'When will IBPS PO 2026 notification come?', a: 'IBPS PO 2026 notification was released in July 2026 with 4,455 vacancies. Prelims exam is in August-September 2026.' },
            { q: 'When is SBI PO 2027 exam?', a: 'SBI PO 2027 notification is expected in January 2027. Prelims exam typically happens in March-April.' },
            { q: 'Which bank exam has most vacancies?', a: 'SBI Clerk has the most vacancies (13,735 in 2024). IBPS RRB also has high vacancies (9,995). IBPS PO and Clerk combined offer 10,000+ vacancies annually.' },
            { q: 'What is the difference between IBPS PO and SBI PO?', a: 'IBPS PO is for all public sector banks (Bank of Baroda, Punjab National Bank etc.) with 4,455 vacancies. SBI PO is only for State Bank of India with 600 vacancies but higher prestige and better pay.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e40af', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Ask SarkariGPT about Banking exams</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Get banking exam preparation strategy, syllabus and tips in Hindi & English</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}