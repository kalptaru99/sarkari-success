"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk"];

const content = {
  en: {
    title: "Sarkari Exam English AI",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • Railway • Banking — Complete English Section",
    dashboard: "Dashboard", topics: "Topics", pyq: "20 Years PYQ",
    important: "Most Important", mock: "Mock Test", progress: "My Progress",
    quickStart: "Quick Start — What to Study Today?",
    continueLeft: "Continue Where You Left",
    totalQ: "Total Questions", yearsQ: "Years PYQ", mostImp: "Most Important",
    topicsCount: "Topics", attempted: "Attempted",
    startPractice: "Start Practicing →", resume: "Resume →",
    backToTopics: "← Back to Topics",
    hindiExpl: "Explanation",
    aiBtn: "🤖 Get AI Explanation",
    aiThinking: "🤖 AI is thinking...",
    nextQ: "Next Question →",
    startMock: "🚀 Start Mock Test",
    mockTitle: "English Mock Test",
    mockDesc: "25 Questions • 20 Minutes • Explanation after each answer",
    impTitle: "Most Important Topics",
    impDesc: "AI analysis of 20 years papers — these topics appear 80%+ every year",
    repeatLabel: "repeat",
    practiceBtn: "Practice",
    pyqTitle: "Previous Year Questions",
    startPYQ: "Start PYQ Practice →",
  },
  hi: {
    title: "सरकारी परीक्षा अंग्रेज़ी AI",
    subtitle: "SSC CGL • IBPS PO/Clerk • SSC CHSL • रेलवे • बैंकिंग — संपूर्ण अंग्रेज़ी खंड",
    dashboard: "डैशबोर्ड", topics: "विषय", pyq: "20 साल के प्रश्न",
    important: "सबसे महत्वपूर्ण", mock: "मॉक टेस्ट", progress: "मेरी प्रगति",
    quickStart: "त्वरित शुरुआत — आज क्या पढ़ें?",
    continueLeft: "जहाँ छोड़ा था वहाँ से जारी रखें",
    totalQ: "कुल प्रश्न", yearsQ: "साल के प्रश्न", mostImp: "सबसे महत्वपूर्ण",
    topicsCount: "विषय", attempted: "प्रयास किए",
    startPractice: "अभ्यास शुरू करें →", resume: "जारी रखें →",
    backToTopics: "← विषयों पर वापस जाएं",
    hindiExpl: "हिंदी में स्पष्टीकरण",
    aiBtn: "🤖 AI से विस्तार में समझें",
    aiThinking: "🤖 AI सोच रहा है...",
    nextQ: "अगला प्रश्न →",
    startMock: "🚀 मॉक टेस्ट शुरू करें",
    mockTitle: "अंग्रेज़ी मॉक टेस्ट",
    mockDesc: "25 प्रश्न • 20 मिनट • हर उत्तर के बाद स्पष्टीकरण",
    impTitle: "सबसे महत्वपूर्ण विषय",
    impDesc: "20 साल के पेपर का AI विश्लेषण — ये विषय हर साल 80%+ आते हैं",
    repeatLabel: "बार आया",
    practiceBtn: "अभ्यास करें",
    pyqTitle: "पिछले साल के प्रश्न",
    startPYQ: "PYQ अभ्यास शुरू करें →",
  }
};

const topicsData = {
  en: [
    { id: "rc", name: "Reading Comprehension", icon: "📖", count: "1430", repeat: 95, color: "#1e3a8a" },
    { id: "error", name: "Error Detection", icon: "🔍", count: "680", repeat: 90, color: "#dc2626" },
    { id: "sentence", name: "Sentence Improvement", icon: "✏️", count: "560", repeat: 85, color: "#7c3aed" },
    { id: "cloze", name: "Cloze Test", icon: "📝", count: "420", repeat: 88, color: "#0891b2" },
    { id: "jumbles", name: "Para Jumbles", icon: "🔀", count: "340", repeat: 82, color: "#ca8a04" },
    { id: "vocab", name: "Vocabulary", icon: "📚", count: "890", repeat: 92, color: "#16a34a" },
    { id: "idioms", name: "Idioms & Phrases", icon: "💬", count: "290", repeat: 78, color: "#db2777" },
    { id: "spelling", name: "Spelling Error", icon: "🔤", count: "390", repeat: 75, color: "#ea580c" },
  ],
  hi: [
    { id: "rc", name: "पठन बोध", icon: "📖", count: "1,430", repeat: 95, color: "#1e3a8a" },
    { id: "error", name: "त्रुटि पहचान", icon: "🔍", count: "680", repeat: 90, color: "#dc2626" },
    { id: "sentence", name: "वाक्य सुधार", icon: "✏️", count: "560", repeat: 85, color: "#7c3aed" },
    { id: "cloze", name: "रिक्त स्थान", icon: "📝", count: "420", repeat: 88, color: "#0891b2" },
    { id: "jumbles", name: "वाक्य क्रम", icon: "🔀", count: "340", repeat: 82, color: "#ca8a04" },
    { id: "vocab", name: "शब्द भंडार", icon: "📚", count: "890", repeat: 92, color: "#16a34a" },
    { id: "idioms", name: "मुहावरे और वाक्यांश", icon: "💬", count: "290", repeat: 78, color: "#db2777" },
    { id: "spelling", name: "वर्तनी त्रुटि", icon: "🔤", count: "390", repeat: 75, color: "#ea580c" },
  ]
};

