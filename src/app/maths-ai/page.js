"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const arithmeticTopics = [
  { id: "percentage", name: "Percentage", icon: "📊", count: "1,890", repeat: 95, color: "#0891b2" },
  { id: "profit", name: "Profit & Loss", icon: "💰", count: "1,560", repeat: 92, color: "#16a34a" },
  { id: "ratio", name: "Ratio & Proportion", icon: "⚖️", count: "1,230", repeat: 88, color: "#7c3aed" },
  { id: "timework", name: "Time & Work", icon: "⏱️", count: "1,450", repeat: 90, color: "#dc2626" },
  { id: "timedist", name: "Time, Speed & Distance", icon: "🚗", count: "1,670", repeat: 87, color: "#ca8a04" },
  { id: "si", name: "Simple & Compound Interest", icon: "🏦", count: "980", repeat: 85, color: "#db2777" },
  { id: "average", name: "Average", icon: "📈", count: "1,120", repeat: 83, color: "#ea580c" },
  { id: "partnership", name: "Partnership", icon: "🤝", count: "740", repeat: 75, color: "#0891b2" },
];

const advancedTopics = [
  { id: "number", name: "Number System", icon: "🔢", count: "1,340", repeat: 88, color: "#1e3a8a" },
  { id: "algebra", name: "Algebra", icon: "📐", count: "1,560", repeat: 85, color: "#7c3aed" },
  { id: "geometry", name: "Geometry", icon: "📐", count: "1,780", repeat: 92, color: "#dc2626" },
  { id: "trig", name: "Trigonometry", icon: "📏", count: "1,230", repeat: 88, color: "#16a34a" },
  { id: "mensuration", name: "Mensuration", icon: "📦", count: "1,450", repeat: 85, color: "#ca8a04" },
  { id: "di", name: "Data Interpretation", icon: "📊", count: "2,670", repeat: 95, color: "#0891b2" },
];

const mostImportant = [
  { topic: "Geometry (Triangles & Circles)", repeat: "95%", tip: "Tier 2 में 9-15 questions — Basic theorems + Coordinate Geometry ज़रूर पढ़ो" },
  { topic: "Data Interpretation", repeat: "95%", tip: "Banking में 15-20 marks — Table, Bar Graph, Pie Chart सब practice करो" },
  { topic: "Percentage", repeat: "92%", tip: "सारे topics की जड़ है — Percentage का formula: (Part/Whole) × 100" },
  { topic: "Profit & Loss", repeat: "90%", tip: "SP = CP × (100 + P%)/100 — यह formula रटो, 30 sec में solve होगा" },
  { topic: "Time & Work", repeat: "88%", tip: "LCM Method — Total Work = LCM of days. हर दिन का काम = Total/Days" },
  { topic: "Trigonometry", repeat: "88%", tip: "sin²θ + cos²θ = 1 और 1 + tan²θ = sec²θ — ये 2 formulas से 80% solve" },
  { topic: "Ratio & Proportion", repeat: "85%", tip: "अगर a:b = c:d तो ad = bc — Cross multiplication trick याद करो" },
  { topic: "Number System", repeat: "82%", tip: "Divisibility rules — 2,3,4,5,6,7,8,9,11 — रटो और time बचाओ" },
];

const sampleQuestions = {
  percentage: [
    {
      id: 1,
      question: "A's salary is 20% more than B's salary. By what percentage is B's salary less than A's salary?",
      options: ["20%", "16.67%", "25%", "15%"],
      correct: 1,
      explanation: "जब A, B से 20% ज़्यादा है, तो B, A से कितना कम होगा?\n\nFormula: अगर A, B से x% ज़्यादा है तो B, A से [x/(100+x)] × 100% कम होगा\n\n= [20/(100+20)] × 100 = [20/120] × 100 = 16.67%",
      trick: "💡 Shortcut: x% more → x/(100+x) × 100% less\n20% more → 20/120 × 100 = 16.67% less"
    },
  ],
  di: [
    {
      id: 2,
      question: "In a table showing sales of 5 companies, Company A sold 240 units and Company B sold 180 units. What is the ratio of A to B?",
      options: ["3:4", "4:3", "3:2", "2:3"],
      correct: 1,
      explanation: "240:180 = 240/180 = 4/3 = 4:3\n\nDI का सबसे important rule: पहले table को ध्यान से पढ़ो, फिर calculation करो।\nRatio = 240/180 = 4/3",
      trick: "💡 DI Tip: Simplify करो — 240:180 → दोनों को 60 से divide करो → 4:3"
    },
  ],
};

