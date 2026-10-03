export const metadata = {
  title: 'State-wise Government Job Statistics 2026 — India Sarkari Naukri Data | Sarkari Success',
  description: 'State-wise government job statistics 2026. Compare government job opportunities across Bihar, UP, Rajasthan, Maharashtra, Tamil Nadu and all Indian states.',
  keywords: 'state-wise government jobs statistics, Bihar government jobs data, UP government jobs statistics, India sarkari naukri statistics 2026',
};

const stateStats = [
  { state: 'Uttar Pradesh', code: 'UP', population: '24 Cr', govtJobs: '28 Lakh+', majorExams: 'UPPSC, UP Police, UPSSSC', competition: 'Very High', link: '/jobs/uttar-pradesh', color: '#4CAF50' },
  { state: 'Bihar', code: 'BR', population: '13 Cr', govtJobs: '8 Lakh+', majorExams: 'BPSC, Bihar Police, BTSC', competition: 'Very High', link: '/jobs/bihar', color: '#FF6B35' },
  { state: 'Rajasthan', code: 'RJ', population: '8 Cr', govtJobs: '7 Lakh+', majorExams: 'RPSC, Rajasthan Police, RSMSSB', competition: 'High', link: '/jobs/rajasthan', color: '#FF9800' },
  { state: 'Madhya Pradesh', code: 'MP', population: '8.5 Cr', govtJobs: '7 Lakh+', majorExams: 'MPPSC, MP Police, MPESB', competition: 'High', link: '/jobs/madhya-pradesh', color: '#9C27B0' },
  { state: 'Maharashtra', code: 'MH', population: '12 Cr', govtJobs: '9 Lakh+', majorExams: 'MPSC, Maharashtra Police', competition: 'High', link: '/jobs/maharashtra', color: '#2196F3' },
  { state: 'West Bengal', code: 'WB', population: '10 Cr', govtJobs: '6 Lakh+', majorExams: 'WBPSC, WB Police, WBCS', competition: 'High', link: '/jobs/west-bengal', color: '#009688' },
  { state: 'Tamil Nadu', code: 'TN', population: '7.7 Cr', govtJobs: '7 Lakh+', majorExams: 'TNPSC Group 1/2/4, TN Police', competition: 'High', link: '/jobs/tamil-nadu', color: '#E91E63' },
  { state: 'Karnataka', code: 'KA', population: '6.7 Cr', govtJobs: '5 Lakh+', majorExams: 'KPSC, Karnataka Police, FDA/SDA', competition: 'Medium', link: '/jobs/karnataka', color: '#FF9800' },
  { state: 'Gujarat', code: 'GJ', population: '7 Cr', govtJobs: '5 Lakh+', majorExams: 'GPSC, Gujarat Police, GSET', competition: 'Medium', link: '/states', color: '#FF5722' },
  { state: 'Jharkhand', code: 'JH', population: '3.8 Cr', govtJobs: '3 Lakh+', majorExams: 'JPSC, Jharkhand Police, JSSC', competition: 'Medium', link: '/jobs/jharkhand', color: '#00BCD4' },
  { state: 'Odisha', code: 'OD', population: '4.5 Cr', govtJobs: '3 Lakh+', majorExams: 'OPSC, Odisha Police, OSSSC', competition: 'Medium', link: '/jobs/odisha', color: '#9C27B0' },
  { state: 'Kerala', code: 'KL', population: '3.5 Cr', govtJobs: '4 Lakh+', majorExams: 'Kerala PSC, Kerala Police', competition: 'Very High', link: '/states', color: '#4CAF50' },
];

const competitionColors = {
  'Very High': '#dc2626',
  'High': '#ca8a04',
  'Medium': '#16a34a',
};

const centralStats = [
  { org: 'SSC', full: 'Staff Selection Commission', annual: '75,000+', exams: 6, link: '/ssc' },
  { org: 'RRB', full: 'Railway Recruitment Board', annual: '87,000+', exams: 6, link: '/rrb' },
  { org: 'IBPS', full: 'Institute of Banking Personnel', annual: '35,000+', exams: 5, link: '/banking' },
  { org: 'UPSC', full: 'Union Public Service Commission', annual: '3,000+', exams: 8, link: '/upsc' },
  { org: 'Defence', full: 'Army, Navy, Air Force, Coast Guard', annual: '35,000+', exams: 6, link: '/defence' },
  { org: 'PSU', full: 'Public Sector Undertakings', annual: '10,000+', exams: '20+', link: '/psu' },
];

export default function JobStatisticsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Job Statistics India 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>State-wise and Category-wise Government Job Data — India's Most Comprehensive Database</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
          {[
            { label: 'Total Govt Jobs/Year', value: '3 Lakh+' },
            { label: 'States Covered', value: '24' },
            { label: 'Central Orgs', value: '6+' },
            { label: 'Aspirants/Year', value: '3 Crore+' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '12px 24px', textAlign: 'center' }}>
              <p style={{ color: 'white', fontSize: '22px', fontWeight: '900', margin: 0 }}>{stat.value}</p>
              <p style={{ color: '#bfdbfe', fontSize: '12px', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Central Govt Stats */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>Central Government Jobs — Annual Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {centralStats.map((org, i) => (
            <a key={i} href={org.link} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '900', margin: '0 0 4px 0' }}>{org.org}</h3>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 12px 0' }}>{org.full}</p>
              <p style={{ color: '#16a34a', fontSize: '22px', fontWeight: '900', margin: '0 0 4px 0' }}>{org.annual}</p>
              <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0' }}>vacancies per year</p>
              <p style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '700', margin: 0 }}>{org.exams} major exams →</p>
            </a>
          ))}
        </div>

        {/* State Stats Table */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>State-wise Government Job Statistics 2026</h2>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a' }}>
                  {['State', 'Population', 'Govt Jobs', 'Major Exams', 'Competition', 'View Jobs'].map((h, i) => (
                    <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: 'white', fontWeight: '700', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stateStats.map((state, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ color: state.color, fontWeight: '800', fontSize: '14px' }}>{state.state}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{state.population}</td>
                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#16a34a', fontWeight: '700' }}>{state.govtJobs}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: '#64748b' }}>{state.majorExams}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ backgroundColor: competitionColors[state.competition] + '20', color: competitionColors[state.competition], padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '700' }}>
                        {state.competition}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <a href={state.link} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>View →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Facts */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>📊 Key Facts — India Government Jobs 2026</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {[
            { title: '🏆 Highest Competition States', desc: 'UP, Bihar and Kerala have the highest competition for government jobs. UP alone has 2.3+ crore aspirants applying annually for all central and state exams.', color: '#dc2626' },
            { title: '📈 Fastest Growing Sector', desc: 'Banking sector (IBPS, SBI) has seen highest vacancy growth — from 15,000 in 2020 to 35,000+ in 2026. Best opportunity for graduates.', color: '#16a34a' },
            { title: '🚂 Railway — Largest Employer', desc: 'Indian Railways is the world\'s 4th largest employer. RRB conducts exams for 87,000+ vacancies annually across Group D, NTPC, ALP and technical posts.', color: '#0f766e' },
            { title: '🎓 UPSC — Most Prestigious', desc: 'UPSC Civil Services selects only 800-1,100 candidates from 10+ lakh applicants annually. Success rate is less than 0.1% — making it India\'s toughest exam.', color: '#7c3aed' },
          ].map((fact, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${fact.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: fact.color, fontSize: '15px', fontWeight: '800', margin: '0 0 8px 0' }}>{fact.title}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{fact.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Which state/exam is best for you?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT — get personalized recommendation based on your state and qualification</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Ask SarkariGPT →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}