const mostImportantData = {
  en: [
    { topic: "Subject-Verb Agreement", repeat: "95%", tip: "3-4 questions every year — Singular subject needs singular verb" },
    { topic: "Active-Passive Voice", repeat: "92%", tip: "Remember tense change rules — Present/Past/Future all have different rules" },
    { topic: "Reading Comprehension", repeat: "95%", tip: "Read questions first then passage — saves time" },
    { topic: "Vocabulary (Synonyms/Antonyms)", repeat: "90%", tip: "Learn root words — one root helps remember 10 words" },
    { topic: "Cloze Test", repeat: "88%", tip: "Answer comes from context — understand the whole paragraph" },
    { topic: "Para Jumbles", repeat: "82%", tip: "Identify Opening and Closing sentences first" },
    { topic: "Error Spotting", repeat: "90%", tip: "Articles (a/an/the) and Prepositions have most errors" },
    { topic: "One Word Substitution", repeat: "78%", tip: "Memorize top 200 OWS — SSC repeats them" },
  ],
  hi: [
    { topic: "कर्ता-क्रिया सहमति", repeat: "95%", tip: "हर साल 3-4 प्रश्न आते हैं — एकवचन कर्ता के साथ एकवचन क्रिया" },
    { topic: "सक्रिय-निष्क्रिय वाच्य", repeat: "92%", tip: "काल परिवर्तन के नियम याद करें — वर्तमान/भूत/भविष्य सब अलग" },
    { topic: "पठन बोध", repeat: "95%", tip: "पहले प्रश्न पढ़ें फिर गद्यांश — समय बचेगा" },
    { topic: "शब्द भंडार (पर्यायवाची/विलोम)", repeat: "90%", tip: "मूल शब्द सीखें — एक मूल से 10 शब्द याद होंगे" },
    { topic: "रिक्त स्थान परीक्षण", repeat: "88%", tip: "उत्तर संदर्भ से आता है — पूरा अनुच्छेद समझें" },
    { topic: "वाक्य क्रम", repeat: "82%", tip: "पहले प्रारंभिक और अंतिम वाक्य पहचानें" },
    { topic: "त्रुटि पहचान", repeat: "90%", tip: "लेख (a/an/the) और पूर्वसर्ग में सबसे ज़्यादा त्रुटियाँ" },
    { topic: "एक शब्द प्रतिस्थापन", repeat: "78%", tip: "शीर्ष 200 OWS याद करें — SSC में दोहराए जाते हैं" },
  ]
};

