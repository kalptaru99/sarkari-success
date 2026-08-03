"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const content = {
  en: {
    title: "Sarkari Reasoning AI — Complete Logical Reasoning",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Verbal & Non-Verbal",
    dashboard: "Dashboard", topics: "Topics", pyq: "20 Years PYQ",
    important: "Most Important", mock: "Mock Test", progress: "My Progress",
    verbal: "Verbal Reasoning Topics (70% weightage in SSC/Banking)",
    nonverbal: "Non-Verbal & Advanced Topics",
    totalQ: "Total Questions", yearsQ: "Years PYQ", mostImp: "Most Important",
    topicsCount: "Topics", attempted: "Attempted",
    startPractice: "Start Practicing →", backToTopics: "← Back to Topics",
    explanation: "Explanation", aiBtn: "🤖 Get AI Explanation",
    aiThinking: "🤖 AI is thinking...", nextQ: "Next Question →",
    startMock: "🚀 Start Reasoning Mock Test", repeatLabel: "repeat",
    practiceBtn: "Practice", impTitle: "Most Important Topics",
    impDesc: "AI analysis of 20 years papers — these topics appear 80%+ every year",
    pyqTitle: "Previous Year Questions", startPYQ: "Start PYQ Practice →",
  },
  hi: {
    title: "सरकारी तर्कशक्ति AI — संपूर्ण तार्किक तर्कशक्ति",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • रेलवे • बैंकिंग — मौखिक और अमौखिक",
    dashboard: "डैशबोर्ड", topics: "विषय", pyq: "20 साल के प्रश्न",
    important: "सबसे महत्वपूर्ण", mock: "मॉक टेस्ट", progress: "मेरी प्रगति",
    verbal: "मौखिक तर्कशक्ति विषय (SSC/बैंकिंग में 70% वेटेज)",
    nonverbal: "अमौखिक और उन्नत विषय",
    totalQ: "कुल प्रश्न", yearsQ: "साल के प्रश्न", mostImp: "सबसे महत्वपूर्ण",
    topicsCount: "विषय", attempted: "प्रयास किए",
    startPractice: "अभ्यास शुरू करें →", backToTopics: "← विषयों पर वापस जाएं",
    explanation: "हिंदी में स्पष्टीकरण", aiBtn: "🤖 AI से समझें",
    aiThinking: "🤖 AI सोच रहा है...", nextQ: "अगला प्रश्न →",
    startMock: "🚀 तर्कशक्ति मॉक टेस्ट शुरू करें", repeatLabel: "बार आया",
    practiceBtn: "अभ्यास करें", impTitle: "सबसे महत्वपूर्ण विषय",
    impDesc: "20 साल के पेपर का AI विश्लेषण — ये विषय हर साल 80%+ आते हैं",
    pyqTitle: "पिछले साल के प्रश्न", startPYQ: "PYQ अभ्यास शुरू करें →",
  }
};

const verbalTopicsData = {
  en: [
    { id: "analogy", name: "Analogy", icon: "🔗", count: "450", repeat: 92, color: "#7c3aed" },
    { id: "blood", name: "Blood Relation", icon: "👨‍👩‍👧", count: "380", repeat: 88, color: "#dc2626" },
    { id: "syllogism", name: "Syllogism", icon: "🔄", count: "500", repeat: 90, color: "#0891b2" },
    { id: "coding", name: "Coding-Decoding", icon: "🔐", count: "420", repeat: 88, color: "#ca8a04" },
    { id: "direction", name: "Direction Sense", icon: "🧭", count: "300", repeat: 82, color: "#16a34a" },
    { id: "puzzle", name: "Puzzle & Seating", icon: "🧩", count: "1,030", repeat: 95, color: "#7c3aed" },
    { id: "inequality", name: "Inequality", icon: "⚖️", count: "290", repeat: 85, color: "#dc2626" },
    { id: "series", name: "Series (Number/Letter)", icon: "📊", count: "530", repeat: 90, color: "#0891b2" },
  ],
  hi: [
    { id: "analogy", name: "सादृश्यता", icon: "🔗", count: "450", repeat: 92, color: "#7c3aed" },
    { id: "blood", name: "रक्त संबंध", icon: "👨‍👩‍👧", count: "380", repeat: 88, color: "#dc2626" },
    { id: "syllogism", name: "न्यायवाक्य", icon: "🔄", count: "500", repeat: 90, color: "#0891b2" },
    { id: "coding", name: "कूट-लेखन", icon: "🔐", count: "420", repeat: 88, color: "#ca8a04" },
    { id: "direction", name: "दिशा बोध", icon: "🧭", count: "300", repeat: 82, color: "#16a34a" },
    { id: "puzzle", name: "पहेली और बैठक व्यवस्था", icon: "🧩", count: "1,030", repeat: 95, color: "#7c3aed" },
    { id: "inequality", name: "असमानता", icon: "⚖️", count: "290", repeat: 85, color: "#dc2626" },
    { id: "series", name: "श्रृंखला (संख्या/अक्षर)", icon: "📊", count: "530", repeat: 90, color: "#0891b2" },
  ]
};

