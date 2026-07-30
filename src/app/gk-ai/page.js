"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const staticTopics = [
  { id: "history", name: "History", icon: "🏛️", count: "3,240", repeat: 92, color: "#ca8a04" },
  { id: "geography", name: "Geography", icon: "🗺️", count: "2,890", repeat: 88, color: "#16a34a" },
  { id: "polity", name: "Polity", icon: "⚖️", count: "2,560", repeat: 90, color: "#1e3a8a" },
  { id: "economics", name: "Economics", icon: "📈", count: "1,780", repeat: 85, color: "#dc2626" },
  { id: "science", name: "Science & Tech", icon: "🔬", count: "2,120", repeat: 87, color: "#7c3aed" },
  { id: "awards", name: "Awards & Honours", icon: "🏆", count: "890", repeat: 80, color: "#ea580c" },
  { id: "books", name: "Books & Authors", icon: "📚", count: "650", repeat: 75, color: "#0891b2" },
  { id: "sports", name: "Sports", icon: "⚽", count: "1,340", repeat: 78, color: "#16a34a" },
];

const currentAffairs = [
  { date: "29 Jul", day: "Tue", title: "India successfully launches Chandrayaan-4 mission; ISRO confirms lunar landing scheduled for August 15", tags: ["Science & Tech", "National", "Important"] },
  { date: "28 Jul", day: "Mon", title: "RBI keeps repo rate unchanged at 6.5%; GDP growth forecast revised to 7.2%", tags: ["Banking", "Economy", "Important"] },
  { date: "27 Jul", day: "Sun", title: "UPSC declares Civil Services 2025 final results; Shruti Sharma tops again", tags: ["Exam", "Polity"] },
  { date: "26 Jul", day: "Sat", title: "India wins Gold in Badminton at World Championships 2026; PV Sindhu retires", tags: ["Sports", "International"] },
  { date: "25 Jul", day: "Fri", title: "Parliament passes Digital India Act 2026; focuses on AI regulation and data privacy", tags: ["Polity", "Science & Tech", "Important"] },
];

const mostImportant = [
  { topic: "Modern Indian History (1857-1947)", repeat: "92%", tip: "Freedom struggle, Gandhi movements, INC sessions — हर exam में 4-5 questions" },
  { topic: "Indian Polity (Constitution)", repeat: "90%", tip: "Articles 12-35 (Fundamental Rights), 36-51 (DPSP), 52-78 (President/PM) — Most asked" },
  { topic: "Geography (Physical India)", repeat: "88%", tip: "Rivers, Mountains, Climate zones, Soil types — Map-based questions बढ़ रहे हैं" },
  { topic: "Science (Biology - Human Body)", repeat: "87%", tip: "Vitamins, Diseases, Hormones, Blood groups — SSC में 3-4 questions guaranteed" },
  { topic: "Economics (Basic Terms)", repeat: "85%", tip: "GDP, Inflation, RBI functions, Budget terms — Banking exams में 5-8 marks" },
  { topic: "Current Affairs (Last 6 months)", repeat: "85%", tip: "Government schemes, Appointments, Awards, Sports — रोज़ 10 min पढ़ो" },
  { topic: "Awards (National + International)", repeat: "80%", tip: "Bharat Ratna, Padma Awards, Nobel, Oscar — Updated list maintain करो" },
  { topic: "Static GK (First/Largest/Longest)", repeat: "78%", tip: "Capitals, Currencies, National Symbols — एक master list बनाओ" },
];

