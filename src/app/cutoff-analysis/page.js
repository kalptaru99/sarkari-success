export const metadata = {
  title: 'Government Exam Cutoff Analysis 2020-2026 — SSC, Railway, UPSC, Banking | Sarkari Success',
  description: 'Previous year cutoff marks analysis for SSC CGL, CHSL, RRB NTPC, UPSC Civil Services, IBPS PO. Know the cutoff trends to plan your preparation better.',
  keywords: 'SSC CGL cutoff 2026, RRB NTPC cutoff, UPSC cutoff marks, IBPS PO cutoff, government exam cutoff analysis 2026',
};

const cutoffData = [
  {
    exam: 'SSC CGL Tier 1',
    color: '#1e3a8a',
    link: '/ssc',
    data: [
      { year: '2024', general: 145.5, obc: 141.25, sc: 130.5, st: 120.75, total: 200 },
      { year: '2023', general: 148.25, obc: 143.5, sc: 133.75, st: 122.5, total: 200 },
      { year: '2022', general: 162.5, obc: 157.75, sc: 147.25, st: 136.0, total: 200 },
      { year: '2021', general: 155.0, obc: 150.5, sc: 140.25, st: 129.75, total: 200 },
    ],
    trend: 'Cutoff declining slightly in recent years due to increased vacancies',
  },
  {
    exam: 'SSC CHSL Tier 1',
    color: '#7c3aed',
    link: '/ssc',
    data: [
      { year: '2024', general: 142.5, obc: 137.25, sc: 127.0, st: 116.75, total: 200 },
      { year: '2023', general: 145.75, obc: 140.5, sc: 130.25, st: 119.0, total: 200 },
      { year: '2022', general: 158.25, obc: 153.0, sc: 143.5, st: 132.25, total: 200 },
    ],
    trend: 'CHSL cutoff follows CGL pattern — higher difficulty means lower cutoff',
  },
  {
    exam: 'RRB NTPC CBT 1',
    color: '#0f766e',
    link: '/rrb',
    data: [
      { year: '2024', general: 75.2, obc: 72.8, sc: 65.4, st: 60.1, total: 100 },
      { year: '2021', general: 78.5, obc: 75.3, sc: 68.2, st: 63.4, total: 100 },
      { year: '2019', general: 80.1, obc: 77.2, sc: 70.5, st: 65.8, total: 100 },
    ],
    trend: 'Railway NTPC cutoffs competitive — GK section crucial for clearing cutoff',
  },
  {
    exam: 'UPSC Civil Services Prelims',
    color: '#7c3aed',
    link: '/upsc',
    data: [
      { year: '2024', general: 92.51, obc: 91.02, sc: 84.37, st: 77.86, total: 200 },
      { year: '2023', general: 91.87, obc: 90.38, sc: 83.72, st: 77.21, total: 200 },
      { year: '2022', general: 90.73, obc: 88.95, sc: 82.86, st: 75.41, total: 200 },
      { year: '2021', general: 87.54, obc: 85.68, sc: 79.34, st: 72.85, total: 200 },
    ],
    trend: 'UPSC cutoff steadily increasing — current affairs and CSAT both important',
  },
  {
    exam: 'IBPS PO Prelims',
    color: '#1e40af',
    link: '/banking',
    data: [
      { year: '2024', general: 62.5, obc: 60.25, sc: 54.75, st: 50.25, total: 100 },
      { year: '2023', general: 65.75, obc: 63.5, sc: 57.25, st: 53.0, total: 100 },
      { year: '2022', general: 61.25, obc: 59.0, sc: 52.75, st: 48.5, total: 100 },
    ],
    trend: 'IBPS PO cutoff varies — Reasoning and Quant scores most crucial',
  },
  {
    exam: 'SBI PO Prelims',
    color: '#dc2626',
    link: '/banking',
    data: [
      { year: '2024', general: 58.75, obc: 56.5, sc: 51.0, st: 46.75, total: 100 },
      { year: '2023', general: 62.25, obc: 60.0, sc: 54.5, st: 50.25, total: 100 },
      { year: '2022', general: 59.5, obc: 57.25, sc: 51.75, st: 47.5, total: 100 },
    ],
    trend: 'SBI PO cutoff competitive but stable — English section important differentiator',
  },
];

export default function CutoffAnalysisPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Exam Cutoff Analysis 2020-2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Banking — Previous Year Cutoff Trends</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Use cutoff data to set your target score and plan preparation</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Key Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {[
            { title: '📈 SSC Cutoffs', desc: 'Declining slightly due to increased vacancies. Target 150+ for safe selection.', color: '#1e3a8a' },
            { title: '🚂 Railway Cutoffs', desc: 'GK is the differentiator. Score 80%+ in Reasoning to clear cutoff safely.', color: '#0f766e' },
            { title: '🏦 Banking Cutoffs', desc: 'Sectional cutoffs matter. All 3 sections need individual clearing.', color: '#1e40af' },
          ].map((insight, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${insight.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: insight.color, fontSize: '15px', fontWeight: '800', margin: '0 0 8px 0' }}>{insight.title}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{insight.desc}</p>
            </div>
          ))}
        </div>

        {/* Cutoff Tables */}
        {cutoffData.map((exam, i) => (
          <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            <div style={{ backgroundColor: exam.color, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: 0 }}>{exam.exam} — Cutoff Marks</h2>
              <a href={exam.link} style={{ color: 'white', fontSize: '13px', textDecoration: 'none', opacity: 0.8 }}>View Jobs →</a>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    {['Year', 'General', 'OBC', 'SC', 'ST', 'Total Marks'].map((h, j) => (
                      <th key={j} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', color: '#64748b', fontWeight: '700', borderBottom: '1px solid #e2e8f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exam.data.map((row, j) => (
                    <tr key={j} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: j % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: exam.color, fontWeight: '800' }}>{row.year}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: '#16a34a', fontWeight: '700' }}>{row.general}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{row.obc}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{row.sc}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{row.st}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px 20px', borderTop: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>💡 Trend: {exam.trend}</p>
            </div>
          </div>
        ))}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Will you clear the cutoff?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Tell SarkariGPT your mock test scores — get personalized cutoff analysis</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Analyze My Score →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}