const nonVerbalTopicsData = {
  en: [
    { id: "nonverbal", name: "Non-Verbal (Mirror/Image)", icon: "🪞", count: "350", repeat: 78, color: "#ca8a04" },
    { id: "classification", name: "Classification", icon: "🎯", count: "250", repeat: 82, color: "#16a34a" },
    { id: "statement", name: "Statement & Assumption", icon: "💭", count: "300", repeat: 80, color: "#7c3aed" },
    { id: "calendar", name: "Calendar & Clock", icon: "📅", count: "200", repeat: 75, color: "#dc2626" },
  ],
  hi: [
    { id: "nonverbal", name: "अमौखिक (दर्पण/छवि)", icon: "🪞", count: "350", repeat: 78, color: "#ca8a04" },
    { id: "classification", name: "वर्गीकरण", icon: "🎯", count: "250", repeat: 82, color: "#16a34a" },
    { id: "statement", name: "कथन और मान्यता", icon: "💭", count: "300", repeat: 80, color: "#7c3aed" },
    { id: "calendar", name: "कैलेंडर और घड़ी", icon: "📅", count: "200", repeat: 75, color: "#dc2626" },
  ]
};

const mostImportantData = {
  en: [
    { topic: "Puzzle & Seating Arrangement", repeat: "95%", tip: "Banking has 10-15 marks — Row, Circle, Floor puzzles practice separately" },
    { topic: "Syllogism", repeat: "90%", tip: "Use Venn Diagram method — draw each statement as a circle" },
    { topic: "Series (Number/Letter)", repeat: "90%", tip: "Difference pattern, ×2, ÷2, Prime numbers — memorize 5 patterns" },
    { topic: "Analogy", repeat: "88%", tip: "Word:Meaning, Part:Whole, Tool:Function — identify the relationship first" },
    { topic: "Coding-Decoding", repeat: "88%", tip: "Letter shifting (+1,-1,+2,-2) and Number coding — practice both types" },
    { topic: "Blood Relation", repeat: "85%", tip: "Draw family tree — never solve mentally, always draw diagram" },
    { topic: "Inequality", repeat: "82%", tip: "A>B≥C → A>C ✓ A≥C ✗ — memorize chain comparison rules" },
    { topic: "Direction Sense", repeat: "80%", tip: "Always assume North is up — draw compass diagram for every question" },
  ],
  hi: [
    { topic: "पहेली और बैठक व्यवस्था", repeat: "95%", tip: "बैंकिंग में 10-15 अंक — पंक्ति, वृत्त, तल की पहेलियाँ अलग-अलग अभ्यास करें" },
    { topic: "न्यायवाक्य", repeat: "90%", tip: "वेन आरेख विधि उपयोग करें — प्रत्येक कथन को वृत्त में बनाएं" },
    { topic: "श्रृंखला (संख्या/अक्षर)", repeat: "90%", tip: "अंतर पैटर्न, ×2, ÷2, अभाज्य संख्याएं — 5 पैटर्न याद करें" },
    { topic: "सादृश्यता", repeat: "88%", tip: "शब्द:अर्थ, भाग:पूर्ण, औजार:कार्य — पहले संबंध पहचानें" },
    { topic: "कूट-लेखन", repeat: "88%", tip: "अक्षर स्थानांतरण (+1,-1,+2,-2) और संख्या कोडिंग — दोनों प्रकार अभ्यास करें" },
    { topic: "रक्त संबंध", repeat: "85%", tip: "पारिवारिक वृक्ष बनाएं — कभी मानसिक रूप से मत सोचें, हमेशा आरेख बनाएं" },
    { topic: "असमानता", repeat: "82%", tip: "A>B≥C → A>C ✓ A≥C ✗ — श्रृंखला तुलना नियम याद करें" },
    { topic: "दिशा बोध", repeat: "80%", tip: "हमेशा उत्तर को ऊपर मानें — हर प्रश्न के लिए दिशा-सूचक यंत्र आरेख बनाएं" },
  ]
};

