export const metadata = {
  title: 'RRB NTPC Free Mock Test 2026 (Hindi & English) — Full-Length CBT Practice | Sarkari Success',
  description: 'Free RRB NTPC 2026 mock test in Hindi and English. CBT-1 full-length 100-question practice paper with answers, solutions and score analysis. Start now — no registration needed.',
  keywords: 'RRB NTPC mock test 2026, Railway NTPC free test, RRB NTPC CBT-1 practice paper Hindi, railway ntpc online test series, rrb ntpc mock test hindi',
  alternates: { canonical: 'https://www.sarkarisuccess.com/mocktest/railway-ntpc' },
  openGraph: {
    title: 'RRB NTPC Free Mock Test 2026 | Sarkari Success',
    url: 'https://www.sarkarisuccess.com/mocktest/railway-ntpc',
    siteName: 'Sarkari Success',
    locale: 'en_IN',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'How many questions are there in the RRB NTPC CBT-1 mock test?',
    a: 'The RRB NTPC CBT-1 has 100 questions: General Awareness (40), Mathematics (30), and General Intelligence & Reasoning (30). The time limit is 90 minutes. Each correct answer carries 1 mark.',
  },
  {
    q: 'What is the negative marking in RRB NTPC?',
    a: 'There is negative marking of 1/3 mark (approximately 0.33 marks) for each wrong answer in RRB NTPC CBT-1 and CBT-2. Un-attempted questions carry no penalty.',
  },
  {
    q: 'Is the RRB NTPC mock test available in Hindi?',
    a: 'Yes, Sarkari Success provides RRB NTPC mock tests in both Hindi and English. All questions, options and explanations are available in your preferred language.',
  },
  {
    q: 'What is the expected cut-off for RRB NTPC 2026?',
    a: 'The RRB NTPC 2026 cut-off varies by post, zone and category. Generally, for Graduate posts (General category), the CBT-1 cut-off is expected to range from 68-78 marks out of 100.',
  },
  {
    q: 'What posts are recruited through RRB NTPC 2026?',
    a: 'RRB NTPC 2026 recruits for various Non-Technical Popular Category posts including Junior Clerk cum Typist, Accounts Clerk cum Typist, Junior Time Keeper, Trains Clerk, Commercial cum Ticket Clerk (Under-graduate), and Senior Commercial cum Ticket Clerk, Senior Clerk cum Typist, Junior Account Assistant cum Typist, Senior Time Keeper, Commercial Apprentice, and Station Master (Graduate level).',
  },
];

export default function RailwayNTPCMockTestPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarkarisuccess.com" },
      { "@type": "ListItem", position: 2, name: "Mock Tests", item: "https://www.sarkarisuccess.com/mocktest" },
      { "@type": "ListItem", position: 3, name: "RRB NTPC Mock Test", item: "https://www.sarkarisuccess.com/mocktest/railway-ntpc" },
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

  const examPattern = [
    { section: 'Mathematics', questions: 30, marks: 30, topics: 'Number System, BODMAS, Decimal, Fractions, LCM & HCF, Ratio & Proportion, Percentage, Mensuration, Time & Work, Time & Distance, Simple & Compound Interest, Profit & Loss, Geometry' },
    { section: 'General Intelligence & Reasoning', questions: 30, marks: 30, topics: 'Analogy, Number & Alphabetical Series, Coding & Decoding, Mathematical Operations, Syllogism, Venn Diagram, Data Sufficiency, Blood Relations, Direction, Calendar & Clock' },
    { section: 'General Awareness', questions: 40, marks: 40, topics: 'Current Events, Science & Technology, Sports, Art & Culture, Economics, Polity, History, Geography, Environmental Issues, Indian Railways GK' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></span>
        </a>
        <a href="/mocktest" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← All Mock Tests</a>
      </div>

      <div style={{ backgroundColor: '#1a1a2e', backgroundImage: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)', padding: '50px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#dc2626', borderRadius: '6px', padding: '4px 14px', marginBottom: '14px' }}>
          <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>🚂 Railway Recruitment Board</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          RRB NTPC Free Mock Test 2026
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', margin: '0 0 8px 0' }}>
          Hindi & English | CBT-1 Full-Length | 100 Questions | 90 Minutes
        </p>
        <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 28px 0' }}>
          Based on official RRB NTPC 2026 exam pattern — free, no sign-up needed
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/sarkarigpt?exam=railway-ntpc&lang=hi" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px' }}>
            🚂 हिंदी में शुरू करें
          </a>
          <a href="/sarkarigpt?exam=railway-ntpc&lang=en" style={{ backgroundColor: 'transparent', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '16px', border: '2px solid #60a5fa' }}>
            Start in English
          </a>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>
        <nav style={{ marginBottom: '28px', fontSize: '13px', color: '#64748b' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <a href="/mocktest" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Mock Tests</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>RRB NTPC Mock Test 2026</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px' }}>
          {[
            { label: 'Questions', value: '100', icon: '📝' },
            { label: 'Duration', value: '90 Min', icon: '⏱️' },
            { label: 'Max Marks', value: '100', icon: '🏆' },
            { label: 'Negative Mark', value: '−1/3', icon: '⚠️' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '24px' }}>{stat.icon}</div>
              <div style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '900', margin: '4px 0' }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '12px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0' }}>About RRB NTPC 2026</h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, margin: '0 0 14px 0' }}>
            The <strong>Railway Recruitment Board Non-Technical Popular Categories (RRB NTPC) 2026</strong> is one of the largest government recruitment drives in India, conducted by the Railway Recruitment Boards under the Ministry of Railways. NTPC 2026 is expected to notify thousands of vacancies across 7 Railway Zones for both Graduate and Under-Graduate level posts.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
            The RRB NTPC exam is held in two stages: CBT-1 (qualifying) and CBT-2 (main exam). Our free mock tests focus on CBT-1 — the first and most critical hurdle. With over 1 crore candidates expected to apply for NTPC 2026, thorough preparation and consistent mock test practice are essential to crack the exam.
          </p>
        </section>

        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 20px 0' }}>RRB NTPC CBT-1 Exam Pattern 2026</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Section</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Questions</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Marks</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Key Topics</th>
                </tr>
              </thead>
              <tbody>
                {examPattern.map((row, i) => (
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
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>100</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px' }}>Negative Marking: −1/3 per wrong answer | Time: 90 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 24px 0' }}>
            Frequently Asked Questions
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
          {[
            { name: 'SSC CGL Mock Test', href: '/mocktest/ssc-cgl' },
            { name: 'UPSC Prelims Mock Test', href: '/mocktest/upsc-prelims' },
            { name: 'SBI PO Mock Test', href: '/mocktest/sbi-po' },
          ].map((link, i) => (
            <a key={i} href={link.href} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', textDecoration: 'none', textAlign: 'center', color: '#1e3a8a', fontWeight: '700', fontSize: '14px' }}>
              {link.name}
            </a>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0' }}>Start Your RRB NTPC Practice Now</h2>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 20px 0' }}>Free, bilingual, no sign-up needed.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/sarkarigpt?exam=railway-ntpc&lang=hi" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800' }}>हिंदी में शुरू करें</a>
            <a href="/sarkarigpt?exam=railway-ntpc&lang=en" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800' }}>Start in English</a>
          </div>
        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        © 2026 Sarkari Success. | <a href="/about" style={{ color: '#bfdbfe', textDecoration: 'none' }}>About</a> | <a href="/privacy" style={{ color: '#bfdbfe', textDecoration: 'none' }}>Privacy</a>
      </footer>
    </main>
  );
}
