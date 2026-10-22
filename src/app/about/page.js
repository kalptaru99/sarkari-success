export const metadata = {
  title: 'About Sarkari Success — India\'s AI-Powered Sarkari Career Companion',
  description: 'Learn about Sarkari Success — who we are, our editorial team, how we verify government job notifications, and our commitment to accuracy for 1 crore+ aspirants across India.',
  alternates: { canonical: 'https://www.sarkarisuccess.com/about' },
  openGraph: {
    title: 'About Sarkari Success | India\'s Trusted Sarkari Naukri Platform',
    description: 'Meet the team behind Sarkari Success — how we verify notifications, our editorial process, and our mission to help every government job aspirant in India.',
    url: 'https://www.sarkarisuccess.com/about',
    siteName: 'Sarkari Success',
    locale: 'en_IN',
    type: 'website',
  },
};

const teamMembers = [
  {
    name: 'Sarkari Success Editorial Team',
    role: 'Chief Content Verifier',
    bio: 'Our core editorial team has 8+ years of experience tracking government job notifications across SSC, Railway, UPSC, Banking and State PSC bodies. Every notification is cross-checked against the official PDF from the hiring organization before publication.',
    expertise: ['SSC Exams', 'Railway Recruitment', 'UPSC', 'State PSC'],
  },
  {
    name: 'Exam Analysis Desk',
    role: 'Syllabus & Pattern Specialists',
    bio: 'A dedicated team of subject matter experts who analyze exam patterns, syllabus changes, cut-off trends and mark schemes. Formerly qualified candidates in SSC CGL, SBI PO and IBPS PO themselves.',
    expertise: ['Exam Pattern', 'Syllabus', 'Cut-off Analysis', 'Mock Tests'],
  },
  {
    name: 'Legal & Compliance Review',
    role: 'Notification Verification',
    bio: 'Specialists who review official government gazette notifications, corrigenda and amendments. Ensures age relaxations, reservation quotas and eligibility conditions are reported accurately per the official advertisement.',
    expertise: ['Official Gazette', 'Reservation Policy', 'Eligibility Verification'],
  },
];