export default function MathsAI() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedExam, setSelectedExam] = useState("SSC CGL");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const getAIExplanation = async (question, topic) => {
    setLoadingAI(true);
    setAiExplanation("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are an expert Maths teacher for SSC/Banking exam aspirants. Explain this question in Hindi:

Question: ${question}
Topic: ${topic}

Give:
1. Formula/Rule (Hindi में)
2. Step-by-step solution (Hindi में)
3. Shortcut trick (Hindi में)
4. Similar questions में कैसे apply करें

Keep it simple and practical in Hindi/Hinglish.`,
          history: [],
          preferredLanguage: "Hindi",
        }),
      });
      const data = await response.json();
      const fullText = data.reply || "";
      let displayed = "";
      for (let i = 0; i < fullText.length; i++) {
        displayed += fullText[i];
        setAiExplanation(displayed);
        await new Promise(r => setTimeout(r, 8));
      }
    } catch (e) {
      setAiExplanation("कुछ गलत हो गया। दोबारा try करें।");
    }
    setLoadingAI(false);
  };

  const allTopics = [...arithmeticTopics, ...advancedTopics];
  const questions = selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.percentage) : sampleQuestions.percentage;
  const currentQ = questions[currentQuestion] || questions[0];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQ.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAiExplanation("");
    if (currentQuestion < questions.length - 1) setCurrentQuestion(c => c + 1);
  };

  if (status === "loading") {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdf4' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📗</div>
          <p style={{ color: '#0f766e', fontSize: '18px', fontWeight: 'bold' }}>Loading Maths AI...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>📗 Sarkari Maths AI — Complete Quantitative Aptitude</h1>
            <p style={{ color: '#99f6e4', fontSize: '12px', margin: '2px 0 0 0' }}>SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Arithmetic + Advanced Maths</p>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {exams.map(exam => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedExam === exam ? 'white' : 'rgba(255,255,255,0.2)', color: selectedExam === exam ? '#0f766e' : 'white' }}>
              {exam}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: '🏠 Dashboard' },
          { id: 'topics', label: '📖 Topics' },
          { id: 'pyq', label: '📅 20 Years PYQ' },
          { id: 'important', label: '🔥 Most Important' },
          { id: 'mock', label: '📝 Mock Test' },
          { id: 'progress', label: '📊 My Progress' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#0f766e' : '#666', borderBottom: activeTab === tab.id ? '3px solid #0f766e' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '18,650', label: 'Total Questions', color: '#0f766e' },
                { value: '20', label: 'Years PYQ', color: '#7c3aed' },
                { value: '750+', label: 'Most Important', color: '#dc2626' },
                { value: '14', label: 'Topics', color: '#16a34a' },
                { value: '0', label: 'Attempted', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 Quick Start — Arithmetic Topics (SSC/Banking में 60% weightage)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
                {arithmeticTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>

              <h2 style={{ color: '#dc2626', fontSize: '16px', margin: '16px 0', fontWeight: '800' }}>🧠 Advanced Maths Topics (SSC CGL में 40% weightage)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {advancedTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'topics' && (
          <div>
            {!selectedTopic ? (
              <div>
                <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 12px 0' }}>Arithmetic Topics</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {arithmeticTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                      style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{topic.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: topic.color, fontWeight: '800', fontSize: '14px', margin: '0 0 2px 0' }}>{topic.name}</p>
                        <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>{topic.count} Qs • {topic.repeat}% repeat</p>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '4px' }}>
                          <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 style={{ color: '#dc2626', fontSize: '16px', margin: '0 0 12px 0' }}>Advanced Topics</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {advancedTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                      style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{topic.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: topic.color, fontWeight: '800', fontSize: '14px', margin: '0 0 2px 0' }}>{topic.name}</p>
                        <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>{topic.count} Qs • {topic.repeat}% repeat</p>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '4px' }}>
                          <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); }}
                  style={{ backgroundColor: 'white', border: '2px solid #0f766e', color: '#0f766e', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  ← Back to Topics
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#0f766e', fontSize: '16px', margin: 0 }}>
                      {allTopics.find(t => t.id === selectedTopic)?.icon} {allTopics.find(t => t.id === selectedTopic)?.name}
                    </h2>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Q {currentQuestion + 1}/{questions.length}</span>
                  </div>

                  <p style={{ color: '#1e293b', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>{currentQ.question}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {currentQ.options.map((option, i) => (
                      <button key={i} onClick={() => !selectedAnswer && handleAnswer(i)}
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '2px solid', textAlign: 'left', fontSize: '14px', cursor: selectedAnswer !== null ? 'default' : 'pointer',
                          borderColor: selectedAnswer === null ? '#e2e8f0' : i === currentQ.correct ? '#16a34a' : selectedAnswer === i ? '#dc2626' : '#e2e8f0',
                          backgroundColor: selectedAnswer === null ? 'white' : i === currentQ.correct ? '#dcfce7' : selectedAnswer === i ? '#fee2e2' : 'white',
                          color: selectedAnswer === null ? '#1e293b' : i === currentQ.correct ? '#16a34a' : selectedAnswer === i ? '#dc2626' : '#64748b' }}>
                        {String.fromCharCode(65 + i)}. {option}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div>
                      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #bbf7d0' }}>
                        <p style={{ color: '#166534', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 Hindi Explanation</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{currentQ.explanation}</p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>{currentQ.trick}</p>
                      </div>

                      <button onClick={() => getAIExplanation(currentQ.question, allTopics.find(t => t.id === selectedTopic)?.name)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? '🤖 AI सोच रहा है...' : '🤖 AI से Shortcut Trick सीखो'}
                      </button>

                      {aiExplanation && (
                        <div style={{ backgroundColor: '#f5f3ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #ddd6fe' }}>
                          <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI Shortcut (Hindi)</p>
                          <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>{aiExplanation}</p>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#0f766e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
                          Next Question →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'important' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 Most Important Topics — {selectedExam} Maths</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>20 साल के papers का AI analysis — इन topics से हर साल 80%+ marks आते हैं</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#0f766e', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <p style={{ color: '#0f766e', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} repeat</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mock' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 Maths Mock Test — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>25 Questions • 30 Minutes • Hindi Shortcut after each answer</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Arithmetic', count: 15, color: '#0f766e' },
                { label: 'Advanced Maths', count: 7, color: '#7c3aed' },
                { label: 'Data Interpretation', count: 3, color: '#dc2626' },
              ].map((section, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', textAlign: 'center', border: `1px solid ${section.color}30` }}>
                  <p style={{ color: section.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{section.label}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{section.count} Questions</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('percentage'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
              style={{ width: '100%', backgroundColor: '#0f766e', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              🚀 Start Maths Mock Test
            </button>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 Maths PYQ — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#0f766e' : '#e2e8f0', backgroundColor: selectedYear === year ? '#0f766e' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#0f766e', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} Maths PYQ — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('percentage'); setActiveTab('topics'); }}
                style={{ backgroundColor: '#0f766e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Start {selectedYear} Maths PYQ →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 My Maths Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Questions Attempted', value: score, color: '#0f766e' },
                { label: 'Correct Answers', value: score, color: '#16a34a' },
                { label: 'Accuracy', value: score > 0 ? '100%' : '0%', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('topics')}
              style={{ width: '100%', backgroundColor: '#0f766e', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Start Practicing →
            </button>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#0f766e', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}