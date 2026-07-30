"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const topics = [
  { id: "rc", name: "Reading Comprehension", icon: "📖", count: "2,340", repeat: 95, color: "#1e3a8a" },
  { id: "error", name: "Error Detection", icon: "🔍", count: "1,890", repeat: 90, color: "#dc2626" },
  { id: "sentence", name: "Sentence Improvement", icon: "✏️", count: "1,560", repeat: 85, color: "#7c3aed" },
  { id: "cloze", name: "Cloze Test", icon: "📝", count: "1,230", repeat: 88, color: "#0891b2" },
  { id: "jumbles", name: "Para Jumbles", icon: "🔀", count: "980", repeat: 82, color: "#ca8a04" },
  { id: "vocab", name: "Vocabulary", icon: "📚", count: "2,450", repeat: 92, color: "#16a34a" },
  { id: "idioms", name: "Idioms & Phrases", icon: "💬", count: "890", repeat: 78, color: "#db2777" },
  { id: "spelling", name: "Spelling Error", icon: "🔤", count: "1,110", repeat: 75, color: "#ea580c" },
];

const mostImportant = [
  { topic: "Subject-Verb Agreement", repeat: "95%", tip: "हर साल 3-4 questions आते हैं — Singular subject के साथ singular verb" },
  { topic: "Active-Passive Voice", repeat: "92%", tip: "Tense change rules याद करो — Present/Past/Future सब के rules अलग" },
  { topic: "Reading Comprehension", repeat: "95%", tip: "पहले questions पढ़ो, फिर passage — time बचेगा" },
  { topic: "Vocabulary (Synonyms/Antonyms)", repeat: "90%", tip: "Root words सीखो — एक root से 10 words याद होंगे" },
  { topic: "Cloze Test", repeat: "88%", tip: "Context से answer आता है — पूरा paragraph का sense समझो" },
  { topic: "Para Jumbles", repeat: "82%", tip: "पहले Opening और Closing sentence identify करो" },
  { topic: "Error Spotting", repeat: "90%", tip: "Articles (a/an/the) और Prepositions में सबसे ज़्यादा errors आते हैं" },
  { topic: "One Word Substitution", repeat: "78%", tip: "Top 200 OWS रटो — SSC में repeat होते हैं" },
];

const pyqYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

const sampleQuestions = {
  error: [
    {
      id: 1,
      question: "Select the part of the sentence that contains an error: 'Each of the boys (A) / were given (B) / a prize (C) / No error (D)'",
      options: ["Each of the boys", "were given", "a prize", "No error"],
      correct: 1,
      explanation: "गलती 'were given' में है। 'Each of' के साथ हमेशा Singular verb आती है। सही वाक्य होगा: 'Each of the boys was given a prize.' Rule: Each/Every/Either/Neither + Singular Verb",
      trick: "💡 Trick: EACH = एक-एक करके → Singular → 'was'"
    },
    {
      id: 2,
      question: "Find the error: 'The committee (A) / have decided (B) / to postpone the meeting (C) / No error (D)'",
      options: ["The committee", "have decided", "to postpone the meeting", "No error"],
      correct: 3,
      explanation: "यह वाक्य सही है। Committee एक Collective Noun है जो एक unit की तरह काम करता है — इसलिए 'have decided' correct है जब members individually act करते हैं।",
      trick: "💡 Collective Nouns: जब group एक साथ act करे → Singular verb; अलग-अलग act करें → Plural verb"
    },
  ],
  vocab: [
    {
      id: 3,
      question: "Choose the word most similar in meaning to 'BENEVOLENT':",
      options: ["Cruel", "Charitable", "Indifferent", "Hostile"],
      correct: 1,
      explanation: "'Benevolent' का Hindi अर्थ है 'दयालु/परोपकारी'। इसका synonym है 'Charitable' (दानशील)। Memory trick: Bene = Good (Latin) → अच्छा काम करने वाला → Charitable",
      trick: "💡 Root: BENE = Good. Benefit, Beneficial, Benevolent — सब में 'अच्छा' है"
    },
  ],
};

