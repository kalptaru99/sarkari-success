"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const { slug } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/results?slug=" + slug)
      .then(res => res.json())
      .then(data => {
        setResult(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a', fontSize: '18px' }}>Loading...</p>
      </main>
    );
  }

  if (!result) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a' }}>Result not found</h2>
          <a href="/" style={{ color: '#dc2626', textDecoration: 'none' }}>Back to Home</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Back to Home</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>

        <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a>
          {' > '}
          <a href="/#results" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Results</a>
          {' > '}
          {result.exam}
        </p>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '24px', color: '#1e3a8a', margin: '0 0 6px 0' }}>{result.exam}</h2>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{result.org}</p>
            </div>
            <span style={{
              backgroundColor: result.status === 'Declared' ? '#dcfce7' : result.status === 'Expected Soon' ? '#fef9c3' : '#dbeafe',
              color: result.status === 'Declared' ? '#16a34a' : result.status === 'Expected Soon' ? '#ca8a04' : '#1e3a8a',
              padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold'
            }}>
              {result.status}
            </span>
          </div>

          {result.result_date && (
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
              <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px 0' }}>Result Date</p>
              <p style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{result.result_date}</p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {result.result_link && (
              <a href={result.result_link} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                Check Result
              </a>
            )}
            {result.scorecard_link && (
              <a href={result.scorecard_link} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                Download Scorecard
              </a>
            )}
            {result.cutoff_link && (
              <a href={result.cutoff_link} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: '#16a34a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                View Cut Off Marks
              </a>
            )}
          </div>
        </div>

        {result.description && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>About This Result</h3>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{result.description}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>Prepare for Next Exam</h3>
          <p style={{ color: '#93c5fd', margin: '0 0 16px 0', fontSize: '14px' }}>Practice with free mock tests and question bank</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              Start Mock Test
            </a>
            <a href="/sarkarigpt" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              Ask SarkariGPT
            </a>
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}