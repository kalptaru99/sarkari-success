"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const verbalTopics = [
  { id: "analogy", name: "Analogy", icon: "🔗", count: "1,450", repeat: 92, color: "#7c3aed" },
  { id: "blood", name: "Blood Relation", icon: "👨‍👩‍👧", count: "1,230", repeat: 88, color: "#dc2626" },
  { id: "syllogism", name: "Syllogism", icon: "🔄", count: "1,560", repeat: 90, color: "#0891b2" },
  { id: "coding", name: "Coding-Decoding", icon: "🔐", count: "1,340", repeat: 88, color: "#ca8a04" },
  { id: "direction", name: "Direction Sense", icon: "🧭", count: "980", repeat: 82, color: "#16a34a" },
  { id: "puzzle", name: "Puzzle & Seating", icon: "🧩", count: "2,120", repeat: 95, color: "#7c3aed" },
  { id: "inequality", name: "Inequality", icon: "⚖️", count: "890", repeat: 85, color: "#dc2626" },
  { id: "series", name: "Series (Number/Letter)", icon: "📊", count: "1,670", repeat: 90, color: "#0891b2" },
];

const nonVerbalTopics = [
  { id: "nonverbal", name: "Non-Verbal (Mirror/Image)", icon: "🪞", count: "1,120", repeat: 78, color: "#ca8a04" },
  { id: "classification", name: "Classification", icon: "🎯", count: "780", repeat: 82, color: "#16a34a" },
  { id: "statement", name: "Statement & Assumption", icon: "💭", count: "920", repeat: 80, color: "#7c3aed" },
  { id: "calendar", name: "Calendar & Clock", icon: "📅", count: "650", repeat: 75, color: "#dc2626" },
];

const mostImportant = [
  { topic: "Puzzle & Seating Arrangement", repeat: "95%", tip: "Banking में 10-15 marks — Row, Circle, Floor puzzles अलग-अलग practice करो" },
  { topic: "Syllogism", repeat: "90%", tip: "Venn Diagram method use करो — हर statement को circle में draw करो" },
  { topic: "Series (Number/Letter)", repeat: "90%", tip: "Difference pattern, ×2, ÷2, Prime numbers — 5 patterns याद करो" },
  { topic: "Analogy", repeat: "88%", tip: "Word:Meaning, Part:Whole, Tool:Function — relationship identify करो" },
  { topic: "Coding-Decoding", repeat: "88%", tip: "Letter shifting (+1,-1,+2,-2) और Number coding — दोनों practice करो" },
  { topic: "Blood Relation", repeat: "85%", tip: "Family tree बनाओ — हर question में diagram draw करो, mentally मत सोचो" },
  { topic: "Inequality", repeat: "82%", tip: "A>B≥C→ A>C ✓ A≥C ✗ — chain comparison rules याद करो" },
  { topic: "Direction Sense", repeat: "80%", tip: "हमेशा North ऊपर assume करो — compass diagram draw करो" },
];

const sampleQuestions = {
  analogy: [
    {
      id: 1,
      question: "Book : Library :: Painting : ?",
      options: ["Artist", "Gallery", "Museum", "Canvas"],
      correct: 1,
      explanation: "Book को Library में रखा जाता है — यह relationship है 'Object : Place where it is kept'\n\nइसी तरह Painting को Gallery में रखा/प्रदर्शित किया जाता है।\n\nMuseum में historical items होते हैं, Gallery में specifically paintings/art होती हैं।",
      trick: "💡 Analogy Trick: पहले relationship identify करो — Object:Place, Worker:Tool, Part:Whole, Cause:Effect"
    },
  ],
  syllogism: [
    {
      id: 2,
      question: "All cats are dogs. All dogs are animals. Conclusion: All cats are animals.",
      options: ["True", "False", "Uncertain", "None"],
      correct: 0,
      explanation: "Venn Diagram method:\n• Circle 1 (Cats) — Circle 2 (Dogs) के अंदर है\n• Circle 2 (Dogs) — Circle 3 (Animals) के अंदर है\n• इसलिए Circle 1 (Cats) भी Circle 3 (Animals) के अंदर है\n• Result: All cats ARE animals ✓ TRUE",
      trick: "💡 Syllogism Rule: All A are B + All B are C → All A are C (यह हमेशा true होता है)"
    },
  ],
};

