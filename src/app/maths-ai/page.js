"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const content = {
  en: {
    title: "Sarkari Maths AI — Complete Quantitative Aptitude",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Arithmetic + Advanced Maths",
    dashboard: "Dashboard", topics: "Topics", pyq: "20 Years PYQ",
    important: "Most Important", mock: "Mock Test", progress: "My Progress",
    arithmetic: "Arithmetic Topics (60% weightage in SSC/Banking)",
    advanced: "Advanced Maths Topics (40% weightage in SSC CGL)",
    totalQ: "Total Questions", yearsQ: "Years PYQ", mostImp: "Most Important",
    topicsCount: "Topics", attempted: "Attempted",
    startPractice: "Start Practicing →", backToTopics: "← Back to Topics",
    explanation: "Explanation", aiBtn: "🤖 Get AI Shortcut",
    aiThinking: "🤖 AI is thinking...", nextQ: "Next Question →",
    startMock: "🚀 Start Maths Mock Test", repeatLabel: "repeat",
    practiceBtn: "Practice", impTitle: "Most Important Topics",
    impDesc: "AI analysis of 20 years papers — these topics give 80%+ marks",
    pyqTitle: "Previous Year Questions", startPYQ: "Start PYQ Practice →",
  },
  hi: {
    title: "सरकारी गणित AI — संपूर्ण मात्रात्मक योग्यता",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • रेलवे • बैंकिंग — अंकगणित + उच्च गणित",
    dashboard: "डैशबोर्ड", topics: "विषय", pyq: "20 साल के प्रश्न",
    important: "सबसे महत्वपूर्ण", mock: "मॉक टेस्ट", progress: "मेरी प्रगति",
    arithmetic: "अंकगणित विषय (SSC/बैंकिंग में 60% वेटेज)",
    advanced: "उच्च गणित विषय (SSC CGL में 40% वेटेज)",
    totalQ: "कुल प्रश्न", yearsQ: "साल के प्रश्न", mostImp: "सबसे महत्वपूर्ण",
    topicsCount: "विषय", attempted: "प्रयास किए",
    startPractice: "अभ्यास शुरू करें →", backToTopics: "← विषयों पर वापस जाएं",
    explanation: "हिंदी में स्पष्टीकरण", aiBtn: "🤖 AI शॉर्टकट सीखें",
    aiThinking: "🤖 AI सोच रहा है...", nextQ: "अगला प्रश्न →",
    startMock: "🚀 गणित मॉक टेस्ट शुरू करें", repeatLabel: "बार आया",
    practiceBtn: "अभ्यास करें", impTitle: "सबसे महत्वपूर्ण विषय",
    impDesc: "20 साल के पेपर का AI विश्लेषण — इन विषयों से 80%+ अंक मिलते हैं",
    pyqTitle: "पिछले साल के प्रश्न", startPYQ: "PYQ अभ्यास शुरू करें →",
  }
};

const arithmeticTopicsData = {
  en: [
    { id: "percentage", name: "Percentage", icon: "📊", count: "540", repeat: 95, color: "#0891b2" },
    { id: "profit", name: "Profit & Loss", icon: "💰", count: "450", repeat: 92, color: "#16a34a" },
    { id: "ratio", name: "Ratio & Proportion", icon: "⚖️", count: "350", repeat: 88, color: "#7c3aed" },
    { id: "timework", name: "Time & Work", icon: "⏱️", count: "420", repeat: 90, color: "#dc2626" },
    { id: "timedist", name: "Time, Speed & Distance", icon: "🚗", count: "480", repeat: 87, color: "#ca8a04" },
    { id: "si", name: "Simple & Compound Interest", icon: "🏦", count: "280", repeat: 85, color: "#db2777" },
    { id: "average", name: "Average", icon: "📈", count: "320", repeat: 83, color: "#ea580c" },
    { id: "partnership", name: "Partnership", icon: "🤝", count: "210", repeat: 75, color: "#0891b2" },
  ],
  hi: [
    { id: "percentage", name: "प्रतिशत", icon: "📊", count: "540", repeat: 95, color: "#0891b2" },
    { id: "profit", name: "लाभ और हानि", icon: "💰", count: "450", repeat: 92, color: "#16a34a" },
    { id: "ratio", name: "अनुपात और समानुपात", icon: "⚖️", count: "350", repeat: 88, color: "#7c3aed" },
    { id: "timework", name: "समय और काम", icon: "⏱️", count: "420", repeat: 90, color: "#dc2626" },
    { id: "timedist", name: "समय, चाल और दूरी", icon: "🚗", count: "480", repeat: 87, color: "#ca8a04" },
    { id: "si", name: "साधारण और चक्रवृद्धि ब्याज", icon: "🏦", count: "280", repeat: 85, color: "#db2777" },
    { id: "average", name: "औसत", icon: "📈", count: "320", repeat: 83, color: "#ea580c" },
    { id: "partnership", name: "साझेदारी", icon: "🤝", count: "210", repeat: 75, color: "#0891b2" },
  ]
};

