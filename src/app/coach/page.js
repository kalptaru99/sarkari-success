"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CoachPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchPerformance();
    }
  }, [status]);

  const fetchPerformance = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/performance");
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>AI Selection Coach is analyzing your performance...</p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>This may take a few seconds</p>
        </div>
      </main>
    );
  }

  if (!data?.hasData) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Selection Coach
          </h1>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>

        <div style={{ maxWidth: '700px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
          <h2 style={{ color: '#1e3a8a', fontSize: '26px', margin: '0 0 12px 0' }}>Welcome to AI Selection Coach</h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px', lineHeight: '1.6' }}>
            Your personal AI mentor that analyzes your preparation, finds your weaknesses, and tells you exactly what to do next to increase your selection chances.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px', textAlign: 'left' }}>
            {[
              { icon: '📊', title: 'AI Weakness Analyzer', desc: 'Finds the 20% weaknesses causing 80% of lost marks' },
              { icon: '❌', title: 'AI Mistake Detector', desc: 'Identifies patterns in your errors and gives corrective actions' },
              { icon: '📅', title: 'AI Daily Mission', desc: 'Every morning tells you exactly what to study today' },
              { icon: '📈', title: 'AI Rank Predictor', desc: 'Shows how improving specific subjects improves your rank' },
              { icon: '🧠', title: 'AI Revision Planner', desc: 'Plans what to revise based on forgetting patterns' },
              { icon: '🎯', title: 'Selection Probability', desc: 'Real-time readiness score based on your preparation' },
            ].map((feature, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{feature.icon}</div>
                <h3 style={{ color: '#1e3a8a', fontSize: '14px', margin: '0 0 4px 0' }}>{feature.title}</h3>
                <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#fee2e2', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
            <p style={{ color: '#dc2626', fontWeight: 'bold', margin: '0 0 8px 0' }}>To activate AI Selection Coach:</p>
            <p style={{ color: '#444', fontSize: '14px', margin: 0 }}>Take at least 1 mock test first. The AI needs your performance data to analyze and give personalized recommendations.</p>
          </div>

          <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'inline-block' }}>
            Take Your First Mock Test →
          </a>
        </div>
      </main>
    );
  }const { performanceData, aiAnalysis } = data;

  const analysisLines = aiAnalysis.split('\n').filter(line => line.trim());

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Selection Coach
        </h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: 'white', fontSize: '13px' }}>👤 {session?.user?.name}</span>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Mocks Taken', value: performanceData.totalMocks, icon: '📝' },
            { label: 'Avg Score', value: performanceData.profile ? Math.round(performanceData.profile.average_score) + '%' : 'N/A', icon: '📊' },
            { label: 'Subjects Tracked', value: performanceData.subjectPerformance.length, icon: '📚' },
            { label: 'Mistakes Found', value: performanceData.mistakeBank.reduce((sum, m) => sum + parseInt(m.mistake_count), 0), icon: '❌' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e3a8a' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 16px 0' }}>Subject Performance</h2>
            {performanceData.subjectPerformance.length === 0 ? (
              <p style={{ color: '#888', fontSize: '14px' }}>No data yet — take a mock test</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {performanceData.subjectPerformance.map((subject, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#444' }}>{subject.subject}</span>
                      <span style={{ fontSize: '13px', color: parseFloat(subject.accuracy) >= 70 ? '#16a34a' : parseFloat(subject.accuracy) >= 40 ? '#ca8a04' : '#dc2626', fontWeight: 'bold' }}>
                        {subject.accuracy}%
                      </span>
                    </div>
                    <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: parseFloat(subject.accuracy) >= 70 ? '#16a34a' : parseFloat(subject.accuracy) >= 40 ? '#ca8a04' : '#dc2626', height: '100%', width: subject.accuracy + '%', borderRadius: '4px', transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#16a34a' }}>✅ {subject.correct} correct</span>
                      <span style={{ fontSize: '11px', color: '#dc2626' }}>❌ {subject.wrong} wrong</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 16px 0' }}>Recent Mock History</h2>
            {performanceData.recentAttempts.length === 0 ? (
              <p style={{ color: '#888', fontSize: '14px' }}>No mock tests taken yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {performanceData.recentAttempts.slice(0, 5).map((attempt, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 'bold', color: '#1e3a8a', fontSize: '13px' }}>{attempt.exam}</p>
                      <p style={{ margin: 0, color: '#666', fontSize: '11px' }}>{new Date(attempt.created_at).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px', color: Math.round((attempt.correct/attempt.total_questions)*100) >= 70 ? '#16a34a' : Math.round((attempt.correct/attempt.total_questions)*100) >= 40 ? '#ca8a04' : '#dc2626' }}>
                        {attempt.correct}/{attempt.total_questions}
                      </p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>{Math.round((attempt.correct/attempt.total_questions)*100)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {performanceData.mistakeBank.length > 0 && (
          <div style={{ backgroundColor: '#fee2e2', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            <h2 style={{ color: '#dc2626', fontSize: '18px', margin: '0 0 16px 0' }}>Mistake Bank — Repeated Errors</h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {performanceData.mistakeBank.map((mistake, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px 16px', border: '1px solid #fca5a5' }}>
                  <span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '13px' }}>{mistake.subject}</span>
                  <span style={{ color: '#888', fontSize: '12px', marginLeft: '8px' }}>{mistake.mistake_count} mistakes</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h2 style={{ color: 'white', fontSize: '20px', margin: '0 0 20px 0' }}>🤖 AI Selection Coach Analysis</h2>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px' }}>
            {analysisLines.map((line, i) => {
              const isHeading = line === line.toUpperCase() && line.length > 3;
              return (
                <p key={i} style={{
                  color: isHeading ? '#fca5a5' : 'white',
                  fontWeight: isHeading ? 'bold' : 'normal',
                  fontSize: isHeading ? '15px' : '14px',
                  margin: isHeading ? '16px 0 8px 0' : '4px 0',
                  lineHeight: '1.6',
                }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
          <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Take Another Mock Test
          </a>
          <button
            onClick={fetchPerformance}
            style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', border: '2px solid #1e3a8a', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
          >
            Refresh Analysis
          </button>
          <a href="/sarkarigpt" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', border: '2px solid #1e3a8a', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Ask SarkariGPT
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}