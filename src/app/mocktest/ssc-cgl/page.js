export const metadata = {
  title: 'SSC CGL Free Mock Test 2026 (Hindi & English) — Full-Length Practice Paper | Sarkari Success',
  description: 'Take free SSC CGL 2026 mock tests in Hindi and English. Full-length Tier-1 practice papers with answers, solutions and score analysis. 100 questions, 60 minutes — exactly like the real exam.',
  keywords: 'SSC CGL mock test 2026, SSC CGL free online test, SSC CGL practice paper Hindi, SSC CGL tier 1 mock test, free ssc cgl test series',
  alternates: { canonical: 'https://www.sarkarisuccess.com/mocktest/ssc-cgl' },
  openGraph: {
    title: 'SSC CGL Free Mock Test 2026 | Sarkari Success',
    description: 'Full-length SSC CGL Tier-1 mock test in Hindi & English. 100 questions, 60 minutes, instant results.',
    url: 'https://www.sarkarisuccess.com/mocktest/ssc-cgl',
    siteName: 'Sarkari Success',
    locale: 'en_IN',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'Is the SSC CGL mock test free on Sarkari Success?',
    a: 'Yes, all SSC CGL mock tests on Sarkari Success are completely free. No registration or payment required to attempt the test. You can take unlimited practice tests.',
  },
  {
    q: 'How many questions are in the SSC CGL Tier-1 mock test?',
    a: 'The SSC CGL Tier-1 has 100 questions across 4 sections: General Intelligence & Reasoning (25), General Awareness (25), Quantitative Aptitude (25), and English Comprehension (25). Each question carries 2 marks. The time limit is 60 minutes.',
  },
  {
    q: 'Is the SSC CGL mock test available in Hindi?',
    a: 'Yes, Sarkari Success offers SSC CGL mock tests in both Hindi and English. You can switch the language at the start of each test session.',
  },
  {
    q: 'What is the negative marking in SSC CGL Tier-1?',
    a: 'SSC CGL Tier-1 has negative marking of 0.50 marks for each wrong answer. If you mark an incorrect answer, 0.5 marks are deducted from your total score. Un-attempted questions carry no penalty.',
  },
  {
    q: 'How is the SSC CGL Tier-1 score calculated?',
    a: 'Total marks = (Number of correct answers × 2) − (Number of wrong answers × 0.5). Maximum marks are 200. The SSC CGL 2026 cut-off for General category is expected to be around 145-155 marks for Tier-1.',
  },
];