const advancedTopicsData = {
  en: [
    { id: "number", name: "Number System", icon: "🔢", count: "380", repeat: 88, color: "#1e3a8a" },
    { id: "algebra", name: "Algebra", icon: "📐", count: "450", repeat: 85, color: "#7c3aed" },
    { id: "geometry", name: "Geometry", icon: "📐", count: "520", repeat: 92, color: "#dc2626" },
    { id: "trig", name: "Trigonometry", icon: "📏", count: "350", repeat: 88, color: "#16a34a" },
    { id: "mensuration", name: "Mensuration", icon: "📦", count: "420", repeat: 85, color: "#ca8a04" },
    { id: "di", name: "Data Interpretation", icon: "📊", count: "630", repeat: 95, color: "#0891b2" },
  ],
  hi: [
    { id: "number", name: "संख्या पद्धति", icon: "🔢", count: "380", repeat: 88, color: "#1e3a8a" },
    { id: "algebra", name: "बीजगणित", icon: "📐", count: "450", repeat: 85, color: "#7c3aed" },
    { id: "geometry", name: "ज्यामिति", icon: "📐", count: "520", repeat: 92, color: "#dc2626" },
    { id: "trig", name: "त्रिकोणमिति", icon: "📏", count: "350", repeat: 88, color: "#16a34a" },
    { id: "mensuration", name: "क्षेत्रमिति", icon: "📦", count: "420", repeat: 85, color: "#ca8a04" },
    { id: "di", name: "आंकड़ा निर्वचन", icon: "📊", count: "630", repeat: 95, color: "#0891b2" },
  ]
};

