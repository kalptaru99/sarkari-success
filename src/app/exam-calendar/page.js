import Link from 'next/link';

export const metadata = {
  title: 'Government Exam Calendar 2026-27 — SSC, Railway, UPSC, Banking Exam Dates | Sarkari Success',
  description: 'Complete government exam calendar 2026-27. Check SSC CGL, CHSL, RRB NTPC, UPSC Civil Services, IBPS PO, SBI PO exam dates, result dates and admit card dates.',
  keywords: 'government exam calendar 2026, SSC exam dates 2026, RRB exam dates 2026, UPSC exam dates 2026, IBPS exam dates 2026, sarkari exam schedule 2026',
};

const exams = [
  // SSC
  { exam: 'SSC CGL 2026 Tier 1', date: 'August-September 2026', status: 'ongoing', category: 'SSC', link: '/ssc', type: 'Exam' },
  { exam: 'SSC CHSL 2026 Tier 1', date: 'October 2026', status: 'upcoming', category: 'SSC', link: '/ssc', type: 'Exam' },
  { exam: 'SSC MTS 2026', date: 'October-November 2026', status: 'upcoming', category: 'SSC', link: '/ssc', type: 'Exam' },
  { exam: 'SSC GD Constable 2026', date: 'November-December 2026', status: 'upcoming', category: 'SSC', link: '/ssc', type: 'Exam' },
  { exam: 'SSC CPO 2026', date: 'December 2026', status: 'upcoming', category: 'SSC', link: '/ssc', type: 'Exam' },
  { exam: 'SSC CGL 2027 Notification', date: 'January 2027', status: 'upcoming', category: 'SSC', link: '/ssc', type: 'Notification' },
  // Railway
  { exam: 'RRB NTPC CBT 1', date: 'September-October 2026', status: 'upcoming', category: 'Railway', link: '/rrb', type: 'Exam' },
  { exam: 'RRB ALP 2026', date: 'November 2026', status: 'upcoming', category: 'Railway', link: '/rrb', type: 'Exam' },
  { exam: 'RRB Group D 2026', date: 'December 2026', status: 'upcoming', category: 'Railway', link: '/rrb', type: 'Exam' },
  { exam: 'RPF Constable 2026', date: 'October 2026', status: 'upcoming', category: 'Railway', link: '/rrb', type: 'Exam' },
  // UPSC
  { exam: 'UPSC Civil Services Prelims 2026', date: '25 May 2026', status: 'completed', category: 'UPSC', link: '/upsc', type: 'Exam' },
  { exam: 'UPSC Civil Services Mains 2026', date: '21 August 2026', status: 'ongoing', category: 'UPSC', link: '/upsc', type: 'Exam' },
  { exam: 'UPSC CDS 2 2026', date: 'September 2026', status: 'upcoming', category: 'UPSC', link: '/upsc', type: 'Exam' },
  { exam: 'UPSC NDA 2 2026', date: '14 September 2026', status: 'upcoming', category: 'UPSC', link: '/upsc', type: 'Exam' },
  { exam: 'UPSC Civil Services 2027 Notification', date: 'February 2027', status: 'upcoming', category: 'UPSC', link: '/upsc', type: 'Notification' },
  // Banking
  { exam: 'IBPS PO Prelims 2026', date: '22 August 2026', status: 'ongoing', category: 'Banking', link: '/banking', type: 'Exam' },
  { exam: 'IBPS PO Mains 2026', date: 'October 2026', status: 'upcoming', category: 'Banking', link: '/banking', type: 'Exam' },
  { exam: 'IBPS Clerk Prelims 2026', date: 'November 2026', status: 'upcoming', category: 'Banking', link: '/banking', type: 'Exam' },
  { exam: 'SBI PO 2027 Notification', date: 'January 2027', status: 'upcoming', category: 'Banking', link: '/banking', type: 'Notification' },
  { exam: 'IBPS RRB 2026 Officer', date: 'August 2026', status: 'ongoing', category: 'Banking', link: '/banking', type: 'Exam' },
  // Defence
  { exam: 'Indian Army Agniveer 2026', date: 'October-December 2026', status: 'upcoming', category: 'Defence', link: '/defence', type: 'Rally' },
  { exam: 'Indian Navy Agniveer 2026', date: 'November 2026', status: 'upcoming', category: 'Defence', link: '/defence', type: 'Exam' },
  { exam: 'Air Force Agniveer 2026', date: 'October 2026', status: 'upcoming', category: 'Defence', link: '/defence', type: 'Exam' },
  { exam: 'Coast Guard Navik 2026', date: 'September 2026', status: 'upcoming', category: 'Defence', link: '/defence', type: 'Exam' },
  // Teaching
  { exam: 'CTET December 2026', date: 'December 2026', status: 'upcoming', category: 'Teaching', link: '/teaching', type: 'Exam' },
  { exam: 'KVS Teacher 2026', date: 'November 2026', status: 'upcoming', category: 'Teaching', link: '/teaching', type: 'Exam' },
  { exam: 'NVS Teacher 2026', date: 'October 2026', status: 'upcoming', category: 'Teaching', link: '/teaching', type: 'Exam' },
  // PSU
  { exam: 'DRDO CEPTAM 2026', date: 'October 2026', status: 'upcoming', category: 'PSU', link: '/psu', type: 'Exam' },
  { exam: 'HAL Trainee 2026', date: 'Ongoing', status: 'ongoing', category: 'PSU', link: '/psu', type: 'Exam' },
  { exam: 'ISRO Scientist 2026', date: 'November 2026', status: 'upcoming', category: 'PSU', link: '/psu', type: 'Exam' },
];

