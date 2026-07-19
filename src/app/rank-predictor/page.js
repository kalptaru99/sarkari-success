"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RankPredictor() {
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
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/rank-predictor");
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>AI is analyzing your rank potential...</p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Comparing with previous cutoff trends</p>
        </div>
      </main>
    );
  }

  if (!data?.success) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>Take a Mock Test First</h2>
          <p style={{ color: '#666', margin: '0 0 24px 0' }}>AI needs your performance data to predict your rank.</p>
          <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Take Mock Test →
          </a>
        </div>
      </main>
    );
  }

  const scorePercent = Math.round((data.avgScore / data.totalMarks) * 100);
  const cutoffPercent = Math.round((data.latestCutoff / data.totalMarks) * 100);
  const analysisLines = data.aiAnalysis.split('\n').filter(line => line.trim());

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Rank Predictor
        </h1>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '2px solid #1e3a8a' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>Your Average Score</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#1e3a8a' }}>{data.avgScore}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>out of {data.totalMarks}</div>
            <div style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', marginTop: '8px', display: 'inline-block' }}>
              {scorePercent}%
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '2px solid #dc2626' }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>Latest Cutoff (2024)</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc2626' }}>{data.latestCutoff}</div>
            <div style={{ fontSize: '12px', color: '#888' }}>out of {data.totalMarks}</div>
            <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', marginTop: '8px', display: 'inline-block' }}>
              {cutoffPercent}%
            </div>
          </div>
          <div style={{ backgroundColor: data.scoreGap <= 0 ? '#f0fdf4' : '#fff7ed', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '2px solid ' + (data.scoreGap <= 0 ? '#16a34a' : '#ca8a04') }}>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '6px' }}>Score Gap</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: data.scoreGap <= 0 ? '#16a34a' : '#ca8a04' }}>
              {data.scoreGap <= 0 ? '✅' : '+' + data.scoreGap}
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>{data.scoreGap <= 0 ? 'Above cutoff!' : 'marks needed'}</div>
            <div style={{ backgroundColor: data.scoreGap <= 0 ? '#dcfce7' : '#fef9c3', color: data.scoreGap <= 0 ? '#16a34a' : '#ca8a04', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '10px', marginTop: '8px', display: 'inline-block' }}>
              {data.targetExam}
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 16px 0', fontSize: '18px' }}>📊 {data.targetExam} Cutoff History ({data.category})</h2>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '120px' }}>
            {Object.entries(data.cutoffHistory).map(([year, score]) => {
              const height = Math.round((score / data.totalMarks) * 100);
              return (
                <div key={year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#1e3a8a' }}>{score}</span>
                  <div style={{ width: '100%', backgroundColor: '#1e3a8a', borderRadius: '4px 4px 0 0', height: height + 'px', minHeight: '20px', opacity: year === '2024' ? 1 : 0.6 }} />
                  <span style={{ fontSize: '11px', color: '#666' }}>{year}</span>
                </div>
              );
            })}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626' }}>{data.avgScore}</span>
              <div style={{ width: '100%', backgroundColor: '#dc2626', borderRadius: '4px 4px 0 0', height: Math.round((data.avgScore / data.totalMarks) * 100) + 'px', minHeight: '20px' }} />
              <span style={{ fontSize: '11px', color: '#dc2626', fontWeight: '700' }}>You</span>
            </div>
          </div>
        </div>

        {data.subjectPerformance.length > 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 16px 0', fontSize: '18px' }}>📚 Subject-wise Accuracy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.subjectPerformance.map((subject, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{subject.subject}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: parseFloat(subject.accuracy) >= 70 ? '#16a34a' : parseFloat(subject.accuracy) >= 40 ? '#ca8a04' : '#dc2626' }}>
                      {subject.accuracy}%
                    </span>
                  </div>
                  <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: parseFloat(subject.accuracy) >= 70 ? '#16a34a' : parseFloat(subject.accuracy) >= 40 ? '#ca8a04' : '#dc2626', height: '100%', width: subject.accuracy + '%', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: 'white', fontSize: '20px', margin: '0 0 20px 0' }}>📈 AI Rank Predictor Analysis</h2>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px' }}>
            {analysisLines.map((line, i) => {
              const isHeading = line === line.toUpperCase() && line.length > 3 && !line.includes('.');
              return (
                <p key={i} style={{ color: isHeading ? '#fbbf24' : 'white', fontWeight: isHeading ? 'bold' : 'normal', fontSize: isHeading ? '14px' : '13px', margin: isHeading ? '16px 0 8px 0' : '4px 0', lineHeight: '1.6' }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button onClick={fetchData} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>
            🔄 Refresh Analysis
          </button>
          <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            📝 Take Mock Test
          </a>
          <a href="/coach" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid #1e3a8a' }}>
            🎯 AI Coach
          </a>
          <a href="/revision" style={{ backgroundColor: 'white', color: '#7c3aed', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid #7c3aed' }}>
            🧠 Revision Plan
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}