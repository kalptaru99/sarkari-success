export const metadata = {
  title: 'Government Exam Preparation Checklist 2026 — SSC, Railway, UPSC, Banking | Sarkari Success',
  description: 'Complete government exam preparation checklist 2026. Step-by-step preparation guide for SSC CGL, RRB NTPC, UPSC Civil Services, IBPS PO with study plan.',
  keywords: 'government exam preparation checklist, SSC CGL preparation guide, UPSC preparation checklist, RRB NTPC study plan, banking exam preparation 2026',
};

const phases = [
  {
    phase: 'Phase 1 — Foundation (Month 1-2)',
    color: '#1e3a8a',
    steps: [
      { task: 'Choose your target exam', desc: 'Pick ONE exam based on eligibility, age and preference. Don\'t prepare for multiple exams simultaneously.' },
      { task: 'Download official syllabus', desc: 'Get the latest syllabus from the official website. Mark topics by weightage.' },
      { task: 'Get previous year papers', desc: 'Download last 5-10 years question papers. Analyze topic-wise distribution.' },
      { task: 'Create study timetable', desc: 'Allocate 6-8 hours daily. Morning for difficult subjects, evening for revision.' },
      { task: 'Get standard books', desc: 'SSC: Kiran/Arihant. Railway: RRB Guide. UPSC: NCERTs first. Banking: Adda247/Oliveboard.' },
    ],
  },
  {
    phase: 'Phase 2 — Subject Preparation (Month 3-5)',
    color: '#7c3aed',
    steps: [
      { task: 'Complete Quantitative Aptitude', desc: 'Percentage, Profit/Loss, Ratio, Time-Work, Time-Distance, Geometry, DI — in this order.' },
      { task: 'Complete Reasoning Ability', desc: 'Analogy, Series, Coding-Decoding, Puzzles, Syllogism, Blood Relations.' },
      { task: 'Complete English Language', desc: 'Grammar rules, Vocabulary, Reading Comprehension, Error Detection, Cloze Test.' },
      { task: 'Complete General Awareness', desc: 'Current Affairs (last 6 months), Static GK, History, Geography, Polity, Economy, Science.' },
      { task: 'Practice 50 questions daily', desc: 'Subject-wise practice with time limit. Review mistakes immediately.' },
    ],
  },
  {
    phase: 'Phase 3 — Mock Tests (Month 6)',
    color: '#0f766e',
    steps: [
      { task: 'Start full mock tests', desc: 'Take one full mock test every alternate day. Strictly follow exam time limits.' },
      { task: 'Analyze each mock test', desc: 'Calculate accuracy, speed, topic-wise performance. Never skip analysis.' },
      { task: 'Maintain error log', desc: 'Note down every wrong answer with correct solution. Review weekly.' },
      { task: 'Improve weak areas', desc: 'Spend extra time on topics with <50% accuracy. Practice 100+ questions per weak topic.' },
      { task: 'Speed building', desc: 'Try to solve 20% more questions than attempted in first mock. Focus on accuracy + speed.' },
    ],
  },
  {
    phase: 'Phase 4 — Final Revision (Last 30 Days)',
    color: '#dc2626',
    steps: [
      { task: 'Revise all formulas and shortcuts', desc: 'Make a formula sheet. Revise daily for 30 minutes.' },
      { task: 'Daily current affairs', desc: 'Read 1 newspaper or current affairs app daily. Focus on last 6 months.' },
      { task: 'Take mock test daily', desc: 'One full mock test every day. Target improving by 5 marks per week.' },
      { task: 'Revise notes only', desc: 'Stop reading new material. Focus on revision of what you already know.' },
      { task: 'Exam day preparation', desc: 'Keep admit card, ID proof, photos ready. Sleep 7-8 hours before exam.' },
    ],
  },
];

const examStrategies = [
  { exam: 'SSC CGL', time: '6-8 months', daily: '6-8 hours', priority: 'Maths + Reasoning (60% weightage)', color: '#1e3a8a' },
  { exam: 'RRB NTPC', time: '4-6 months', daily: '5-6 hours', priority: 'GK + Maths + Reasoning equally', color: '#0f766e' },
  { exam: 'UPSC Civil Services', time: '12-18 months', daily: '8-10 hours', priority: 'GS + Optional subject + Current Affairs', color: '#7c3aed' },
  { exam: 'IBPS PO', time: '4-5 months', daily: '5-6 hours', priority: 'Reasoning + Quant + English (80% weightage)', color: '#1e40af' },
];

export default function PreparationChecklistPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Exam Preparation Checklist 2026</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: '0 0 8px 0' }}>SSC • Railway • UPSC • Banking — Complete Step-by-Step Preparation Guide</p>
        <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>Bookmark this page • Follow every step • Get selected</p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Exam Strategy */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>⏱️ Exam-wise Preparation Strategy</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {examStrategies.map((exam, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: `2px solid ${exam.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: exam.color, fontSize: '18px', fontWeight: '900', margin: '0 0 12px 0' }}>{exam.exam}</h3>
              <p style={{ color: '#374151', fontSize: '13px', margin: '0 0 6px 0' }}>⏰ Preparation Time: <strong>{exam.time}</strong></p>
              <p style={{ color: '#374151', fontSize: '13px', margin: '0 0 6px 0' }}>📚 Daily Hours: <strong>{exam.daily}</strong></p>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0 }}>🎯 Priority: <strong>{exam.priority}</strong></p>
            </div>
          ))}
        </div>

        {/* Phase-wise checklist */}
        <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>✅ Phase-wise Preparation Checklist</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          {phases.map((phase, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: `4px solid ${phase.color}` }}>
              <h3 style={{ color: phase.color, fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>{phase.phase}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {phase.steps.map((step, j) => (
                  <div key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                    <span style={{ color: phase.color, fontSize: '18px', flexShrink: 0 }}>☐</span>
                    <div>
                      <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{step.task}</p>
                      <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Do's and Don'ts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#dcfce7', borderRadius: '12px', padding: '24px', border: '1px solid #bbf7d0' }}>
            <h3 style={{ color: '#16a34a', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>✅ DO's</h3>
            {['Focus on one exam at a time', 'Practice previous year papers', 'Take mock tests regularly', 'Maintain an error log', 'Revise daily for 30 minutes', 'Sleep 7-8 hours daily', 'Stay updated with current affairs', 'Join a study group'].map((item, i) => (
              <p key={i} style={{ color: '#166534', fontSize: '13px', margin: '0 0 8px 0' }}>✓ {item}</p>
            ))}
          </div>
          <div style={{ backgroundColor: '#fee2e2', borderRadius: '12px', padding: '24px', border: '1px solid #fecaca' }}>
            <h3 style={{ color: '#dc2626', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>❌ DON'Ts</h3>
            {['Prepare for multiple exams simultaneously', 'Skip mock tests', 'Study without a timetable', 'Ignore weak subjects', 'Study 12+ hours without breaks', 'Ignore current affairs', 'Copy others\' study schedule', 'Start with new topics in last 30 days'].map((item, i) => (
              <p key={i} style={{ color: '#991b1b', fontSize: '13px', margin: '0 0 8px 0' }}>✗ {item}</p>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Get AI-Powered Personalized Study Plan</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Tell SarkariGPT your exam, time available and weak areas — get a custom study plan</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>Get My Study Plan →</a>
        </div>

      </div>
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>2026 Sarkari Success. All rights reserved.</footer>
    </main>
  );
}