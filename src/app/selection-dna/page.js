"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SelectionDNA() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchDNA();
    }
  }, [status]);

  const fetchDNA = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/selection-dna");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧬</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>AI is creating your Selection DNA...</p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Analyzing your unique preparation pattern</p>
        </div>
      </main>
    );
  }

  if (!data?.hasData) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🧬</div>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>Your Selection DNA is Not Ready Yet</h2>
          <p style={{ color: '#666', margin: '0 0 8px 0' }}>Take at least 1 mock test to generate your unique AI Selection DNA profile.</p>
          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 24px 0' }}>The more tests you take, the more accurate your DNA becomes.</p>
          <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Take Mock Test →
          </a>
        </div>
      </main>
    );
  }

  const { studentData, aiDNA } = data;
  const dnaLines = aiDNA.split('\n').filter(line => line.trim());

  const daysActive = Math.ceil((new Date() - new Date(studentData.joinDate)) / (1000 * 60 * 60 * 24));

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            🧬 AI Selection DNA™
          </h1>
          <p style={{ color: '#c4b5fd', fontSize: '12px', margin: '2px 0 0 0' }}>
            Your unique preparation fingerprint — {studentData.targetExam}
          </p>
        </div>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px' }}>

        {/* DNA Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Mock Tests', value: studentData.totalMocks, icon: '📝', color: '#818cf8' },
            { label: 'Avg Score', value: studentData.avgScore + '%', icon: '📊', color: '#34d399' },
            { label: 'Best Score', value: studentData.maxScore + '%', icon: '🏆', color: '#fbbf24' },
            { label: 'Days Active', value: daysActive, icon: '📅', color: '#f472b6' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trend + Missions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#c4b5fd', margin: '0 0 12px 0', fontSize: '14px' }}>📈 Performance Trend</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>
                {studentData.trend === 'improving' ? '📈' : studentData.trend === 'declining' ? '📉' : '➡️'}
              </span>
              <div>
                <p style={{ color: studentData.trend === 'improving' ? '#34d399' : studentData.trend === 'declining' ? '#f87171' : '#fbbf24', fontWeight: '800', fontSize: '18px', margin: 0, textTransform: 'capitalize' }}>
                  {studentData.trend}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>
                  Range: {studentData.minScore}% — {studentData.maxScore}%
                </p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#c4b5fd', margin: '0 0 12px 0', fontSize: '14px' }}>🎯 Daily Mission Consistency</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>📅</span>
              <div>
                <p style={{ color: '#fbbf24', fontWeight: '800', fontSize: '18px', margin: 0 }}>
                  {studentData.missionsCompleted}/{studentData.missionsTotal}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>
                  Missions completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject DNA */}
        {studentData.strongSubjects.length > 0 || studentData.weakSubjects.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: 'rgba(52,211,153,0.1)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(52,211,153,0.3)' }}>
              <h3 style={{ color: '#34d399', margin: '0 0 12px 0', fontSize: '14px' }}>💪 Strength DNA</h3>
              {studentData.strongSubjects.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>Keep practicing to unlock your strengths</p>
              ) : (
                studentData.strongSubjects.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white', fontSize: '13px' }}>{s.subject}</span>
                    <span style={{ color: '#34d399', fontWeight: '700', fontSize: '13px' }}>{s.accuracy}%</span>
                  </div>
                ))
              )}
            </div>
            <div style={{ backgroundColor: 'rgba(248,113,113,0.1)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(248,113,113,0.3)' }}>
              <h3 style={{ color: '#f87171', margin: '0 0 12px 0', fontSize: '14px' }}>⚠️ Weakness DNA</h3>
              {studentData.weakSubjects.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>No major weaknesses detected yet</p>
              ) : (
                studentData.weakSubjects.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white', fontSize: '13px' }}>{s.subject}</span>
                    <span style={{ color: '#f87171', fontWeight: '700', fontSize: '13px' }}>{s.accuracy}%</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {/* AI DNA Analysis */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(30,58,138,0.2))', borderRadius: '16px', padding: '28px', marginBottom: '24px', border: '1px solid rgba(124,58,237,0.3)' }}>
          <h2 style={{ color: '#c4b5fd', fontSize: '20px', margin: '0 0 20px 0' }}>🧬 Your Complete Selection DNA</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {dnaLines.map((line, i) => {
              const isHeading = line === line.toUpperCase() && line.length > 3 && !line.includes('.');
              const isMotto = line.includes('MOTTO') || line.includes('मोटो') || line.includes('வாக்கியம்');
              return (
                <p key={i} style={{
                  color: isHeading ? '#fbbf24' : isMotto ? '#34d399' : 'rgba(255,255,255,0.85)',
                  fontWeight: isHeading ? '800' : 'normal',
                  fontSize: isHeading ? '13px' : '14px',
                  margin: isHeading ? '16px 0 6px 0' : '2px 0',
                  lineHeight: '1.7',
                  fontStyle: isMotto ? 'italic' : 'normal',
                }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button onClick={fetchDNA} style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
            🔄 Refresh DNA
          </button>
          <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            📝 Take Mock Test
          </a>
          <a href="/coach" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
            🎯 AI Coach
          </a>
          <a href="/rank-predictor" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
            📈 Rank Predictor
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}