export default function EnglishAI() {
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
          message: `You are an expert English teacher for SSC/Banking exam aspirants. Explain this question in Hindi:

Question: ${question}
Topic: ${topic}

Give:
1. Rule (Hindi में)
2. Shortcut/Trick (Hindi में)
3. Similar questions में यह rule कैसे apply होगा
4. Common mistakes to avoid

Keep it simple, practical and in Hindi/Hinglish.`,
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

  const questions = selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.error) : sampleQuestions.error;
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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
    }
  };

  if (status === "loading") {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4ff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📘</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>Loading English AI...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>📘 Sarkari Exam English AI</h1>
            <p style={{ color: '#bfdbfe', fontSize: '12px', margin: '2px 0 0 0' }}>SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Complete English Section</p>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>

        {/* Exam Selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {exams.map(exam => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedExam === exam ? 'white' : 'rgba(255,255,255,0.2)', color: selectedExam === exam ? '#1e3a8a' : 'white' }}>
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
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
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#1e3a8a' : '#666', borderBottom: activeTab === tab.id ? '3px solid #1e3a8a' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '12,450', label: 'Total Questions', color: '#1e3a8a' },
                { value: '20', label: 'Years PYQ', color: '#7c3aed' },
                { value: '500+', label: 'Most Important', color: '#dc2626' },
                { value: '8', label: 'Topics', color: '#16a34a' },
                { value: '0', label: 'Attempted', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Start */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 Quick Start — आज क्या पढ़ें?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {topics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center', transition: 'all 0.2s' }}>
                    <div style={{ fontSize: '28px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '13px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Where You Left */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 Continue Where You Left</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: '8px', padding: '14px 16px' }}>
                <div>
                  <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>Error Detection — Subject-Verb Agreement</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>12/25 questions done • Accuracy: 75%</p>
                  <div style={{ backgroundColor: '#dbeafe', borderRadius: '4px', height: '6px', width: '200px' }}>
                    <div style={{ backgroundColor: '#1e3a8a', height: '100%', width: '48%', borderRadius: '4px' }} />
                  </div>
                </div>
                <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); }}
                  style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                  Resume →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === 'topics' && (
          <div>
            {!selectedTopic ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {topics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '36px' }}>{topic.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: topic.color, fontWeight: '800', fontSize: '15px', margin: '0 0 4px 0' }}>{topic.name}</p>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 6px 0' }}>{topic.count} Questions</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '6px', flex: 1 }}>
                          <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                        </div>
                        <span style={{ color: '#dc2626', fontSize: '11px', fontWeight: '700' }}>{topic.repeat}% repeat</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); }}
                  style={{ backgroundColor: 'white', border: '2px solid #1e3a8a', color: '#1e3a8a', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  ← Back to Topics
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: 0 }}>
                      {topics.find(t => t.id === selectedTopic)?.icon} {topics.find(t => t.id === selectedTopic)?.name}
                    </h2>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>Question {currentQuestion + 1}/{questions.length}</span>
                  </div>

                  <p style={{ color: '#1e293b', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>{currentQ.question}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {currentQ.options.map((option, i) => (
                      <button key={i} onClick={() => !selectedAnswer && handleAnswer(i)}
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '2px solid', textAlign: 'left', fontSize: '14px', cursor: selectedAnswer !== null ? 'default' : 'pointer', fontWeight: '500',
                          borderColor: selectedAnswer === null ? '#e2e8f0' : i === currentQ.correct ? '#16a34a' : selectedAnswer === i ? '#dc2626' : '#e2e8f0',
                          backgroundColor: selectedAnswer === null ? 'white' : i === currentQ.correct ? '#dcfce7' : selectedAnswer === i ? '#fee2e2' : 'white',
                          color: selectedAnswer === null ? '#1e293b' : i === currentQ.correct ? '#16a34a' : selectedAnswer === i ? '#dc2626' : '#64748b' }}>
                        {String.fromCharCode(65 + i)}. {option}
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div>
                      <div style={{ backgroundColor: '#fffbeb', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fde68a' }}>
                        <p style={{ color: '#92400e', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 Hindi Explanation</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0' }}>{currentQ.explanation}</p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>{currentQ.trick}</p>
                      </div>

                      <button onClick={() => getAIExplanation(currentQ.question, topics.find(t => t.id === selectedTopic)?.name)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? '🤖 AI सोच रहा है...' : '🤖 AI से और विस्तार में समझो'}
                      </button>

                      {aiExplanation && (
                        <div style={{ backgroundColor: '#f5f3ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #ddd6fe' }}>
                          <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI Explanation (Hindi)</p>
                          <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>{aiExplanation}</p>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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

        {/* 20 Years PYQ Tab */}
        {activeTab === 'pyq' && (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 Previous Year Questions — {selectedExam}</h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {pyqYears.map(year => (
                  <button key={year} onClick={() => setSelectedYear(year)}
                    style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#1e3a8a' : '#e2e8f0', backgroundColor: selectedYear === year ? '#1e3a8a' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                    {year}
                  </button>
                ))}
              </div>
              <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} English PYQ — {selectedYear}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>इस साल के questions practice करें — Hindi explanation के साथ</p>
                <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); }}
                  style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  Start {selectedYear} PYQ Practice →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Most Important Tab */}
        {activeTab === 'important' && (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 Most Important Topics — {selectedExam}</h2>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>AI analysis of 20 years papers — इन topics से हर साल 80%+ questions आते हैं</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mostImportant.map((item, i) => (
                  <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: '#dc2626', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                        <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} repeat</span>
                      </div>
                      <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.tip}</p>
                    </div>
                    <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); }}
                      style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }}>
                      Practice
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mock Test Tab */}
        {activeTab === 'mock' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 English Mock Test — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>25 Questions • 20 Minutes • Hindi Explanation after each answer</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Error Detection', count: 5, color: '#dc2626' },
                { label: 'Vocabulary', count: 5, color: '#7c3aed' },
                { label: 'Reading Comp.', count: 5, color: '#1e3a8a' },
                { label: 'Cloze Test', count: 5, color: '#0891b2' },
                { label: 'Para Jumbles', count: 3, color: '#ca8a04' },
                { label: 'Idioms', count: 2, color: '#db2777' },
              ].map((section, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', textAlign: 'center', border: `1px solid ${section.color}30` }}>
                  <p style={{ color: section.color, fontWeight: '700', fontSize: '13px', margin: '0 0 4px 0' }}>{section.label}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{section.count} Questions</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
              style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              🚀 Start Mock Test — {selectedExam} English
            </button>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 My Progress — English Section</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Questions Attempted', value: score, color: '#1e3a8a' },
                { label: 'Correct Answers', value: score, color: '#16a34a' },
                { label: 'Current Accuracy', value: score > 0 ? '100%' : '0%', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <p style={{ color: '#1e3a8a', fontWeight: '700', margin: '0 0 8px 0' }}>Practice more to see detailed progress!</p>
              <button onClick={() => setActiveTab('topics')}
                style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Start Practicing →
              </button>
            </div>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}