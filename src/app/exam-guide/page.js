"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const exams = [
  "SSC CGL", "SSC CHSL", "RRB NTPC", "IBPS PO", "BPSC", "UPSC Civil Services"
];

export default function ExamGuide() {
  const { data: session } = useSession();
  const [selectedExam, setSelectedExam] = useState("SSC CGL");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchPreview();
  }, [selectedExam]);

  const fetchPreview = async () => {
    setLoading(true);
    setData(null);
    setAiText("");
    try {
      const res = await fetch('/api/exam-guide?exam=' + encodeURIComponent(selectedExam) + '&preview=true');
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchFullReport = async () => {
    if (!session) {
      window.location.href = '/register?redirect=/exam-guide';
      return;
    }
    setLoading(true);
    setAiText("");
    try {
      const res = await fetch('/api/exam-guide?exam=' + encodeURIComponent(selectedExam));
      const result = await res.json();
      if (result.needsLogin) {
        window.location.href = '/login?redirect=/exam-guide';
        return;
      }
      setData(result);
      const fullText = result.aiAnalysis || '';
      setIsTyping(true);
      let displayed = "";
      for (let i = 0; i < fullText.length; i++) {
        displayed += fullText[i];
        setAiText(displayed);
        await new Promise(r => setTimeout(r, 5));
      }
      setIsTyping(false);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </h1>
        </a>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/toppers-plan" style={{ color: '#fbbf24', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>👑 Topper's Plan</a>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none', padding: '6px 14px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>Dashboard</a>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(251,191,36,0.2)', color: '#fbbf24', fontSize: '12px', fontWeight: 'bold', padding: '4px 14px', borderRadius: '20px', marginBottom: '12px', border: '1px solid rgba(251,191,36,0.3)' }}>
            👑 Topper's Plan Feature
          </div>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>
            📊 Exam Intelligence Report
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>
            10-year question analysis + AI personalized strategy for your target exam
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
          {exams.map((exam) => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '10px 20px', borderRadius: '25px', border: selectedExam === exam ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.2)', backgroundColor: selectedExam === exam ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)', color: selectedExam === exam ? '#fbbf24' : '#94a3b8', fontSize: '13px', fontWeight: selectedExam === exam ? '700' : '500', cursor: 'pointer' }}>
              {exam}
            </button>
          ))}
        </div>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <p style={{ color: '#c4b5fd', fontSize: '18px', fontWeight: 'bold' }}>Generating your Exam Intelligence Report...</p>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '8px' }}>Using Claude Haiku AI for fast analysis</p>
          </div>
        )}

        {!loading && data && (
          <div>
            {/* Exam Overview Card */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '20px', fontWeight: '800', margin: '0 0 16px 0' }}>
                📋 {data.examData.fullName}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px 0' }}>Exam Pattern</p>
                  <p style={{ color: 'white', fontSize: '12px', fontWeight: '600', margin: 0 }}>{data.examData.pattern}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px 0' }}>Negative Marking</p>
                  <p style={{ color: '#f87171', fontSize: '12px', fontWeight: '600', margin: 0 }}>{data.examData.negativeMarking}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', fontSize: '11px', margin: '0 0 4px 0' }}>Latest Cutoff (2024)</p>
                  <p style={{ color: '#fbbf24', fontSize: '18px', fontWeight: '800', margin: 0 }}>{data.examData.cutoffs['2024']}</p>
                </div>
              </div>

              {/* Cutoff Chart */}
              <h3 style={{ color: '#c4b5fd', fontSize: '14px', margin: '0 0 12px 0' }}>📈 5-Year Cutoff Trend</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', height: '80px', marginBottom: '8px' }}>
                {Object.entries(data.examData.cutoffs).map(([year, score]) => {
                  const maxScore = Math.max(...Object.values(data.examData.cutoffs));
                  const height = Math.round((score / maxScore) * 70);
                  return (
                    <div key={year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <span style={{ color: '#fbbf24', fontSize: '10px', fontWeight: '700' }}>{score}</span>
                      <div style={{ width: '100%', backgroundColor: '#7c3aed', borderRadius: '4px 4px 0 0', height: height + 'px' }} />
                      <span style={{ color: '#64748b', fontSize: '10px' }}>{year}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Topics */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
              <h2 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>🎯 High Priority Topics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {Object.entries(data.examData.topTopics).map(([subject, topics]) => (
                  <div key={subject} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '14px' }}>
                    <p style={{ color: '#fbbf24', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>{subject}</p>
                    {topics.slice(0, 3).map((topic, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ color: '#4ade80', fontSize: '10px' }}>●</span>
                        <span style={{ color: '#94a3b8', fontSize: '12px' }}>{topic}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Personalized Strategy */}
            {!aiText && !data.preview && (
              <div style={{ textAlign: 'center', backgroundColor: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(251,191,36,0.3)', marginBottom: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🤖</div>
                <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '20px' }}>Your AI Personalized Strategy is Ready</h3>
                <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '13px' }}>Click below to generate your personalized 6-month roadmap based on your mock performance</p>
                <button onClick={fetchFullReport} style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '14px 32px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '900', cursor: 'pointer' }}>
                  🎯 Generate My Personalized Strategy
                </button>
              </div>
            )}

            {data.preview && !aiText && (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(251,191,36,0.3)', overflow: 'hidden', marginBottom: '20px' }}>
                <div style={{ padding: '24px', filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' }}>
                  <h3 style={{ color: 'white', margin: '0 0 12px 0' }}>🤖 AI Personalized Strategy</h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>YOUR CURRENT POSITION — Based on your mock scores, you are currently at 45% accuracy which is below the cutoff of 72%. Your biggest weakness is Quantitative Aptitude at 23% accuracy...</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>TOP 5 TOPICS TO FOCUS — 1. Geometry (15 questions in Tier 2) 2. Data Interpretation 3. Reading Comprehension...</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>6-MONTH ROADMAP — Month 1: Foundation building in Maths and Grammar. Month 2: Topic-wise practice...</p>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '32px', textAlign: 'center', marginTop: '-120px', position: 'relative' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔒</div>
                  <h3 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '18px' }}>Unlock AI Personalized Strategy</h3>
                  <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px 0' }}>Get your personalized 6-month roadmap, daily schedule, book recommendations and selection prediction</p>
                  <a href="/toppers-plan" style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '900', display: 'inline-block' }}>
                    👑 Unlock with Topper's Plan — ₹99/month
                  </a>
                </div>
              </div>
            )}

            {aiText && (
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(124,58,237,0.3)', marginBottom: '20px' }}>
                <h2 style={{ color: '#c4b5fd', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>
                  🤖 Your AI Personalized Strategy {isTyping && <span style={{ color: '#fbbf24', fontSize: '14px' }}>● typing...</span>}
                </h2>
                <div style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                  {aiText}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      <footer style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}