const mostImportantData = {
  en: [
    { topic: "Geometry (Triangles & Circles)", repeat: "95%", tip: "Tier 2 has 9-15 questions — Basic theorems + Coordinate Geometry must study" },
    { topic: "Data Interpretation", repeat: "95%", tip: "Banking has 15-20 marks — Table, Bar Graph, Pie Chart all practice" },
    { topic: "Percentage", repeat: "92%", tip: "Root of all topics — Percentage formula: (Part/Whole) × 100" },
    { topic: "Profit & Loss", repeat: "90%", tip: "SP = CP × (100 + P%)/100 — memorize this formula, solve in 30 sec" },
    { topic: "Time & Work", repeat: "88%", tip: "LCM Method — Total Work = LCM of days. Each day work = Total/Days" },
    { topic: "Trigonometry", repeat: "88%", tip: "sin²θ + cos²θ = 1 and 1 + tan²θ = sec²θ — these 2 formulas solve 80%" },
    { topic: "Ratio & Proportion", repeat: "85%", tip: "If a:b = c:d then ad = bc — Cross multiplication trick" },
    { topic: "Number System", repeat: "82%", tip: "Divisibility rules — 2,3,4,5,6,7,8,9,11 — memorize and save time" },
  ],
  hi: [
    { topic: "ज्यामिति (त्रिभुज और वृत्त)", repeat: "95%", tip: "Tier 2 में 9-15 प्रश्न — मूल प्रमेय + निर्देशांक ज्यामिति ज़रूर पढ़ें" },
    { topic: "आंकड़ा निर्वचन", repeat: "95%", tip: "बैंकिंग में 15-20 अंक — तालिका, बार ग्राफ, पाई चार्ट सब अभ्यास करें" },
    { topic: "प्रतिशत", repeat: "92%", tip: "सारे विषयों की जड़ है — प्रतिशत सूत्र: (भाग/पूर्ण) × 100" },
    { topic: "लाभ और हानि", repeat: "90%", tip: "SP = CP × (100 + P%)/100 — यह सूत्र याद करें, 30 सेकंड में हल होगा" },
    { topic: "समय और काम", repeat: "88%", tip: "LCM विधि — कुल काम = दिनों का LCM। हर दिन का काम = कुल/दिन" },
    { topic: "त्रिकोणमिति", repeat: "88%", tip: "sin²θ + cos²θ = 1 और 1 + tan²θ = sec²θ — ये 2 सूत्र 80% हल करते हैं" },
    { topic: "अनुपात और समानुपात", repeat: "85%", tip: "यदि a:b = c:d तो ad = bc — क्रॉस गुणन ट्रिक याद करें" },
    { topic: "संख्या पद्धति", repeat: "82%", tip: "विभाज्यता नियम — 2,3,4,5,6,7,8,9,11 — याद करें और समय बचाएं" },
  ]
};

const sampleQuestions = {
  percentage: [
    {
      id: 1,
      question: "A's salary is 20% more than B's salary. By what percentage is B's salary less than A's salary?",
      options: ["20%", "16.67%", "25%", "15%"],
      correct: 1,
      explanation_en: "When A is 20% more than B, B is less than A by:\nFormula: x/(100+x) × 100% = 20/120 × 100 = 16.67%",
      explanation_hi: "जब A, B से 20% ज़्यादा है:\nसूत्र: x/(100+x) × 100% = 20/120 × 100 = 16.67%\nयाद रखें: x% ज़्यादा → x/(100+x) × 100% कम",
      trick_en: "💡 Formula: x% more → x/(100+x) × 100% less. 20% more → 16.67% less",
      trick_hi: "💡 सूत्र: x% ज़्यादा → x/(100+x) × 100% कम। 20% ज़्यादा → 16.67% कम"
    },
  ],
  di: [
    {
      id: 2,
      question: "Company A sold 240 units and Company B sold 180 units. What is the ratio of A to B?",
      options: ["3:4", "4:3", "3:2", "2:3"],
      correct: 1,
      explanation_en: "240:180 = 4:3\nSimplify: divide both by 60 → 4:3",
      explanation_hi: "240:180 = 4:3\nसरल करें: दोनों को 60 से भाग दें → 4:3",
      trick_en: "💡 DI Tip: Always simplify ratios by finding HCF first",
      trick_hi: "💡 DI टिप: HCF निकालकर अनुपात को पहले सरल करें"
    },
  ],
};