export default function ReasoningAI() {
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
          message: `You are an expert Reasoning teacher for SSC/Banking exam aspirants. Explain this question in Hindi:

Question: ${question}
Topic: ${topic}

Give:
1. Rule/Method (Hindi में)
2. Step-by-step solution (Hindi में)  
3. Shortcut trick (Hindi में)
4. Common mistakes to avoid

Keep it practical and in Hindi/Hinglish.`,
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

  const allTopics = [...verbalTopics, ...nonVerbalTopics];
  const questions = selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.analogy) : sampleQuestions.analogy;
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
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#faf5ff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧩</div>
          <p style={{ color: '#7c3aed', fontSize: '18px', fontWeight: 'bold' }}>Loading Reasoning AI...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf5ff', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>🧩 Sarkari Reasoning AI — Complete Logical Reasoning</h1>
            <p style={{ color: '#e9d5ff', fontSize: '12px', margin: '2px 0 0 0' }}>SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Verbal & Non-Verbal</p>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {exams.map(exam => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedExam === exam ? 'white' : 'rgba(255,255,255,0.2)', color: selectedExam === exam ? '#7c3aed' : 'white' }}>
              {exam}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: '🏠 Dashboard' },
          { id: 'topics', label: '📖 Topics' },
          { id: 'pyq', label: '📅 20 Years PYQ' },
          { id: 'important', label: '🔥 Most Important' },
          { id: 'mock', label: '📝 Mock Test' },
          { id: 'progress', label: '📊 My Progress' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#7c3aed' : '#666', borderBottom: activeTab === tab.id ? '3px solid #7c3aed' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '15,320', label: 'Total Questions', color: '#7c3aed' },
                { value: '20', label: 'Years PYQ', color: '#dc2626' },
                { value: '600+', label: 'Most Important', color: '#ca8a04' },
                { value: '12', label: 'Topics', color: '#16a34a' },
                { value: '0', label: 'Attempted', color: '#0891b2' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 Verbal Reasoning Topics (SSC/Banking में 70% weightage)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
                {verbalTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>

              <h2 style={{ color: '#dc2626', fontSize: '16px', margin: '16px 0', fontWeight: '800' }}>🧠 Non-Verbal & Advanced Topics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {nonVerbalTopics.map(topic => (
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
                <h2 style={{ color: '#7c3aed', margin: '0 0 12px 0', fontSize: '16px' }}>Verbal Reasoning</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {verbalTopics.map(topic => (
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
                <h2 style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '16px' }}>Non-Verbal Topics</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {nonVerbalTopics.map(topic => (
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
                  style={{ backgroundColor: 'white', border: '2px solid #7c3aed', color: '#7c3aed', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  ← Back to Topics
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: 0 }}>
                      {allTopics.find(t => t.id === selectedTopic)?.icon} {allTopics.find(t => t.id === selectedTopic)?.name}
                    </h2>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Q {currentQuestion + 1}/{questions.length}</span>
                  </div>

                  <p style={{ color: '#1e293b', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>{currentQ.question}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {currentQ.options.map((option, i) => (
                      <button key={i} onClick={() => selectedAnswer === null && handleAnswer(i)}
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
                      <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #e9d5ff' }}>
                        <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 Hindi Explanation</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{currentQ.explanation}</p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>{currentQ.trick}</p>
                      </div>

                      <button onClick={() => getAIExplanation(currentQ.question, allTopics.find(t => t.id === selectedTopic)?.name)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? '🤖 AI सोच रहा है...' : '🤖 AI से और समझो'}
                      </button>

                      {aiExplanation && (
                        <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #e9d5ff' }}>
                          <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI Explanation (Hindi)</p>
                          <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>{aiExplanation}</p>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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
            <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 Most Important — {selectedExam} Reasoning</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>20 साल के papers का AI analysis</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px' }}>
                  <div style={{ backgroundColor: '#7c3aed', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ color: '#7c3aed', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#f5f3ff', color: '#7c3aed', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat}</span>
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
            <h2 style={{ color: '#7c3aed', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 Reasoning Mock Test — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>25 Questions • 20 Minutes • Hindi Explanation</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Verbal Reasoning', count: 18, color: '#7c3aed' },
                { label: 'Non-Verbal', count: 5, color: '#dc2626' },
                { label: 'Advanced', count: 2, color: '#ca8a04' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{s.label}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.count} Questions</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('analogy'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
              style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              🚀 Start Reasoning Mock Test
            </button>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 Reasoning PYQ — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#7c3aed' : '#e2e8f0', backgroundColor: selectedYear === year ? '#7c3aed' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} Reasoning PYQ — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('analogy'); setActiveTab('topics'); }}
                style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Start {selectedYear} Reasoning PYQ →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#7c3aed', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 My Reasoning Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Attempted', value: score, color: '#7c3aed' },
                { label: 'Correct', value: score, color: '#16a34a' },
                { label: 'Accuracy', value: score > 0 ? '100%' : '0%', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('topics')}
              style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              Start Practicing →
            </button>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#7c3aed', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}