export const metadata = {
  title: 'Government Job Competition Report 2026 — Selection Difficulty & Success Rate Analysis | Sarkari Success',
  description: 'Comprehensive government job competition report 2026. Selection rates, difficulty levels, applicants vs vacancies ratio for SSC, Railway, UPSC, Banking exams.',
  keywords: 'government job competition 2026, SSC CGL selection rate, UPSC success rate, RRB NTPC competition, banking exam difficulty, government job statistics India',
};

const competitionData = [
  { exam: 'UPSC Civil Services', applicants: '1,000,000+', vacancies: 979, selectionRate: 0.09, difficulty: 'Extreme', attempts: '3-7 years avg', category: 'UPSC', color: '#7c3aed' },
  { exam: 'SSC CGL', applicants: '3,000,000+', vacancies: 17727, selectionRate: 0.59, difficulty: 'Very High', attempts: '1-3 years avg', category: 'SSC', color: '#1e3a8a' },
  { exam: 'SSC CHSL', applicants: '2,500,000+', vacancies: 3712, selectionRate: 0.15, difficulty: 'Very High', attempts: '1-2 years avg', category: 'SSC', color: '#1e3a8a' },
  { exam: 'SSC GD Constable', applicants: '5,000,000+', vacancies: 39481, selectionRate: 0.79, difficulty: 'High', attempts: '1-2 years avg', category: 'SSC', color: '#1e3a8a' },
  { exam: 'RRB NTPC', applicants: '12,000,000+', vacancies: 8868, selectionRate: 0.07, difficulty: 'Extreme', attempts: '2-4 years avg', category: 'Railway', color: '#0f766e' },
  { exam: 'RRB Group D', applicants: '11,000,000+', vacancies: 32438, selectionRate: 0.29, difficulty: 'Very High', attempts: '1-3 years avg', category: 'Railway', color: '#0f766e' },
  { exam: 'IBPS PO', applicants: '1,500,000+', vacancies: 4455, selectionRate: 0.30, difficulty: 'Very High', attempts: '1-3 years avg', category: 'Banking', color: '#1e40af' },
  { exam: 'SBI PO', applicants: '2,000,000+', vacancies: 600, selectionRate: 0.03, difficulty: 'Extreme', attempts: '2-4 years avg', category: 'Banking', color: '#1e40af' },
  { exam: 'IBPS Clerk', applicants: '2,000,000+', vacancies: 6128, selectionRate: 0.31, difficulty: 'High', attempts: '1-2 years avg', category: 'Banking', color: '#1e40af' },
  { exam: 'BPSC CCE', applicants: '600,000+', vacancies: 1189, selectionRate: 0.20, difficulty: 'Very High', attempts: '2-4 years avg', category: 'State PSC', color: '#ca8a04' },
  { exam: 'UPPSC PCS', applicants: '500,000+', vacancies: 250, selectionRate: 0.05, difficulty: 'Extreme', attempts: '3-6 years avg', category: 'State PSC', color: '#ca8a04' },
];

const difficultyConfig = {
  'Extreme': { color: '#dc2626', bg: '#fee2e2' },
  'Very High': { color: '#ea580c', bg: '#ffedd5' },
  'High': { color: '#ca8a04', bg: '#fef9c3' },
  'Medium': { color: '#16a34a', bg: '#dcfce7' },
};

const categoryColors = {
  UPSC: '#7c3aed', SSC: '#1e3a8a', Railway: '#0f766e',
  Banking: '#1e40af', 'State PSC': '#ca8a04',
};

const insights = [
  { title: '🏆 Easiest to Crack (Relatively)', exam: 'SSC GD Constable', rate: '0.79%', reason: 'Highest vacancies (39,481) with physical fitness as key factor. 10th pass eligible.', color: '#16a34a' },
  { title: '😰 Hardest to Crack', exam: 'SBI PO', rate: '0.03%', reason: 'Only 600 vacancies against 20 lakh+ applicants. Extreme competition at every stage.', color: '#dc2626' },
  { title: '📈 Best ROI for Time Invested', exam: 'IBPS Clerk', rate: '0.31%', reason: 'Good vacancies (6,128), stable job, decent salary. 1-2 years preparation sufficient.', color: '#1e40af' },
  { title: '🎯 Best for Graduates', exam: 'SSC CGL', rate: '0.59%', reason: 'Best salary-to-difficulty ratio for graduates. Group B posts with ₹67,000+ in-hand.', color: '#1e3a8a' },
];

