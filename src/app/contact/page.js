"use client";
export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>Contact Us</h2>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 24px 0' }}>We're here to help. Reach out to us for any queries, feedback or support.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '32px' }}>📧</span>
              <div>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>Email Support</p>
                <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ color: '#3b82f6', fontSize: '15px', textDecoration: 'none', fontWeight: '600' }}>
                  contact.sarkarisuccess@gmail.com
                </a>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '4px 0 0 0' }}>We reply within 24 hours</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '32px' }}>🤖</span>
              <div>
                <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>SarkariGPT — AI Support</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 8px 0' }}>Get instant answers to your exam queries</p>
                <a href="/sarkarigpt" style={{ backgroundColor: '#16a34a', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>
                  Ask SarkariGPT →
                </a>
              </div>
            </div>

            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '32px' }}>📍</span>
              <div>
                <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>Location</p>
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>India</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>Frequently Asked Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'How do I access AI subject pages?', a: 'Login to your account and go to Dashboard → English AI, Maths AI, Reasoning AI or GK AI.' },
              { q: 'Is Sarkari Success free to use?', a: 'Yes! Basic features including job notifications, mock tests and SarkariGPT are free. Topper\'s Plan unlocks all AI features.' },
              { q: 'How do I report a wrong answer in questions?', a: 'Email us at contact.sarkarisuccess@gmail.com with the question details.' },
              { q: 'How often are job notifications updated?', a: 'Job notifications are updated automatically every day at 11:30 AM IST.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 6px 0' }}>Q: {item.q}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}