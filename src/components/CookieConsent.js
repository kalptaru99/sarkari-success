"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '20px', right: '20px',
      maxWidth: '500px', margin: '0 auto',
      backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', zIndex: 9999,
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0 }}>🍪</span>
        <div>
          <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>We use cookies</p>
          <p style={{ color: '#bfdbfe', fontSize: '12px', margin: 0, lineHeight: '1.5' }}>
            We use cookies to improve your experience, remember your preferences and analyze site traffic. 
            By using Sarkari Success, you agree to our{' '}
            <a href="/privacy" style={{ color: '#93c5fd', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={accept}
          style={{ flex: 1, backgroundColor: 'white', color: '#1e3a8a', padding: '10px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          ✅ Accept All
        </button>
        <button onClick={reject}
          style={{ flex: 1, backgroundColor: 'transparent', color: '#bfdbfe', padding: '10px', borderRadius: '8px', border: '1px solid #3b82f6', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          Reject Non-Essential
        </button>
      </div>
    </div>
  );
}