export default function CompetitionReportPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Job Competition Report 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>Selection Rates • Difficulty Levels • Applicants vs Vacancies Analysis</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>India's Most Comprehensive Government Job Competition Data</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Key Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {[
            { label: 'Total Applicants/Year', value: '3 Crore+', color: '#dc2626' },
            { label: 'Total Vacancies/Year', value: '3 Lakh+', color: '#16a34a' },
            { label: 'Avg Selection Rate', value: '< 1%', color: '#ca8a04' },
            { label: 'Exams Analyzed', value: competitionData.length, color: '#1e3a8a' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <p style={{ color: stat.color, fontSize: '28px', fontWeight: '900', margin: '0 0 4px 0' }}>{stat.value}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>🔍 Key Insights for Aspirants</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {insights.map((insight, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${insight.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: insight.color, fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>{insight.title}</h3>
              <p style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '800', margin: '0 0 6px 0' }}>{insight.exam} — Selection Rate: {insight.rate}</p>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{insight.reason}</p>
            </div>
          ))}
        </div>

        {/* Competition Table */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📊 Complete Competition Analysis 2026</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a' }}>
                  {['Exam', 'Category', 'Applicants', 'Vacancies', 'Selection Rate', 'Difficulty', 'Avg Time'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '12px', color: 'white', fontWeight: '700', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitionData.sort((a, b) => a.selectionRate - b.selectionRate).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#1e3a8a', fontWeight: '700' }}>{row.exam}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ backgroundColor: (categoryColors[row.category] || '#1e3a8a') + '20', color: categoryColors[row.category] || '#1e3a8a', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>{row.category}</span>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#374151' }}>{row.applicants}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#16a34a', fontWeight: '700' }}>{row.vacancies.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#dc2626', fontWeight: '800' }}>{row.selectionRate}%</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ backgroundColor: difficultyConfig[row.difficulty]?.bg, color: difficultyConfig[row.difficulty]?.color, padding: '3px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}>
                        {row.difficulty}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b' }}>{row.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>🎯 Which Exam Should You Choose?</h2>
          {[
            { profile: '10th Pass', exams: 'SSC GD, SSC MTS, RRB Group D, RRB ALP', strategy: 'Focus on SSC GD (highest vacancies 39,481) + RRB Group D. Physical fitness is crucial for SSC GD.' },
            { profile: '12th Pass', exams: 'SSC CHSL, RRB NTPC 12th posts, Agniveer', strategy: 'SSC CHSL offers best career path. RRB NTPC 12th pass posts also good. Agniveer for defence sector.' },
            { profile: 'Graduate (Any Stream)', exams: 'SSC CGL, RRB NTPC Graduate, IBPS PO, IBPS Clerk', strategy: 'SSC CGL has best salary. IBPS Clerk easiest to crack. Choose based on your subject strength.' },
            { profile: 'Engineering Graduate', exams: 'SSC JE, DRDO, HAL, ISRO, GATE PSU', strategy: 'GATE score opens PSU doors. DRDO/HAL/ISRO offer excellent career. SSC JE as backup.' },
            { profile: 'Dedicated Long-term Aspirant', exams: 'UPSC Civil Services, State PSC (UPPSC, BPSC)', strategy: 'Start with a backup exam (SSC/Banking) while preparing for UPSC. Financial stability is crucial during preparation.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', marginBottom: i < 4 ? '12px' : '0' }}>
              <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>👤 {item.profile}</p>
              <p style={{ color: '#0f766e', fontSize: '13px', fontWeight: '600', margin: '0 0 4px 0' }}>Best Exams: {item.exams}</p>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0 }}>Strategy: {item.strategy}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Which exam is right for YOU?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Tell SarkariGPT your qualification, age and goals — get personalized exam recommendation</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Get My Recommendation →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}