export default function SSCCGLMockTestPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarkarisuccess.com" },
      { "@type": "ListItem", position: 2, name: "Mock Tests", item: "https://www.sarkarisuccess.com/mocktest" },
      { "@type": "ListItem", position: 3, name: "SSC CGL Mock Test", item: "https://www.sarkarisuccess.com/mocktest/ssc-cgl" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "SSC CGL Free Mock Test 2026",
    description: "Full-length free SSC CGL Tier-1 mock tests in Hindi and English with detailed solutions and score analysis.",
    provider: {
      "@type": "Organization",
      name: "Sarkari Success",
      url: "https://www.sarkarisuccess.com",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: ["en", "hi"],
    },
  };

  const syllabus = [
    { section: 'General Intelligence & Reasoning', questions: 25, marks: 50, topics: 'Analogy, Classification, Series, Coding-Decoding, Matrix, Blood Relations, Direction, Syllogism, Venn Diagram, Mirror Image' },
    { section: 'General Awareness', questions: 25, marks: 50, topics: 'History, Geography, Polity, Economy, Science, Current Affairs, Static GK, Awards & Honours' },
    { section: 'Quantitative Aptitude', questions: 25, marks: 50, topics: 'Percentage, Ratio, Average, Time-Work, Speed-Distance, SI/CI, Algebra, Geometry, Mensuration, Trigonometry, DI' },
    { section: 'English Comprehension', questions: 25, marks: 50, topics: 'Reading Comprehension, Error Spotting, Sentence Improvement, Fill in the Blanks, Idioms & Phrases, One Word Substitution, Spelling' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></span>
        </a>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <a href="/mocktest" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← All Mock Tests</a>
          <a href="/jobs" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Jobs</a>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: '#0f172a', backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', padding: '50px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#16a34a', borderRadius: '6px', padding: '4px 14px', marginBottom: '14px' }}>
          <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>✅ FREE — No Registration Required</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '34px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          SSC CGL Free Mock Test 2026
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', margin: '0 0 8px 0' }}>
          Hindi & English | Tier-1 Full-Length | 100 Questions | 60 Minutes | Instant Results
        </p>
        <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 28px 0' }}>
          Based on the latest SSC CGL 2026 exam pattern and syllabus
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/sarkarigpt?exam=ssc-cgl&lang=hi" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>
            🇮🇳 हिंदी में शुरू करें
          </a>
          <a href="/sarkarigpt?exam=ssc-cgl&lang=en" style={{ backgroundColor: '#1e40af', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px', border: '2px solid #60a5fa' }}>
            🇬🇧 Start in English
          </a>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '28px', fontSize: '13px', color: '#64748b' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <a href="/mocktest" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Mock Tests</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>SSC CGL Mock Test 2026</span>
        </nav>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {[
            { label: 'Questions', value: '100', icon: '📝' },
            { label: 'Duration', value: '60 Min', icon: '⏱️' },
            { label: 'Max Marks', value: '200', icon: '🏆' },
            { label: 'Language', value: 'Hi + En', icon: '🌐' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px' }}>{stat.icon}</div>
              <div style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '900', margin: '4px 0' }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About SSC CGL 2026 */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>
            About SSC CGL 2026
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, margin: '0 0 14px 0' }}>
            The <strong>Staff Selection Commission Combined Graduate Level (SSC CGL) 2026</strong> is one of India's most competitive government recruitment examinations. Conducted by the Staff Selection Commission, it recruits candidates for Group B and Group C posts in various Central Government Ministries, Departments and Offices — including Income Tax Inspector, Auditor, Accountant, Statistical Investigator, and more.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, margin: '0 0 14px 0' }}>
            SSC CGL 2026 is conducted in two tiers. Tier-1 is a Computer Based Test (CBT) with 100 objective-type questions carrying 200 marks, to be attempted in 60 minutes. The exam tests candidates on Reasoning, General Awareness, Quantitative Aptitude, and English — the four sections covered in our free mock tests.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
            Our free SSC CGL mock tests are designed to exactly replicate the real exam environment — same question types, same difficulty distribution, same marking scheme. We update questions every month based on the latest official syllabus, previous year papers and emerging question patterns.
          </p>
        </section>

        {/* Syllabus Table */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 20px 0' }}>
            SSC CGL Tier-1 Exam Pattern 2026
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Section</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Questions</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Marks</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Key Topics</th>
                </tr>
              </thead>
              <tbody>
                {syllabus.map((row, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : 'white', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '700', color: '#1e3a8a' }}>{row.section}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700' }}>{row.questions}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '700', color: '#16a34a' }}>{row.marks}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '12px' }}>{row.topics}</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#1e3a8a', color: 'white', fontWeight: '900' }}>
                  <td style={{ padding: '12px 16px' }}>Total</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>100</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>200</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px' }}>Negative Marking: −0.5 per wrong answer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Prepare */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 20px 0' }}>
            SSC CGL 2026 Preparation Strategy
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { phase: 'Month 1-2', title: 'Build Foundation', tips: ['Complete basic concepts in all 4 sections', 'Focus on Maths: Percentage, Ratio, Time-Work', 'Build vocabulary: 20 words/day', 'Current affairs: read newspaper daily'] },
              { phase: 'Month 3-4', title: 'Practice & Speed', tips: ['Solve 50+ questions per day per section', 'Take sectional mock tests', 'Analyse mistakes and revise weak areas', 'Speed drills: aim 2 mins per question → 30 secs'] },
              { phase: 'Month 5', title: 'Full-Length Mocks', tips: ['Take 2 full-length mock tests per week', 'Analyse each mock — don\'t just attempt', 'Focus on accuracy over speed', 'Revise formulas and important GK facts'] },
              { phase: 'Final Week', title: 'Revision Mode', tips: ['Light revision only — no new topics', 'Review your notes and formula sheets', 'Sleep 7-8 hours every night', 'Check exam centre and ID documents'] },
            ].map((phase, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#fbbf24', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>{phase.phase}</div>
                <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: '0 0 12px 0' }}>{phase.title}</h3>
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {phase.tips.map((tip, j) => (
                    <li key={j} style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7 }}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Related Exams */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 16px 0' }}>
            More SSC Mock Tests
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { name: 'SSC CHSL Mock Test', href: '/mocktest/ssc-chsl', desc: '10+2 Level | 100 Qs | 60 Min' },
              { name: 'SSC MTS Mock Test', href: '/mocktest/ssc-mts', desc: 'Matric Level | 90 Qs | 90 Min' },
              { name: 'Railway NTPC Mock Test', href: '/mocktest/railway-ntpc', desc: 'RRB NTPC | 100 Qs | 90 Min' },
              { name: 'UPSC Prelims Mock Test', href: '/mocktest/upsc-prelims', desc: 'GS Paper-I | 100 Qs | 120 Min' },
              { name: 'SBI PO Mock Test', href: '/mocktest/sbi-po', desc: 'Prelims | 100 Qs | 60 Min' },
              { name: 'IBPS Clerk Mock Test', href: '/mocktest/ibps-clerk', desc: 'Prelims | 100 Qs | 60 Min' },
            ].map((exam, i) => (
              <a key={i} href={exam.href} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', textDecoration: 'none' }}>
                <div style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>{exam.name}</div>
                <div style={{ color: '#64748b', fontSize: '12px' }}>{exam.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 24px 0' }}>
            Frequently Asked Questions — SSC CGL Mock Test
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: i < faqs.length - 1 ? '20px' : 0 }}>
                <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>{faq.q}</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '22px', fontWeight: '800', margin: '0 0 12px 0' }}>
            Ready to Test Yourself?
          </h2>
          <p style={{ color: '#bfdbfe', fontSize: '15px', margin: '0 0 24px 0' }}>
            Start your SSC CGL 2026 mock test now — free, no sign-up, available 24/7.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sarkarigpt?exam=ssc-cgl&lang=hi" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>
              🇮🇳 हिंदी में शुरू करें
            </a>
            <a href="/sarkarigpt?exam=ssc-cgl&lang=en" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>
              🇬🇧 Start in English
            </a>
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        <span>© 2026 Sarkari Success. All rights reserved. | </span>
        <a href="/privacy" style={{ color: '#bfdbfe', textDecoration: 'none' }}>Privacy Policy</a>
        <span> | </span>
        <a href="/about" style={{ color: '#bfdbfe', textDecoration: 'none' }}>About Us</a>
      </footer>
    </main>
  );
}