const categories = ['All', 'SSC', 'Railway', 'UPSC', 'Banking', 'Defence', 'Teaching', 'PSU'];

const statusConfig = {
  completed: { label: 'Completed', bg: '#f1f5f9', color: '#64748b' },
  ongoing: { label: 'Ongoing', bg: '#dcfce7', color: '#16a34a' },
  upcoming: { label: 'Upcoming', bg: '#dbeafe', color: '#1e3a8a' },
};

const categoryColors = {
  SSC: '#1e3a8a', Railway: '#0f766e', UPSC: '#7c3aed',
  Banking: '#1e40af', Defence: '#dc2626', Teaching: '#16a34a',
  PSU: '#0891b2',
};

export default function ExamCalendarPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </Link>
        <Link href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</Link>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Exam Calendar 2026-27</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Banking • Defence • PSU — All Exam Dates in One Place</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Updated regularly • Bookmark this page • Share with friends</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          {[
            { value: exams.filter(e => e.status === 'ongoing').length, label: 'Ongoing Exams', color: '#16a34a', bg: '#dcfce7' },
            { value: exams.filter(e => e.status === 'upcoming').length, label: 'Upcoming Exams', color: '#1e3a8a', bg: '#dbeafe' },
            { value: exams.filter(e => e.status === 'completed').length, label: 'Completed', color: '#64748b', bg: '#f1f5f9' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: stat.bg, borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: stat.color, fontSize: '32px', fontWeight: '900', margin: '0 0 4px 0' }}>{stat.value}</p>
              <p style={{ color: stat.color, fontSize: '13px', margin: 0, fontWeight: '600' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Category Quick Links */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {categories.slice(1).map((cat, i) => (
            <a key={i} href={`/${cat.toLowerCase().replace(' ', '-')}`}
              style={{ backgroundColor: categoryColors[cat] || '#1e3a8a', color: 'white', padding: '6px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              {cat}
            </a>
          ))}
        </div>

        {/* Exam Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#1e3a8a', padding: '16px 20px' }}>
            <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>📅 All Exam Dates 2026-27</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Exam</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Category</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <Link href={exam.link} style={{ color: '#1e3a8a', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                        {exam.exam}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: categoryColors[exam.category] + '20', color: categoryColors[exam.category], padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                        {exam.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{exam.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: statusConfig[exam.status].bg, color: statusConfig[exam.status].color, padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                        {statusConfig[exam.status].label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{exam.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions</h2>
          {[
            { q: 'Which government exam is in October 2026?', a: 'SSC CHSL Tier 1, RRB NTPC CBT 1, RPF Constable, NVS Teacher, DRDO CEPTAM and several state PSC exams are scheduled in October 2026. Check the calendar above for exact dates.' },
            { q: 'When is UPSC Civil Services Mains 2026?', a: 'UPSC Civil Services Mains 2026 is scheduled from 21 August 2026. The exam spans 5 days with 9 papers including Essay, GS Papers and Optional subject papers.' },
            { q: 'When will SSC CGL 2027 notification come?', a: 'SSC CGL 2027 notification is expected in January 2027 based on previous year patterns. SSC typically releases CGL notification in the first quarter of the year.' },
            { q: 'Which is the best government exam to appear in 2026?', a: 'It depends on your qualification. For graduates: SSC CGL, IBPS PO, UPSC CDS. For 12th pass: SSC CHSL, Railway NTPC, Agniveer. For engineers: DRDO, HAL, ISRO, GATE-based PSU recruitment.' },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Ask SarkariGPT about any exam</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Get exam dates, syllabus, eligibility and preparation tips in Hindi & English</p>
          <Link href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>
            Ask SarkariGPT →
          </Link>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}