"use client";
import { useState, useEffect } from "react";

export default function AdmitCardPage() {
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/api/admit-cards?limit=50')
      .then(res => res.json())
      .then(data => {
        setAdmitCards(data.admit_cards || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = admitCards.filter(card =>
    card.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — Admit Cards
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '12px', margin: '2px 0 0 0' }}>Download Hall Tickets for SSC, Railway, UPSC, Banking</p>
        </div>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search admit cards — SSC, Railway, UPSC, Banking..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', maxWidth: '600px', padding: '12px 20px', borderRadius: '8px', border: 'none', fontSize: '14px', outline: 'none', color: '#1a1a1a' }}
        />
      </div>

      <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🪪</div>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a' }}>Loading Admit Cards...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🪪</div>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>No Admit Cards Available Yet</h2>
            <p style={{ color: '#666', margin: '0 0 24px 0' }}>Admit cards will be added as they are released by official bodies.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>View Latest Jobs</a>
              <a href="/sarkarigpt" style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Ask SarkariGPT</a>
            </div>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {filtered.map((card, index) => (
              <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '28px' }}>🪪</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {card.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                  <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: 0, lineHeight: '1.3' }}>{card.exam}</p>
                </div>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{card.org}</p>
                {card.exam_date && <p style={{ color: '#374151', fontSize: '12px', margin: 0 }}>Exam Date: <strong>{card.exam_date}</strong></p>}
                {card.admit_card_date && <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: '600', margin: 0 }}>Available: {card.admit_card_date}</p>}
                {card.official_link && (
                  <a href={card.official_link} target="_blank" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center', marginTop: 'auto' }}>
                    Download Admit Card
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#eff6ff', borderRadius: '12px', padding: '20px', marginTop: '30px', border: '1px solid #bfdbfe' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px' }}>📋 How to Download Admit Card</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { step: '1', text: 'Find your exam admit card above' },
              { step: '2', text: 'Click Download Admit Card button' },
              { step: '3', text: 'Enter registration number and date of birth' },
              { step: '4', text: 'Download and print your hall ticket' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>{item.step}</span>
                <p style={{ color: '#374151', fontSize: '13px', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fee2e2', borderRadius: '12px', padding: '16px', marginTop: '16px', border: '1px solid #fca5a5' }}>
          <p style={{ color: '#dc2626', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '14px' }}>⚠️ Important Notice</p>
          <p style={{ color: '#7f1d1d', fontSize: '13px', margin: 0 }}>Sarkari Success is not an official government website. All admit card links redirect to official government portals. Always verify from official sources.</p>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}