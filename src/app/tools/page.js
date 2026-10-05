export const metadata = {
  title: 'Free Government Job Tools 2026 — Eligibility Checker, Salary Compare, Exam Calendar | Sarkari Success',
  description: 'Free AI-powered government job tools — eligibility checker, salary comparison, exam calendar, vacancy database, cutoff analysis and more for SSC, Railway, UPSC, Banking aspirants.',
  keywords: 'government job tools, eligibility checker, salary comparison, exam calendar, sarkari naukri tools 2026',
};

const tools = [
  {
    category: '🛠️ Interactive Tools',
    color: '#1e3a8a',
    items: [
      { name: 'Eligibility Checker', desc: 'Find which government exams you are eligible for based on age and education', link: '/eligibility-checker', icon: '✅', badge: 'Most Popular' },
      { name: 'Salary Comparison Tool', desc: 'Compare salaries across SSC, Railway, UPSC, Banking, Defence, PSU jobs', link: '/salary-comparison', icon: '💰', badge: 'New' },
      { name: 'SarkariGPT', desc: 'AI career guide — ask anything about government jobs in Hindi & English', link: '/sarkarigpt', icon: '🤖', badge: 'AI Powered' },
    ],
  },
  {
    category: '📅 Exam Trackers & Calendars',
    color: '#0f766e',
    items: [
      { name: 'Government Exam Calendar 2026-27', desc: 'All SSC, Railway, UPSC, Banking exam dates in one place', link: '/exam-calendar', icon: '📅', badge: '' },
      { name: 'SSC Exam Calendar', desc: 'CGL, CHSL, MTS, GD, CPO exam dates and notification schedule', link: '/ssc-calendar', icon: '📘', badge: '' },
      { name: 'RRB Railway Tracker', desc: 'NTPC, Group D, ALP, Technician exam dates and results', link: '/rrb-tracker', icon: '🚂', badge: '' },
      { name: 'Banking Recruitment Tracker', desc: 'IBPS PO, Clerk, SBI PO, RBI exam dates and schedule', link: '/banking-tracker', icon: '🏦', badge: '' },
    ],
  },
  {
    category: '📊 Data & Research',
    color: '#7c3aed',
    items: [
      { name: 'Vacancy Database 2020-2026', desc: 'Historical vacancy data for all major government exams', link: '/vacancy-database', icon: '📊', badge: 'Unique' },
      { name: 'Competition Report', desc: 'Selection rates, difficulty levels, applicants vs vacancies analysis', link: '/competition-report', icon: '🔍', badge: 'Research' },
      { name: 'Job Statistics India', desc: 'State-wise and category-wise government job statistics', link: '/job-statistics', icon: '🗺️', badge: '' },
      { name: 'Cutoff Analysis 2020-2026', desc: 'Previous year cutoff marks for SSC, Railway, UPSC, Banking', link: '/cutoff-analysis', icon: '📈', badge: '' },
      { name: 'Public Exam Data API', desc: 'Free JSON API for government exam data — for developers', link: '/api/exam-data', icon: '🔌', badge: 'Free API' },
    ],
  },
  {
    category: '📋 Checklists & Guides',
    color: '#dc2626',
    items: [
      { name: 'Document Checklist', desc: 'Complete list of documents needed for SSC, Railway, UPSC, Banking', link: '/document-checklist', icon: '📋', badge: 'Must Read' },
      { name: 'Preparation Checklist', desc: 'Phase-wise preparation guide with do\'s and don\'ts', link: '/preparation-checklist', icon: '✅', badge: '' },
      { name: 'Salary Comparison Table', desc: 'Detailed salary breakdown for all government jobs', link: '/salary-comparison', icon: '💰', badge: '' },
    ],
  },
  {
    category: '🏛️ Job Category Hubs',
    color: '#ca8a04',
    items: [
      { name: 'SSC Jobs Hub', desc: 'CGL, CHSL, MTS, GD, CPO — all SSC recruitment', link: '/ssc', icon: '📘', badge: '' },
      { name: 'Railway Jobs Hub', desc: 'NTPC, Group D, ALP, Technician — all RRB recruitment', link: '/rrb', icon: '🚂', badge: '' },
      { name: 'Banking Jobs Hub', desc: 'IBPS PO, Clerk, SBI PO, RBI — all banking recruitment', link: '/banking', icon: '🏦', badge: '' },
      { name: 'UPSC Hub', desc: 'Civil Services, CDS, NDA, CAPF — all UPSC recruitment', link: '/upsc', icon: '🏛️', badge: '' },
      { name: 'Defence Jobs Hub', desc: 'Army, Navy, Air Force, Coast Guard, Agniveer', link: '/defence', icon: '⚔️', badge: '' },
      { name: 'PSU Jobs Hub', desc: 'DRDO, HAL, ISRO, ONGC, NTPC, BHEL recruitment', link: '/psu', icon: '🔬', badge: '' },
    ],
  },
  {
    category: '🗺️ State Job Pages',
    color: '#16a34a',
    items: [
      { name: 'Bihar Government Jobs', desc: 'BPSC, Bihar Police, BTSC, BPSSC recruitment', link: '/jobs/bihar', icon: '🏛️', badge: '' },
      { name: 'UP Government Jobs', desc: 'UPPSC, UP Police, UPSSSC recruitment', link: '/jobs/uttar-pradesh', icon: '🏛️', badge: '' },
      { name: 'Rajasthan Government Jobs', desc: 'RPSC, Rajasthan Police, RSMSSB recruitment', link: '/jobs/rajasthan', icon: '🏛️', badge: '' },
      { name: 'Maharashtra Government Jobs', desc: 'MPSC, Maharashtra Police recruitment', link: '/jobs/maharashtra', icon: '🏛️', badge: '' },
      { name: 'Tamil Nadu Government Jobs', desc: 'TNPSC Group 1/2/4, TN Police recruitment', link: '/jobs/tamil-nadu', icon: '🏛️', badge: '' },
      { name: 'All State Jobs →', desc: 'Browse government jobs for all 24 states', link: '/states', icon: '🗺️', badge: '' },
    ],
  },
  {
    category: '🌐 Regional Language Guides',
    color: '#0891b2',
    items: [
      { name: 'हिंदी गाइड', desc: 'SSC, Railway, UPSC, Bank — सब हिंदी में', link: '/hindi-guide', icon: '🇮🇳', badge: '' },
      { name: 'বাংলা গাইড', desc: 'সরকারি চাকরি গাইড বাংলায়', link: '/bengali-guide', icon: '🇧🇩', badge: '' },
      { name: 'தமிழ் வழிகாட்டி', desc: 'அரசு வேலை வழிகாட்டி தமிழில்', link: '/tamil-guide', icon: '🌟', badge: '' },
      { name: 'తెలుగు గైడ్', desc: 'ప్రభుత్వ ఉద్యోగ గైడ్ తెలుగులో', link: '/telugu-guide', icon: '🌟', badge: '' },
      { name: 'मराठी मार्गदर्शन', desc: 'सरकारी नोकरी मार्गदर्शन मराठीत', link: '/marathi-guide', icon: '🌟', badge: '' },
      { name: 'More Languages →', desc: 'Kannada, Malayalam, Punjabi, Odia, Assamese guides', link: '/kannada-guide', icon: '🌐', badge: '' },
    ],
  },
];

export default function ToolsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Free Government Job Tools & Resources</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>50+ Free Tools, Trackers, Guides & Data Resources for Government Job Aspirants</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>SSC • Railway • UPSC • Banking • Defence • State PSC — All in One Place</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>

        {tools.map((section, si) => (
          <div key={si} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: section.color, fontSize: '20px', fontWeight: '800', margin: '0 0 16px 0', borderLeft: `4px solid ${section.color}`, paddingLeft: '12px' }}>
              {section.category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {section.items.map((tool, ti) => (
                <a key={ti} href={tool.link}
                  style={{ backgroundColor: 'white', borderRadius: '12px', padding: '18px', textDecoration: 'none', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', overflow: 'hidden' }}>
                  {tool.badge && (
                    <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: section.color, color: 'white', fontSize: '9px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
                      {tool.badge}
                    </span>
                  )}
                  <span style={{ fontSize: '28px' }}>{tool.icon}</span>
                  <p style={{ color: section.color, fontWeight: '800', fontSize: '14px', margin: 0 }}>{tool.name}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>{tool.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Can't find what you need?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT — AI-powered answers for any government job question</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}