const sampleQuestions = {
  error: [
    {
      id: 1,
      question: "Select the part of the sentence that contains an error: 'Each of the boys (A) / were given (B) / a prize (C) / No error (D)'",
      options: ["Each of the boys", "were given", "a prize", "No error"],
      correct: 1,
      explanation_en: "Error is in 'were given'. With 'Each of', always use Singular verb. Correct sentence: 'Each of the boys was given a prize.' Rule: Each/Every/Either/Neither + Singular Verb",
      explanation_hi: "गलती 'were given' में है। 'Each of' के साथ हमेशा एकवचन क्रिया आती है। सही वाक्य: 'Each of the boys was given a prize.' नियम: Each/Every/Either/Neither + एकवचन क्रिया",
      trick_en: "💡 Trick: EACH = one by one → Singular → 'was'",
      trick_hi: "💡 ट्रिक: EACH = एक-एक करके → एकवचन → 'was'"
    },
    {
      id: 2,
      question: "Find the error: 'She don't (A) / know how (B) / to swim (C) / No error (D)'",
      options: ["She don't", "know how", "to swim", "No error"],
      correct: 0,
      explanation_en: "Error is in 'She don't'. With third person singular (She/He/It), use 'doesn't' not 'don't'. Correct: 'She doesn't know how to swim.'",
      explanation_hi: "गलती 'She don't' में है। तृतीय पुरुष एकवचन (She/He/It) के साथ 'doesn't' का प्रयोग होता है, 'don't' का नहीं। सही: 'She doesn't know how to swim.'",
      trick_en: "💡 Rule: She/He/It + doesn't | I/We/They/You + don't",
      trick_hi: "💡 नियम: She/He/It + doesn't | I/We/They/You + don't"
    },
  ],
  vocab: [
    {
      id: 3,
      question: "Choose the word most similar in meaning to 'BENEVOLENT':",
      options: ["Cruel", "Charitable", "Indifferent", "Hostile"],
      correct: 1,
      explanation_en: "'Benevolent' means kind/charitable. Its synonym is 'Charitable'. Memory trick: Bene = Good (Latin) → one who does good → Charitable",
      explanation_hi: "'Benevolent' का अर्थ है 'दयालु/परोपकारी'। इसका समानार्थी है 'Charitable' (दानशील)। याद करने की युक्ति: Bene = अच्छा (लैटिन) → अच्छा काम करने वाला → Charitable",
      trick_en: "💡 Root: BENE = Good. Benefit, Beneficial, Benevolent — all mean good",
      trick_hi: "💡 मूल: BENE = अच्छा। Benefit, Beneficial, Benevolent — सब में 'अच्छा' है"
    },
  ],
};

