import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px' }}>
        
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏛️</div>
        
        <h1 style={{ fontSize: '80px', fontWeight: '900', color: '#1e3a8a', margin: '0 0 8px 0', lineHeight: 1 }}>404</h1>
        
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e3a8a', margin: '0 0 12px 0' }}>
          Page Not Found
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0', lineHeight: '1.6' }}>
          This page doesn't exist or has been removed. Please check the URL or go back to homepage.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            🏠 Home Page
          </Link>
          <Link href="/questions" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '2px solid #1e3a8a' }}>
            📝 Mock Test
          </Link>
          <Link href="/sarkarigpt" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            🤖 SarkariGPT
          </Link>
        </div>

        <div style={{ marginTop: '32px', backgroundColor: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 8px 0' }}>Latest Jobs देखें:</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['SSC CGL', 'RRB NTPC', 'UPSC', 'IBPS PO'].map(exam => (
              <Link key={exam} href={`/sarkarigpt?q=${exam} 2026 latest notification`}
                style={{ backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '4px 12px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                {exam}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}