const verificationProcess = [
  {
    step: '1',
    title: 'Source from Official Website',
    desc: 'Every job notification is sourced directly from the official recruitment body website — SSC.nic.in, Indianrailways.gov.in, UPSC.gov.in, etc. We never rely on secondary sources for primary data.',
  },
  {
    step: '2',
    title: 'PDF Cross-Check',
    desc: 'Our team downloads and reads the original official PDF notification to verify vacancy count, eligibility criteria, application dates, and fee structure before publishing any details.',
  },
  {
    step: '3',
    title: 'Structured Data Entry',
    desc: 'Verified data is entered into our structured database with mandatory fields: official link, last date, vacancy count, and eligibility. Incomplete entries are held for review.',
  },
  {
    step: '4',
    title: 'AI-Assisted Formatting',
    desc: 'Our AI tools help format and present the verified information clearly in Hindi and English — but AI output is always reviewed by a human editor before going live.',
  },
  {
    step: '5',
    title: 'Ongoing Monitoring',
    desc: 'Active notifications are monitored daily. When an extension, corrigendum or amendment is issued by the official body, we update the page within 24 hours and timestamp the change.',
  },
];

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarkari Success",
    url: "https://www.sarkarisuccess.com",
    logo: "https://www.sarkarisuccess.com/logo.png",
    description: "India's first AI-powered sarkari career companion. Tracks government job notifications, results, admit cards for SSC, Railway, UPSC, Banking & State PSC with verified, accurate information.",
    foundingDate: "2022",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: "contact.sarkarisuccess@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://t.me/sarkarisuccess",
      "https://www.youtube.com/@sarkarisuccess",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarkarisuccess.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.sarkarisuccess.com/about" },
    ],
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success™</span>
          </h1>
        </a>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <a href="/jobs" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Jobs</a>
          <a href="/results" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Results</a>
          <a href="/contact" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Contact</a>
        </nav>
      </div>

      {/* Hero */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '60px 24px', textAlign: 'center', backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', padding: '6px 16px', marginBottom: '16px' }}>
          <span style={{ color: '#fbbf24', fontSize: '13px', fontWeight: '700' }}>🏆 Trusted by 1 Crore+ Aspirants</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: 1.2 }}>
          About Sarkari Success
        </h1>
        <p style={{ color: '#bfdbfe', fontSize: '18px', margin: '0 auto', maxWidth: '700px', lineHeight: 1.6 }}>
          India's first AI-powered sarkari career companion — built to give every government job aspirant accurate, verified, and timely information in Hindi & English.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '32px', fontSize: '13px', color: '#64748b' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>About</span>
        </nav>

        {/* Mission */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', margin: '0 0 20px 0' }}>
            Our Mission
          </h2>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: 1.8, margin: '0 0 16px 0' }}>
            Sarkari Success was founded with a single goal: <strong>make government job information in India accurate, accessible, and understandable</strong> — for aspirants in every corner of the country, whether they are in Delhi or Darbhanga, Coimbatore or Chhattisgarh.
          </p>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: 1.8, margin: '0 0 16px 0' }}>
            India has over 2.5 crore active government job aspirants. Most platforms either copy notifications without verification, or publish outdated information that misleads candidates about eligibility, dates, and vacancies. <strong>We do things differently.</strong>
          </p>
          <p style={{ color: '#374151', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
            Every notification on Sarkari Success is verified against the <strong>official PDF</strong> from the hiring organization. Our editorial team cross-checks vacancy counts, eligibility criteria, age limits, application dates and fee structures before publishing — and updates within 24 hours if an official corrigendum or amendment is issued.
          </p>
        </section>

        {/* What We Cover */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', margin: '0 0 24px 0' }}>
            What We Cover
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { emoji: '📋', title: 'Job Notifications', desc: 'SSC, Railway, UPSC, Banking, State PSC, Defence, Teaching — 500+ notifications tracked monthly.' },
              { emoji: '📰', title: 'Admit Cards', desc: 'Hall ticket download links, exam centre details, reporting time — all in one place.' },
              { emoji: '🏆', title: 'Results & Cut-offs', desc: 'Final results, merit lists, interview schedules and category-wise cut-off marks.' },
              { emoji: '📅', title: 'Exam Calendar', desc: 'Upcoming exam dates for 2026 across all categories — plan your preparation year-round.' },
              { emoji: '🤖', title: 'AI Mock Tests', desc: 'Free bilingual mock tests for SSC CGL, CHSL, Railway, UPSC and State PSC in Hindi & English.' },
              { emoji: '📍', title: 'State Job Hubs', desc: 'Dedicated pages for Bihar, UP, Rajasthan, MP, Tamil Nadu, Gujarat, Haryana, Assam and more.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.emoji}</div>
                <h3 style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: '0 0 8px 0' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Team */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', margin: '0 0 8px 0' }}>
            Our Editorial Team
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px 0' }}>
            Every piece of information on Sarkari Success is verified by our human editorial team before going live. Here is who checks the facts:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {teamMembers.map((member, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontSize: '22px', fontWeight: '900' }}>{member.name.charAt(0)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#1e3a8a', fontSize: '17px', fontWeight: '800', margin: '0 0 4px 0' }}>{member.name}</h3>
                  <p style={{ color: '#fbbf24', fontSize: '13px', fontWeight: '700', margin: '0 0 10px 0' }}>{member.role}</p>
                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, margin: '0 0 12px 0' }}>{member.bio}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {member.expertise.map((tag, j) => (
                      <span key={j} style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Process */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', margin: '0 0 8px 0' }}>
            How We Verify Information
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 28px 0' }}>
            Our 5-step editorial process ensures you never act on incorrect or outdated information:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {verificationProcess.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontWeight: '900', fontSize: '16px' }}>{item.step}</span>
                </div>
                <div>
                  <h3 style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '700', margin: '0 0 6px 0' }}>{item.title}</h3>
                  <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Correction Policy */}
        <section style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ color: '#92400e', fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0' }}>
            📝 Correction Policy
          </h2>
          <p style={{ color: '#78350f', fontSize: '14px', lineHeight: 1.7, margin: '0 0 12px 0' }}>
            We are committed to accuracy, but government bodies sometimes issue corrigenda or amendments after the original notification. When that happens:
          </p>
          <ul style={{ color: '#78350f', fontSize: '14px', lineHeight: 2, margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li>We update the affected page within 24 hours of the official amendment</li>
            <li>We add a visible "Updated on [date]" note to the page</li>
            <li>Significant corrections are highlighted with a correction notice at the top of the page</li>
          </ul>
          <p style={{ color: '#78350f', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
            If you spot an error or outdated information, please write to us at <strong>contact.sarkarisuccess@gmail.com</strong> — we will review and correct within 24 hours.
          </p>
        </section>

        {/* Disclaimer */}
        <section style={{ backgroundColor: '#f1f5f9', borderRadius: '16px', padding: '28px', marginBottom: '32px', border: '1px solid #cbd5e1' }}>
          <h2 style={{ color: '#374151', fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0' }}>
            ⚠️ Disclaimer
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: '0 0 12px 0' }}>
            Sarkari Success is an independent information platform and is <strong>not affiliated with any government body, ministry, or public service commission</strong>. We do not conduct any examination or recruitment ourselves.
          </p>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
            All recruitment, eligibility, and application decisions are made solely by the official recruiting organization. We strongly recommend candidates verify all details from the official notification PDF and official website before applying. For any official communication, always use the contact details given in the official notification.
          </p>
        </section>

        {/* Stats */}
        <section style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '36px', marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: '0 0 32px 0' }}>
            Sarkari Success by Numbers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { number: '1 Cr+', label: 'Monthly Aspirants' },
              { number: '500+', label: 'Notifications Tracked Monthly' },
              { number: '28', label: 'States Covered' },
              { number: '24 hrs', label: 'Max Correction Time' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ color: '#fbbf24', fontSize: '32px', fontWeight: '900', lineHeight: 1 }}>{stat.number}</div>
                <div style={{ color: '#bfdbfe', fontSize: '13px', marginTop: '8px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', padding: '36px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: '0 0 12px 0' }}>
            Get in Touch
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 24px 0' }}>
            For corrections, partnerships, content queries, or feedback — we are always listening.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
              ✉️ Email Us
            </a>
            <a href="https://t.me/sarkarisuccess" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#0088cc', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
              📱 Telegram Channel
            </a>
            <a href="/contact" style={{ backgroundColor: '#f1f5f9', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #cbd5e1' }}>
              📝 Contact Form
            </a>
          </div>
        </section>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '20px 24px', fontSize: '13px', marginTop: '40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <span>© 2026 Sarkari Success. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="/privacy" style={{ color: '#bfdbfe', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: '#bfdbfe', textDecoration: 'none' }}>Terms</a>
            <a href="/contact" style={{ color: '#bfdbfe', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