export default function EnglishAI() {
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
  const topics = topicsData[lang];
  const mostImportant = mostImportantData[lang];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const fetchQuestions = async (chapterName) => {
    try {
      const chapterMap = {
        rc: 'Reading Comprehension', error: 'Error Detection', sentence: 'Sentence Improvement',
        cloze: 'Cloze Test', jumbles: 'Para Jumbles', vocab: 'Vocabulary',
        idioms: 'Idioms & Phrases', spelling: 'Spelling Error'
      };
      const chapter = chapterMap[chapterName] || chapterName;
      const res = await fetch('/api/questions?exam=' + encodeURIComponent(selectedExam) + '&topic=English Language&chapter=' + encodeURIComponent(chapter) + '&limit=20');
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
            ? `आप SSC/बैंकिंग परीक्षा के लिए एक विशेषज्ञ अंग्रेज़ी शिक्षक हैं। इस प्रश्न को शुद्ध हिंदी (देवनागरी लिपि) में समझाएं:\n\nप्रश्न: ${question}\n\n1. नियम (शुद्ध हिंदी में)\n2. शॉर्टकट/ट्रिक (शुद्ध हिंदी में)\n3. इसी तरह के प्रश्नों में यह नियम कैसे लागू होगा\n4. सामान्य गलतियाँ जो बचनी चाहिए\n\nशुद्ध देवनागरी हिंदी में उत्तर दें।`
            : `You are an expert English teacher for SSC/Banking exam aspirants. Explain this question in clear English:\n\nQuestion: ${question}\n\n1. Rule/Grammar concept\n2. Shortcut trick\n3. How to apply in similar questions\n4. Common mistakes to avoid\n\nKeep it clear and practical.`,
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

  const questions = dbQuestions.length > 0 ? dbQuestions : (selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.error) : sampleQuestions.error);
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
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4ff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📘</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>📘 {c.title}</h1>
            <p style={{ color: '#bfdbfe', fontSize: '12px', margin: '2px 0 0 0' }}>{c.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
              <button onClick={() => setLang('en')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#1e3a8a' : 'white' }}>
                English
              </button>
              <button onClick={() => setLang('hi')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#1e3a8a' : 'white' }}>
                हिंदी
              </button>
            </div>
            <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back</a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {exams.map(exam => (
            <button key={exam} onClick={() => setSelectedExam(exam)}
              style={{ padding: '6px 16px', borderRadius: '20px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: selectedExam === exam ? 'white' : 'rgba(255,255,255,0.2)', color: selectedExam === exam ? '#1e3a8a' : 'white' }}>
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
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#1e3a8a' : '#666', borderBottom: activeTab === tab.id ? '3px solid #1e3a8a' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { value: '5,000', label: c.totalQ, color: '#1e3a8a' },
                { value: '20', label: c.yearsQ, color: '#7c3aed' },
                { value: '500+', label: c.mostImp, color: '#dc2626' },
                { value: '8', label: c.topicsCount, color: '#16a34a' },
                { value: '0', label: c.attempted, color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🎯 {c.quickStart}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {topics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 {c.continueLeft}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eff6ff', borderRadius: '8px', padding: '14px 16px' }}>
                <div>
                  <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>
                    {lang === 'hi' ? 'त्रुटि पहचान — कर्ता-क्रिया सहमति' : 'Error Detection — Subject-Verb Agreement'}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 8px 0' }}>
                    {lang === 'hi' ? '12/25 प्रश्न पूरे • सटीकता: 75%' : '12/25 questions done • Accuracy: 75%'}
                  </p>
                  <div style={{ backgroundColor: '#dbeafe', borderRadius: '4px', height: '6px', width: '200px' }}>
                    <div style={{ backgroundColor: '#1e3a8a', height: '100%', width: '48%', borderRadius: '4px' }} />
                  </div>
                </div>
                <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); fetchQuestions(topic.id); }}
                  style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                  {c.resume}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'topics' && (
          <div>
            {!selectedTopic ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {topics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '36px' }}>{topic.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: topic.color, fontWeight: '800', fontSize: '15px', margin: '0 0 4px 0' }}>{topic.name}</p>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 6px 0' }}>{topic.count} {lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '6px', flex: 1 }}>
                          <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                        </div>
                        <span style={{ color: '#dc2626', fontSize: '11px', fontWeight: '700' }}>{topic.repeat}% {c.repeatLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); setDbQuestions([]); }}
                  style={{ backgroundColor: 'white', border: '2px solid #1e3a8a', color: '#1e3a8a', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  {c.backToTopics}
                </button>

                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: 0 }}>
                      {topics.find(t => t.id === selectedTopic)?.icon} {topics.find(t => t.id === selectedTopic)?.name}
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
                      <div style={{ backgroundColor: '#fffbeb', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fde68a' }}>
                        <p style={{ color: '#92400e', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 {c.hindiExpl}</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0' }}>
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
              return <p key={i} style={{ margin: isHeading ? '12px 0 4px 0' : '2px 0', fontWeight: isHeading ? '800' : 'normal', color: isHeading ? '#1e3a8a' : '#1e293b' }}>{cleaned}</p>;
            })}
          </div>
                        </div>
                      )}

                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 {c.impTitle} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>{c.impDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: '#dc2626', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <p style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} {c.repeatLabel}</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>{item.tip}</p>
                  </div>
                  <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', flexShrink: 0 }}>
                    {c.practiceBtn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mock' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 {c.mockTitle} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>{c.mockDesc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { en: 'Error Detection', hi: 'त्रुटि पहचान', count: 5, color: '#dc2626' },
                { en: 'Vocabulary', hi: 'शब्द भंडार', count: 5, color: '#7c3aed' },
                { en: 'Reading Comp.', hi: 'पठन बोध', count: 5, color: '#1e3a8a' },
                { en: 'Cloze Test', hi: 'रिक्त स्थान', count: 5, color: '#0891b2' },
                { en: 'Para Jumbles', hi: 'वाक्य क्रम', count: 3, color: '#ca8a04' },
                { en: 'Idioms', hi: 'मुहावरे', count: 2, color: '#db2777' },
              ].map((section, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', textAlign: 'center', border: `1px solid ${section.color}30` }}>
                  <p style={{ color: section.color, fontWeight: '700', fontSize: '13px', margin: '0 0 4px 0' }}>{lang === 'hi' ? section.hi : section.en}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{section.count} {lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
              style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              {c.startMock} — {selectedExam}
            </button>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 {c.pyqTitle} — {selectedExam}</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"].map(year => (
                <button key={year} onClick={() => setSelectedYear(year)}
                  style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer', borderColor: selectedYear === year ? '#1e3a8a' : '#e2e8f0', backgroundColor: selectedYear === year ? '#1e3a8a' : 'white', color: selectedYear === year ? 'white' : '#64748b' }}>
                  {year}
                </button>
              ))}
            </div>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '16px', margin: '0 0 8px 0' }}>{selectedExam} {lang === 'hi' ? 'अंग्रेज़ी PYQ' : 'English PYQ'} — {selectedYear}</p>
              <button onClick={() => { setSelectedTopic('error'); setActiveTab('topics'); fetchQuestions(topic.id); }}
                style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {c.startPYQ}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 {c.progress}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: lang === 'hi' ? 'प्रयास किए' : 'Attempted', value: score, color: '#1e3a8a' },
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
              style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
              {c.startPractice}
            </button>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}