export default function MathsAI() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lang, setLang] = useState("en");
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
  const [dbQuestions, setDbQuestions] = useState([]);

  const c = content[lang];
  const arithmeticTopics = arithmeticTopicsData[lang];
  const advancedTopics = advancedTopicsData[lang];
  const mostImportant = mostImportantData[lang];
  const allTopics = [...arithmeticTopicsData.en, ...advancedTopicsData.en];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/questions?exam=' + encodeURIComponent(selectedExam) + '&topic=Quantitative Aptitude&limit=20');
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setDbQuestions(data.questions.map(q => ({
          id: q.id,
          question: q.question,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          correct: ['a','b','c','d'].indexOf(q.correct_answer?.toLowerCase()),
          explanation_en: q.explanation || 'Check the correct answer above.',
          explanation_hi: q.explanation || 'ऊपर सही उत्तर देखें।',
          trick_en: '💡 Practice more to master this topic.',
          trick_hi: '💡 इस विषय में महारत के लिए और अभ्यास करें।'
        })));
      }
    } catch (e) { console.error(e); }
  };

  const getAIExplanation = async (question) => {
    setLoadingAI(true);
    setAiExplanation("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: lang === 'hi'
            ? `आप SSC/बैंकिंग परीक्षा के लिए एक विशेषज्ञ गणित शिक्षक हैं। इस प्रश्न को शुद्ध हिंदी (देवनागरी लिपि) में समझाएं:\n\nप्रश्न: ${question}\n\n1. सूत्र/नियम (शुद्ध हिंदी में)\n2. चरण-दर-चरण हल (शुद्ध हिंदी में)\n3. शॉर्टकट ट्रिक (शुद्ध हिंदी में)\n4. इसी तरह के प्रश्नों में कैसे लागू करें\n\nशुद्ध देवनागरी हिंदी में उत्तर दें।`
            : `You are an expert Maths teacher for SSC/Banking exam aspirants. Explain this question clearly:\n\nQuestion: ${question}\n\n1. Formula/Rule\n2. Step-by-step solution\n3. Shortcut trick\n4. How to apply in similar questions\n\nKeep it clear and practical.`,
          history: [],
          preferredLanguage: lang === 'hi' ? "Hindi" : "English",
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
      setAiExplanation(lang === 'hi' ? "कुछ गलत हो गया। दोबारा try करें।" : "Something went wrong. Please try again.");
    }
    setLoadingAI(false);
  };

  const questions = dbQuestions.length > 0 ? dbQuestions : (selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.percentage) : sampleQuestions.percentage);
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
          <p style={{ color: '#0f766e', fontSize: '18px', fontWeight: 'bold' }}>{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0fdf4', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #0f766e, #14b8a6)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>📗 {c.title}</h1>
            <p style={{ color: '#99f6e4', fontSize: '12px', margin: '2px 0 0 0' }}>{c.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
              <button onClick={() => setLang('en')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#0f766e' : 'white' }}>
                English
              </button>
              <button onClick={() => setLang('hi')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#0f766e' : 'white' }}>
                हिंदी
              </button>
            </div>
            <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back</a>
          </div>
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

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: `🏠 ${c.dashboard}` },
          { id: 'topics', label: `📖 ${c.topics}` },
          { id: 'pyq', label: `📅 ${c.pyq}` },
          { id: 'important', label: `🔥 ${c.important}` },
          { id: 'mock', label: `📝 ${c.mock}` },
          { id: 'progress', label: `📊 ${c.progress}` },
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
                { value: '5,000', label: c.totalQ, color: '#0f766e' },
                { value: '20', label: c.yearsQ, color: '#7c3aed' },
                { value: '200+', label: c.mostImp, color: '#dc2626' },
                { value: '14', label: c.topicsCount, color: '#16a34a' },
                { value: '0', label: c.attempted, color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 {c.arithmetic}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {arithmeticTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>

              <h2 style={{ color: '#dc2626', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🧠 {c.advanced}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {advancedTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(); }}
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
                <h2 style={{ color: '#0f766e', margin: '0 0 12px 0', fontSize: '16px' }}>{lang === 'hi' ? 'अंकगणित विषय' : 'Arithmetic Topics'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {arithmeticTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(); }}
                      style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{topic.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: topic.color, fontWeight: '800', fontSize: '14px', margin: '0 0 2px 0' }}>{topic.name}</p>
                        <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>{topic.count} Qs • {topic.repeat}% {c.repeatLabel}</p>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '4px' }}>
                          <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '16px' }}>{lang === 'hi' ? 'उच्च गणित विषय' : 'Advanced Topics'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {advancedTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(); }}
                      style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '28px' }}>{topic.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: topic.color, fontWeight: '800', fontSize: '14px', margin: '0 0 2px 0' }}>{topic.name}</p>
                        <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>{topic.count} Qs • {topic.repeat}% {c.repeatLabel}</p>
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
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); setDbQuestions([]); }}
                  style={{ backgroundColor: 'white', border: '2px solid #0f766e', color: '#0f766e', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  {c.backToTopics}
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#0f766e', fontSize: '16px', margin: 0 }}>
                      {allTopics.find(t => t.id === selectedTopic)?.icon} {lang === 'hi' ? advancedTopicsData.hi.find(t => t.id === selectedTopic)?.name || arithmeticTopicsData.hi.find(t => t.id === selectedTopic)?.name : allTopics.find(t => t.id === selectedTopic)?.name}
                    </h2>
                    <span style={{ color: '#64748b', fontSize: '13px' }}>{lang === 'hi' ? 'प्रश्न' : 'Q'} {currentQuestion + 1}/{questions.length}</span>
                  </div>

                  <p style={{ color: '#1e293b', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>{currentQ?.question}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    {currentQ?.options?.map((option, i) => (
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
                      <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #bbf7d0' }}>
                        <p style={{ color: '#166534', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 {c.explanation}</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>
                          {lang === 'hi' ? currentQ?.explanation_hi : currentQ?.explanation_en}
                        </p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>
                          {lang === 'hi' ? currentQ?.trick_hi : currentQ?.trick_en}
                        </p>
                      </div>

                      <button onClick={() => getAIExplanation(currentQ.question)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#7c3aed', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? c.aiThinking : c.aiBtn}
                      </button>

                      {aiExplanation && (
                        <div style={{ backgroundColor: '#f5f3ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #ddd6fe' }}>
                          <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI</p>
                          <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8' }}>
                            {aiExplanation.split('\n').map((line, i) => {
                              const cleaned = line.replace(/##\s*/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
                              if (!cleaned.trim()) return <br key={i} />;
                              const isHeading = line.startsWith('##') || line.startsWith('#');
                              return <p key={i} style={{ margin: isHeading ? '12px 0 4px 0' : '2px 0', fontWeight: isHeading ? '800' : 'normal', color: isHeading ? '#0f766e' : '#1e293b' }}>{cleaned}</p>;
                            })}
                          </div>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#0f766e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
                          {c.nextQ}
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
            <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 {c.impTitle} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>{c.impDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#0f766e', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <p style={{ color: '#0f766e', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} {c.repeatLabel}</span>
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
            <h2 style={{ color: '#0f766e', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 {c.mock} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>{lang === 'hi' ? '25 प्रश्न • 30 मिनट • हर उत्तर के बाद शॉर्टकट' : '25 Questions • 30 Minutes • Shortcut after each answer'}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { en: 'Arithmetic', hi: 'अंकगणित', count: 15, color: '#0f766e' },
                { en: 'Advanced Maths', hi: 'उच्च गणित', count: 7, color: '#7c3aed' },
                { en: 'Data Interpretation', hi: 'आंकड़ा निर्वचन', count: 3, color: '#dc2626' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{lang === 'hi' ? s.hi : s.en}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.count} {lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('percentage'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(); }}
              style={{ width: '100%', backgroundColor: '#0f766e', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              {c.startMock}
            </button>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 {c.pyqTitle} — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#0f766e' : '#e2e8f0', backgroundColor: selectedYear === year ? '#0f766e' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#0f766e', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} {lang === 'hi' ? 'गणित PYQ' : 'Maths PYQ'} — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('percentage'); setActiveTab('topics'); fetchQuestions(); }}
                style={{ backgroundColor: '#0f766e', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {c.startPYQ}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0f766e', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 {c.progress}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: lang === 'hi' ? 'प्रयास किए' : 'Attempted', value: score, color: '#0f766e' },
                { label: lang === 'hi' ? 'सही उत्तर' : 'Correct', value: score, color: '#16a34a' },
                { label: lang === 'hi' ? 'सटीकता' : 'Accuracy', value: score > 0 ? '100%' : '0%', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('topics')}
              style={{ width: '100%', backgroundColor: '#0f766e', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              {c.startPractice}
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