const sampleQuestions = {
  analogy: [
    {
      id: 1,
      question: "Book : Library :: Painting : ?",
      options: ["Artist", "Gallery", "Museum", "Canvas"],
      correct: 1,
      explanation_en: "Book is kept in Library — relationship is Object:Place where it is kept.\nSimilarly Painting is displayed/kept in Gallery.\nMuseum has historical items, Gallery specifically has paintings/art.",
      explanation_hi: "पुस्तक को पुस्तकालय में रखा जाता है — संबंध है वस्तु:स्थान जहाँ रखी जाती है।\nइसी तरह चित्रकारी को दीर्घा में प्रदर्शित/रखा जाता है।\nसंग्रहालय में ऐतिहासिक वस्तुएं होती हैं, दीर्घा में विशेष रूप से चित्र होते हैं।",
      trick_en: "💡 Analogy Trick: Identify relationship first — Object:Place, Worker:Tool, Part:Whole, Cause:Effect",
      trick_hi: "💡 सादृश्यता ट्रिक: पहले संबंध पहचानें — वस्तु:स्थान, कार्यकर्ता:औजार, भाग:पूर्ण, कारण:प्रभाव"
    },
  ],
  syllogism: [
    {
      id: 2,
      question: "All cats are dogs. All dogs are animals. Conclusion: All cats are animals. Is this:",
      options: ["True", "False", "Uncertain", "Partially True"],
      correct: 0,
      explanation_en: "Venn Diagram method:\n• Circle 1 (Cats) is inside Circle 2 (Dogs)\n• Circle 2 (Dogs) is inside Circle 3 (Animals)\n• Therefore Circle 1 (Cats) is also inside Circle 3 (Animals)\n• Result: All cats ARE animals ✓ TRUE",
      explanation_hi: "वेन आरेख विधि:\n• वृत्त 1 (बिल्लियाँ) वृत्त 2 (कुत्ते) के अंदर है\n• वृत्त 2 (कुत्ते) वृत्त 3 (जानवर) के अंदर है\n• इसलिए वृत्त 1 (बिल्लियाँ) भी वृत्त 3 (जानवर) के अंदर है\n• परिणाम: सभी बिल्लियाँ जानवर हैं ✓ सत्य",
      trick_en: "💡 Rule: All A are B + All B are C → All A are C (always true)",
      trick_hi: "💡 नियम: सभी A, B हैं + सभी B, C हैं → सभी A, C हैं (हमेशा सत्य)"
    },
  ],
};

