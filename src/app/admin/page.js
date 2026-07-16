"use client";
import { useState } from "react";

const exams = ["SSC CGL", "SSC CHSL", "RRB NTPC", "RRB Group D", "UPSC Civil Services", "IBPS PO", "IBPS Clerk", "SBI PO"];

const topics = {
  "SSC CGL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "SSC CHSL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "RRB NTPC": ["Mathematics", "General Intelligence", "General Awareness", "English Language"],
  "RRB Group D": ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
  "UPSC Civil Services": ["History", "Geography", "Polity", "Economy", "Science & Technology", "Environment", "Current Affairs"],
  "IBPS PO": ["Reasoning", "English Language", "Quantitative Aptitude", "General Awareness", "Computer Knowledge"],
  "IBPS Clerk": ["Reasoning", "English Language", "Numerical Ability", "General Awareness", "Computer Knowledge"],
  "SBI PO": ["Reasoning", "English Language", "Data Analysis", "General Awareness", "Computer Knowledge"],
};

export default function AdminPage() {
  const [selectedExam, setSelectedExam] = useState("SSC CGL");
  const [selectedTopic, setSelectedTopic] = useState("General Intelligence");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const generateQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam: selectedExam,
          topic: selectedTopic,
          count,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(prev => [...prev, {
          exam: selectedExam,
          topic: selectedTopic,
          count: data.inserted,
          time: new Date().toLocaleTimeString(),
        }]);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const generateAll = async () => {
    setLoading(true);
    setError("");

    for (const exam of exams) {
      for (const topic of topics[exam]) {
        try {
          const response = await fetch("/api/generate-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exam, topic, count: 10 }),
          });
          const data = await response.json();
          if (data.success) {
            setResults(prev => [...prev, {
              exam,
              topic,
              count: data.inserted,
              time: new Date().toLocaleTimeString(),
            }]);
          }
        } catch (error) {
          console.error(`Error generating ${exam} - ${topic}`);
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — Admin Panel
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Site</a>
      </div>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>

        {/* Generate Questions */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 20px 0' }}>Generate Questions</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => {
                  setSelectedExam(e.target.value);
                  setSelectedTopic(topics[e.target.value][0]);
                }}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {exams.map((exam, i) => (
                  <option key={i} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {topics[selectedExam].map((topic, i) => (
                  <option key={i} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>Number of Questions</label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
            >
              {[5, 10, 20, 30, 50].map(n => (
                <option key={n} value={n}>{n} questions</option>
              ))}
            </select>
          </div>

          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={generateQuestions}
              disabled={loading}
              style={{ flex: 1, padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Generating...' : `Generate ${count} Questions`}
            </button>

            <button
              onClick={generateAll}
              disabled={loading}
              style={{ flex: 1, padding: '12px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Generating All...' : 'Generate All Exams'}
            </button>
          </div>

          <p style={{ color: '#888', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>
            "Generate All Exams" creates 10 questions for every topic across all 8 exams automatically
          </p>
        </div>

        {/* Results Log */}
        {results.length > 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 16px 0' }}>Generation Log</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {results.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#dcfce7', borderRadius: '6px', fontSize: '13px' }}>
                  <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✅ {r.exam} — {r.topic}</span>
                  <span style={{ color: '#16a34a' }}>{r.count} questions • {r.time}</span>
                </div>
              ))}
            </div>
            <p style={{ color: '#666', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
              Total generated: <strong>{results.reduce((sum, r) => sum + r.count, 0)} questions</strong>
            </p>
          </div>
        )}

      </div>
    </main>
  );
}