const sampleQuestions = {
  history: [
    {
      id: 1,
      question: "The Indian National Congress was founded in 1885 by:",
      options: ["Mahatma Gandhi", "A.O. Hume", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale"],
      correct: 1,
      explanation: "Indian National Congress की स्थापना 1885 में A.O. Hume (Allan Octavian Hume) ने की थी।\n\nKey Facts:\n• स्थापना: 28 December 1885\n• स्थान: Bombay (Mumbai)\n• पहले अध्यक्ष: W.C. Bonnerjee\n• A.O. Hume एक British Civil Servant थे जो India में काम करते थे",
      trick: "💡 Trick: INC = 1885, Hume ने बनाई, Bombay में — '1885 में Hume बम गिराया Bombay में' 😄"
    },
  ],
  polity: [
    {
      id: 2,
      question: "Which Article of the Indian Constitution abolishes untouchability?",
      options: ["Article 14", "Article 17", "Article 21", "Article 25"],
      correct: 1,
      explanation: "Article 17 — Untouchability Abolition\n\nभारतीय संविधान का Article 17 छुआछूत को समाप्त करता है और किसी भी रूप में इसका पालन करना कानूनी अपराध है।\n\nयाद रखें:\n• Article 14 — Equality before law\n• Article 15 — No discrimination\n• Article 16 — Equal opportunity\n• Article 17 — Abolition of untouchability ✓\n• Article 18 — Abolition of titles",
      trick: "💡 Trick: 14,15,16,17,18 = Equality Articles. 17 = छुआछूत खत्म (सत्रह = सत = सच्चाई)"
    },
  ],
};

export default function GKAI() {
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
          message: `You are an expert GK teacher for SSC/Banking exam aspirants. Explain this question in Hindi:

Question: ${question}
Topic: ${topic}

Give:
1. Complete explanation with context (Hindi में)
2. Related facts that often come in exams (Hindi में)
3. Memory trick (Hindi में)
4. Similar questions जो exam में आ सकते हैं

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

  const questions = selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.history) : sampleQuestions.history;
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
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff7ed' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌍</div>
          <p style={{ color: '#ea580c', fontSize: '18px', fontWeight: 'bold' }}>Loading GK/GS AI...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fff7ed', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>🌍 Sarkari GK/GS AI — Complete General Knowledge</h1>
            <p style={{ color: '#fed7aa', fontSize: '12px', margin: '2px 0 0 0' }}>Current Affairs • Static GK • History • Geography • Polity • Economics • Science</p>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {exams.map(exam => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedExam === exam ? 'white' : 'rgba(255,255,255,0.2)', color: selectedExam === exam ? '#ea580c' : 'white' }}>
              {exam}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: '🏠 Dashboard' },
          { id: 'current', label: '📰 Current Affairs' },
          { id: 'static', label: '📚 Static GK' },
          { id: 'pyq', label: '📅 20 Years PYQ' },
          { id: 'important', label: '🔥 Most Important' },
          { id: 'mock', label: '📝 Mock Test' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#ea580c' : '#666', borderBottom: activeTab === tab.id ? '3px solid #ea580c' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '22,450', label: 'Total Questions', color: '#ea580c' },
                { value: '20', label: 'Years PYQ', color: '#7c3aed' },
                { value: '1,200+', label: 'Current Affairs', color: '#dc2626' },
                { value: '8', label: 'Subjects', color: '#16a34a' },
                { value: '0', label: 'Attempted', color: '#0891b2' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📚 Static GK Topics (SSC में 40-50 marks)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {staticTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('static'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: `1px solid ${topic.color}30`, textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📰 Today's Current Affairs (July 2026)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentAffairs.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ backgroundColor: '#ea580c', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '16px', fontWeight: '800' }}>{item.date.split(' ')[0]}</div>
                      <div style={{ color: '#ea580c', fontSize: '10px', fontWeight: '600' }}>{item.date.split(' ')[1]}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#1e293b', fontSize: '13px', fontWeight: '600', margin: '0 0 6px 0', lineHeight: '1.4' }}>{item.title}</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {item.tags.map((tag, j) => (
                          <span key={j} style={{ backgroundColor: '#fed7aa', color: '#ea580c', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '600' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('current')}
                style={{ width: '100%', marginTop: '12px', backgroundColor: '#ea580c', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                View All Current Affairs →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'current' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📰 Current Affairs — July 2026</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentAffairs.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                  <div style={{ textAlign: 'center', flexShrink: 0, width: '50px' }}>
                    <div style={{ backgroundColor: '#ea580c', color: 'white', borderRadius: '8px', padding: '6px', fontSize: '18px', fontWeight: '800' }}>{item.date.split(' ')[0]}</div>
                    <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>{item.day}</div>
                    <div style={{ color: '#ea580c', fontSize: '10px', fontWeight: '600' }}>{item.date.split(' ')[1]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1e293b', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0', lineHeight: '1.5' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.tags.map((tag, j) => (
                        <span key={j} style={{ backgroundColor: tag === 'Important' ? '#fef9c3' : '#fed7aa', color: tag === 'Important' ? '#ca8a04' : '#ea580c', padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'static' && (
          <div>
            {!selectedTopic ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                {staticTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
                    style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{topic.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: topic.color, fontWeight: '800', fontSize: '15px', margin: '0 0 2px 0' }}>{topic.name}</p>
                      <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 6px 0' }}>{topic.count} Qs • {topic.repeat}% repeat</p>
                      <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '4px' }}>
                        <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); }}
                  style={{ backgroundColor: 'white', border: '2px solid #ea580c', color: '#ea580c', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  ← Back to Subjects
                </button>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#ea580c', fontSize: '16px', margin: 0 }}>
                      {staticTopics.find(t => t.id === selectedTopic)?.icon} {staticTopics.find(t => t.id === selectedTopic)?.name}
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
                      <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fed7aa' }}>
                        <p style={{ color: '#ea580c', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 Hindi Explanation</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{currentQ.explanation}</p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>{currentQ.trick}</p>
                      </div>
                      <button onClick={() => getAIExplanation(currentQ.question, staticTopics.find(t => t.id === selectedTopic)?.name)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#ea580c', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? '🤖 AI सोच रहा है...' : '🤖 AI से और जानो'}
                      </button>
                      {aiExplanation && (
                        <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fed7aa' }}>
                          <p style={{ color: '#ea580c', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI Explanation (Hindi)</p>
                          <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>{aiExplanation}</p>
                        </div>
                      )}
                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 Most Important GK Topics — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>20 साल के papers का AI analysis</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', border: '1px solid #fed7aa', display: 'flex', gap: '14px' }}>
                  <div style={{ backgroundColor: '#ea580c', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ color: '#ea580c', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#fed7aa', color: '#ea580c', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 GK PYQ — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#ea580c' : '#e2e8f0', backgroundColor: selectedYear === year ? '#ea580c' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#ea580c', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} GK PYQ — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('history'); setActiveTab('static'); }}
                style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Start {selectedYear} GK PYQ →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mock' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#ea580c', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 GK Mock Test — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>25 Questions • 15 Minutes • Hindi Explanation</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Static GK', count: 15, color: '#ea580c' },
                { label: 'Current Affairs', count: 7, color: '#7c3aed' },
                { label: 'Science & Tech', count: 3, color: '#16a34a' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: '#fff7ed', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{s.label}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.count} Questions</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('history'); setActiveTab('static'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); }}
              style={{ width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              🚀 Start GK Mock Test
            </button>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#ea580c', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}