export default function ReasoningAI() {
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
  const verbalTopics = verbalTopicsData[lang];
  const nonVerbalTopics = nonVerbalTopicsData[lang];
  const mostImportant = mostImportantData[lang];
  const allTopicsEn = [...verbalTopicsData.en, ...nonVerbalTopicsData.en];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const fetchQuestions = async (chapterName) => {
    try {
      const chapterMap = {
        analogy: 'Analogy', blood: 'Blood Relation', syllogism: 'Syllogism',
        coding: 'Coding-Decoding', direction: 'Direction Sense', puzzle: 'Puzzle & Seating',
        inequality: 'Inequality', series: 'Series', nonverbal: 'Non-Verbal',
        classification: 'Classification', statement: 'Statement & Assumption', calendar: 'Calendar & Clock'
      };
      const chapter = chapterMap[chapterName] || chapterName;
      const res = await fetch('/api/questions?exam=' + encodeURIComponent(selectedExam) + '&topic=General Intelligence&chapter=' + encodeURIComponent(chapter) + '&limit=20');
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
            ? `आप SSC/बैंकिंग परीक्षा के लिए एक विशेषज्ञ तर्कशक्ति शिक्षक हैं। इस प्रश्न को शुद्ध हिंदी (देवनागरी लिपि) में समझाएं:\n\nप्रश्न: ${question}\n\n1. विधि/नियम (शुद्ध हिंदी में)\n2. चरण-दर-चरण हल (शुद्ध हिंदी में)\n3. शॉर्टकट ट्रिक (शुद्ध हिंदी में)\n4. सामान्य गलतियाँ जो बचनी चाहिए\n\nशुद्ध देवनागरी हिंदी में उत्तर दें।`
            : `You are an expert Reasoning teacher for SSC/Banking exam aspirants. Explain this question clearly:\n\nQuestion: ${question}\n\n1. Method/Rule\n2. Step-by-step solution\n3. Shortcut trick\n4. Common mistakes to avoid\n\nKeep it clear and practical.`,
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

  const questions = dbQuestions.length > 0 ? dbQuestions : (selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.analogy) : sampleQuestions.analogy);
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
          <p style={{ color: '#7c3aed', fontSize: '18px', fontWeight: 'bold' }}>{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#faf5ff', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>🧩 {c.title}</h1>
            <p style={{ color: '#e9d5ff', fontSize: '12px', margin: '2px 0 0 0' }}>{c.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
              <button onClick={() => setLang('en')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#7c3aed' : 'white' }}>
                English
              </button>
              <button onClick={() => setLang('hi')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#7c3aed' : 'white' }}>
                हिंदी
              </button>
            </div>
            <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back</a>
          </div>
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
          { id: 'dashboard', label: `🏠 ${c.dashboard}` },
          { id: 'topics', label: `📖 ${c.topics}` },
          { id: 'pyq', label: `📅 ${c.pyq}` },
          { id: 'important', label: `🔥 ${c.important}` },
          { id: 'mock', label: `📝 ${c.mock}` },
          { id: 'progress', label: `📊 ${c.progress}` },
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
                { value: '5,000', label: c.totalQ, color: '#7c3aed' },
                { value: '20', label: c.yearsQ, color: '#dc2626' },
                { value: '200+', label: c.mostImp, color: '#ca8a04' },
                { value: '12', label: c.topicsCount, color: '#16a34a' },
                { value: '0', label: c.attempted, color: '#0891b2' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 {c.verbal}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {verbalTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>

              <h2 style={{ color: '#dc2626', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🧠 {c.nonverbal}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {nonVerbalTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
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
                <h2 style={{ color: '#7c3aed', margin: '0 0 12px 0', fontSize: '16px' }}>{lang === 'hi' ? 'मौखिक तर्कशक्ति' : 'Verbal Reasoning'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {verbalTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
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
                <h2 style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '16px' }}>{lang === 'hi' ? 'अमौखिक विषय' : 'Non-Verbal Topics'}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {nonVerbalTopics.map(topic => (
                    <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
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
                  style={{ backgroundColor: 'white', border: '2px solid #7c3aed', color: '#7c3aed', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  {c.backToTopics}
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: 0 }}>
                      {allTopicsEn.find(t => t.id === selectedTopic)?.icon} {lang === 'hi' ? ([...verbalTopicsData.hi, ...nonVerbalTopicsData.hi].find(t => t.id === selectedTopic)?.name) : allTopicsEn.find(t => t.id === selectedTopic)?.name}
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
                      <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #e9d5ff' }}>
                        <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 {c.explanation}</p>
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
                        <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #e9d5ff' }}>
                          <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI</p>
                          <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8' }}>
                            {aiExplanation.split('\n').map((line, i) => {
                              const cleaned = line.replace(/##\s*/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
                              if (!cleaned.trim()) return <br key={i} />;
                              const isHeading = line.startsWith('##') || line.startsWith('#');
                              return <p key={i} style={{ margin: isHeading ? '12px 0 4px 0' : '2px 0', fontWeight: isHeading ? '800' : 'normal', color: isHeading ? '#7c3aed' : '#1e293b' }}>{cleaned}</p>;
                            })}
                          </div>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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
            <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 {c.impTitle} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>{c.impDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px' }}>
                  <div style={{ backgroundColor: '#7c3aed', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ color: '#7c3aed', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#f5f3ff', color: '#7c3aed', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} {c.repeatLabel}</span>
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
            <h2 style={{ color: '#7c3aed', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 {c.mock} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>{lang === 'hi' ? '25 प्रश्न • 20 मिनट • हिंदी स्पष्टीकरण' : '25 Questions • 20 Minutes • Hindi Explanation'}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { en: 'Verbal Reasoning', hi: 'मौखिक तर्कशक्ति', count: 18, color: '#7c3aed' },
                { en: 'Non-Verbal', hi: 'अमौखिक', count: 5, color: '#dc2626' },
                { en: 'Advanced', hi: 'उन्नत', count: 2, color: '#ca8a04' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{lang === 'hi' ? s.hi : s.en}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.count} {lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('analogy'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
              style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              {c.startMock}
            </button>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#7c3aed', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 {c.pyqTitle} — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#7c3aed' : '#e2e8f0', backgroundColor: selectedYear === year ? '#7c3aed' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#faf5ff', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} {lang === 'hi' ? 'तर्कशक्ति PYQ' : 'Reasoning PYQ'} — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('analogy'); setActiveTab('topics'); fetchQuestions(topic.id); }}
                style={{ backgroundColor: '#7c3aed', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {c.startPYQ}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#7c3aed', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 {c.progress}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: lang === 'hi' ? 'प्रयास किए' : 'Attempted', value: score, color: '#7c3aed' },
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
              style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              {c.startPractice}
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