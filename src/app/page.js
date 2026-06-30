export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Top bar */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', textAlign: 'center', fontSize: '14px' }}>
        📢 India's First AI-Powered Sarkari Career Companion
      </div>

      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center', borderBottom: '3px solid #1e3a8a' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
          Sarkari <span style={{ color: '#dc2626' }}>Success</span>
        </h1>
        <p style={{ color: '#555', marginTop: '8px' }}>
          AI-Powered Sarkari Naukri, Results &amp; Exam Updates
        </p>
      </header>

      {/* Alert ticker */}
      <div style={{ backgroundColor: '#fee2e2', borderTop: '1px solid #dc2626', borderBottom: '1px solid #dc2626', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          NEW
        </span>
        <span style={{ color: '#991b1b', fontWeight: '500' }}>
          🚀 Sarkari Success is launching soon — AI-powered job alerts, results &amp; exam prep
        </span>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', color: '#1e3a8a', marginBottom: '16px' }}>
          Coming Soon 🇮🇳
        </h2>
        <p style={{ fontSize: '16px', color: '#444', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          SSC, Railway, UPSC, Banking &amp; State exam updates — powered by AI.
          Faster results. Smarter prep. Zero confusion.
        </p>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '60px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}