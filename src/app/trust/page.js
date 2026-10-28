import Link from 'next/link';

export const metadata = {
  title: 'Trust Center — How Sarkari Success Verifies Government Job Data',
  description: 'Learn how Sarkari Success sources, verifies, and updates government job information. Our editorial standards, data sources, and accuracy commitments.',
  alternates: { canonical: 'https://sarkarisuccess.com/trust' },
};

const SECTIONS = [
  {
    icon: '📡',
    title: 'Where Our Data Comes From',
    content: `Every job listing on Sarkari Success is sourced from official government websites — the recruiting organisation's own portal, official press releases, and the Employment News. We do not copy from third-party job boards or aggregators.

Our sources in order of priority:
1. Official recruitment website of the organisation (SSC.nic.in, RRBs, IBPS, UPSC, state PSC portals)
2. Official government press releases and gazette notifications
3. Employment News / Rozgar Samachar (official weekly publication)

We never publish salary, vacancy count, last date, or eligibility criteria without a traceable link to one of these primary sources.`,
  },
  {
    icon: '🔄',
    title: 'How Often We Update',
    content: `Job status is recalculated every day at 2:00 AM IST automatically. Our freshness target is: every active job listing should be reviewed within 24 hours of any official update.

Status ladder:
🟢 New — application window just opened
🔵 Open — applications ongoing
🟡 Closing Soon — last date within 7 days
🔴 Closed — application window ended
🏆 Result Out — result declared

When a job closes, it is hidden from listings and marked CLOSED — we do not delete records, so your saved jobs history remains intact.`,
  },
  {
    icon: '✅',
    title: 'What We Verify vs. What We Don\'t',
    content: `VERIFIED (shown with confidence on job pages):
• Vacancy count — from official notification
• Last date to apply — from official notification
• Organisation name and category
• Apply link and notification PDF link
• Lifecycle status (open / closing / closed)

NOT VERIFIED (we tell you to check official sources):
• Application fee — changes every cycle; check official notification
• Detailed syllabus — available in official notification PDF
• Cut-off marks — announced after each exam; historical data only
• Result dates — announced after exam

SarkariGPT (our AI assistant) is instructed to refuse to state specific fees, cut-offs, or result dates it cannot verify. If it ever gives you a number for these, please report it using the link below.`,
  },
  {
    icon: '🤖',
    title: 'About SarkariGPT',
    content: `SarkariGPT is powered by Claude (Anthropic). It has access to our live job database and answers questions about eligibility, syllabus, exam pattern, and preparation strategy.

What it will do:
• Tell you which jobs are currently open (from our verified DB)
• Explain exam syllabus and pattern (from web search + training data)
• Help you understand eligibility criteria for a specific job
• Cite the exact job page URL for every job it mentions

What it will NOT do:
• State a specific application fee without verification
• State a specific cut-off score as authoritative
• Invent vacancy numbers it cannot find in our database
• Claim to be affiliated with any government department

SarkariGPT is an information tool — not a government portal. Always confirm critical details (fee, last date, admit card) from the official website before applying.`,
  },
  {
    icon: '🛡️',
    title: 'Data We Never Store',
    content: `We will never ask for or store:
• Aadhaar number, PAN card, or any government ID
• Application passwords for government portals
• Bank account or UPI details
• Caste or community certificates

We store: your email (for alerts), your saved jobs list, your eligibility profile (age, education, category) to match you with jobs. You can delete your account and all data at any time from your profile page.

We do not sell your data. We do not share your email with any third party other than our email delivery provider (Resend).`,
  },
  {
    icon: '⚠️',
    title: 'How to Report an Error',
    content: `If you find a wrong date, incorrect vacancy count, broken apply link, or any other error — please report it so we can fix it within 24 hours.

Report an error: contact.sarkarisuccess@gmail.com
Subject line: "Data Error — [Job Name]"

Please include:
• The job title and organisation
• What the error is
• The correct information with a link to the official source

We take data accuracy seriously. Every report is reviewed manually.`,
  },
];

export default function TrustPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </Link>
          <Link href="/" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>← Back to Jobs</Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', color: 'white', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛡️</div>
        <h1 style={{ margin: '0 0 12px', fontSize: '32px', fontWeight: '800' }}>Trust Center</h1>
        <p style={{ margin: '0 auto', maxWidth: '560px', fontSize: '16px', opacity: 0.9, lineHeight: '1.6' }}>
          How we source, verify, and update government job information — and what we promise never to do.
        </p>
      </div>

      {/* Commitment badges */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '✅', text: 'Official sources only' },
            { icon: '🔄', text: 'Updated daily at 2 AM IST' },
            { icon: '🚫', text: 'No invented fee/cut-off numbers' },
            { icon: '🔒', text: 'No Aadhaar or ID stored' },
            { icon: '📧', text: 'Unsubscribe any time' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>
              <span>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {SECTIONS.map((section, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px' }}>{section.icon}</span>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1e3a8a' }}>{section.title}</h2>
              </div>
              <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Last updated */}
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#9ca3af', fontSize: '12px' }}>
          <p style={{ margin: 0 }}>This page was last updated: October 2026</p>
          <p style={{ margin: '4px 0 0' }}>
            Questions? Email us at{' '}
            <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ color: '#1e3a8a' }}>
              contact.sarkarisuccess@gmail.com
            </a>
          </p>
        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#93c5fd', textDecoration: 'none' }}>Home</Link>
          <Link href="/trust" style={{ color: 'white', textDecoration: 'none', fontWeight: '700' }}>Trust Center</Link>
          <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ color: '#93c5fd', textDecoration: 'none' }}>Contact</a>
          <Link href="/sarkarigpt" style={{ color: '#93c5fd', textDecoration: 'none' }}>SarkariGPT</Link>
        </div>
        <p style={{ margin: '12px 0 0', opacity: 0.6 }}>© 2026 Sarkari Success. Not affiliated with any government department.</p>
      </footer>
    </main>
  );
}
