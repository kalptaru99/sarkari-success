import pool from '@/lib/db.js';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await pool.query('SELECT * FROM admit_cards WHERE slug = $1', [slug]);
  if (result.rows.length === 0) return { title: 'Admit Card Not Found' };
  const card = result.rows[0];
  return {
    title: card.exam + ' — Download Admit Card | Sarkari Success',
    description: card.description || 'Download ' + card.exam + ' admit card from official website. Hall ticket available at sarkarisuccess.com',
  };
}

export default async function AdmitCardDetail({ params }) {
  const { slug } = await params;
  const result = await pool.query('SELECT * FROM admit_cards WHERE slug = $1', [slug]);

  if (result.rows.length === 0) {
    notFound();
  }

  const card = result.rows[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": card.exam + " Admit Card",
    "description": card.description || card.exam + " admit card download",
    "publisher": {
      "@type": "Organization",
      "name": "Sarkari Success",
      "url": "https://sarkarisuccess.com"
    },
    "datePublished": card.created_at,
    "dateModified": card.created_at,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to download " + card.exam + " admit card?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit the official website " + (card.official_link || "and enter your registration number and date of birth to download the admit card.")
        }
      },
      {
        "@type": "Question",
        "name": "When is " + card.exam + " exam date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": card.exam_date ? "The exam is scheduled on " + card.exam_date : "Check the official website for exam date details."
        }
      },
      {
        "@type": "Question",
        "name": "When was " + card.exam + " admit card released?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": card.admit_card_date ? "The admit card was released on " + card.admit_card_date : "Check the official website for admit card release date."
        }
      }
    ]
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </h1>
        </a>
        <a href="/admit-card" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← All Admit Cards</a>
      </div>

      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '40px' }}>🪪</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                {card.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                <h1 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: '800', margin: 0 }}>{card.exam}</h1>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>{card.org}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            {card.exam_date && (
              <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '14px', border: '1px solid #bfdbfe' }}>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0', fontWeight: '600' }}>EXAM DATE</p>
                <p style={{ color: '#1e3a8a', fontSize: '15px', fontWeight: '700', margin: 0 }}>{card.exam_date}</p>
              </div>
            )}
            {card.admit_card_date && (
              <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '14px', border: '1px solid #bbf7d0' }}>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 4px 0', fontWeight: '600' }}>ADMIT CARD AVAILABLE</p>
                <p style={{ color: '#16a34a', fontSize: '15px', fontWeight: '700', margin: 0 }}>{card.admit_card_date}</p>
              </div>
            )}
          </div>

          {card.description && (
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{card.description}</p>
            </div>
          )}

          {card.official_link && (
            <a href={card.official_link} target="_blank" style={{ display: 'block', backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>
              🪪 Download Admit Card — Official Website
            </a>
          )}

          <div style={{ backgroundColor: '#fee2e2', borderRadius: '8px', padding: '12px', border: '1px solid #fca5a5' }}>
            <p style={{ color: '#dc2626', fontSize: '12px', margin: 0, fontWeight: '600' }}>
              ⚠️ Sarkari Success is not an official government website. Always verify from official sources.
            </p>
          </div>
        </div>

        {/* How to Download */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 16px 0', fontWeight: '800' }}>📋 How to Download {card.exam} Admit Card</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Visit the official website of ' + card.org,
              'Click on the Admit Card / Hall Ticket link',
              'Enter your Registration Number and Date of Birth',
              'Click Submit and download your admit card',
              'Take a printout and check all details carefully',
              'Carry the printed admit card to the exam center',
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                <p style={{ color: '#374151', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 16px 0', fontWeight: '800' }}>❓ Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'What documents are needed at exam center?', a: 'Carry your printed admit card along with one valid photo ID proof (Aadhar Card, PAN Card, Voter ID, or Passport).' },
              { q: 'What if I forget my registration number?', a: 'Visit the official website and use the "Forgot Registration Number" option. You can recover it using your email ID or mobile number.' },
              { q: 'Can I use a mobile phone admit card at exam center?', a: 'No. Always carry a printed copy of your admit card. Mobile phones are not allowed inside exam centers.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 6px 0' }}>Q: {item.q}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <a href="/admit-card" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>← All Admit Cards</a>
          <a href="/" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', border: '2px solid #1e3a8a' }}>Latest Jobs</a>
          <a href="/sarkarigpt" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>Ask SarkariGPT</a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}
