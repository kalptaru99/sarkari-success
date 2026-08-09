"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const exams = ["SSC CGL", "IBPS PO", "SSC CHSL", "RRB NTPC", "Bank Clerk", "SSC MTS", "SSC CPO", "SSC GD Constable", "RRB ALP", "RRB Technician", "RRB Group D"];

const content = {
  en: {
    title: "Sarkari GK/GS AI — Complete General Knowledge",
    subtitle: "Current Affairs • Static GK • History • Geography • Polity • Economics • Science",
    dashboard: "Dashboard", current: "Current Affairs", static: "Static GK",
    pyq: "20 Years PYQ", important: "Most Important", mock: "Mock Test",
    totalQ: "Total Questions", yearsQ: "Years PYQ", currentA: "Current Affairs",
    subjects: "Subjects", attempted: "Attempted",
    staticTitle: "Static GK Topics (40-50 marks in SSC)",
    currentTitle: "Today's Current Affairs",
    startPractice: "Start Practicing →", backToTopics: "← Back to Subjects",
    explanation: "Explanation", aiBtn: "🤖 Get AI Explanation",
    aiThinking: "🤖 AI is thinking...", nextQ: "Next Question →",
    startMock: "🚀 Start GK Mock Test", repeatLabel: "repeat",
    impTitle: "Most Important Topics",
    impDesc: "AI analysis of 20 years papers — these topics appear 80%+ every year",
    pyqTitle: "Previous Year Questions", startPYQ: "Start PYQ Practice →",
    viewAll: "View All Current Affairs →",
  },
  hi: {
    title: "सरकारी सामान्य ज्ञान AI — संपूर्ण सामान्य ज्ञान",
    subtitle: "समसामयिकी • स्थैतिक GK • इतिहास • भूगोल • राजव्यवस्था • अर्थशास्त्र • विज्ञान",
    dashboard: "डैशबोर्ड", current: "समसामयिकी", static: "स्थैतिक GK",
    pyq: "20 साल के प्रश्न", important: "सबसे महत्वपूर्ण", mock: "मॉक टेस्ट",
    totalQ: "कुल प्रश्न", yearsQ: "साल के प्रश्न", currentA: "समसामयिकी",
    subjects: "विषय", attempted: "प्रयास किए",
    staticTitle: "स्थैतिक GK विषय (SSC में 40-50 अंक)",
    currentTitle: "आज की समसामयिकी",
    startPractice: "अभ्यास शुरू करें →", backToTopics: "← विषयों पर वापस जाएं",
    explanation: "हिंदी में स्पष्टीकरण", aiBtn: "🤖 AI से समझें",
    aiThinking: "🤖 AI सोच रहा है...", nextQ: "अगला प्रश्न →",
    startMock: "🚀 GK मॉक टेस्ट शुरू करें", repeatLabel: "बार आया",
    impTitle: "सबसे महत्वपूर्ण विषय",
    impDesc: "20 साल के पेपर का AI विश्लेषण — ये विषय हर साल 80%+ आते हैं",
    pyqTitle: "पिछले साल के प्रश्न", startPYQ: "PYQ अभ्यास शुरू करें →",
    viewAll: "सभी समसामयिकी देखें →",
  }
};

const staticTopicsData = {
  en: [
    { id: "history", name: "History", icon: "🏛️", count: "680", repeat: 92, color: "#ca8a04" },
    { id: "geography", name: "Geography", icon: "🗺️", count: "580", repeat: 88, color: "#16a34a" },
    { id: "polity", name: "Polity", icon: "⚖️", count: "620", repeat: 90, color: "#1e3a8a" },
    { id: "economics", name: "Economics", icon: "📈", count: "420", repeat: 85, color: "#dc2626" },
    { id: "science", name: "Science & Tech", icon: "🔬", count: "540", repeat: 87, color: "#7c3aed" },
    { id: "awards", name: "Awards & Honours", icon: "🏆", count: "220", repeat: 80, color: "#ea580c" },
    { id: "books", name: "Books & Authors", icon: "📚", count: "180", repeat: 75, color: "#0891b2" },
    { id: "sports", name: "Sports", icon: "⚽", count: "260", repeat: 78, color: "#16a34a" },
  ],
  hi: [
    { id: "history", name: "इतिहास", icon: "🏛️", count: "680", repeat: 92, color: "#ca8a04" },
    { id: "geography", name: "भूगोल", icon: "🗺️", count: "580", repeat: 88, color: "#16a34a" },
    { id: "polity", name: "राजव्यवस्था", icon: "⚖️", count: "620", repeat: 90, color: "#1e3a8a" },
    { id: "economics", name: "अर्थशास्त्र", icon: "📈", count: "420", repeat: 85, color: "#dc2626" },
    { id: "science", name: "विज्ञान और प्रौद्योगिकी", icon: "🔬", count: "540", repeat: 87, color: "#7c3aed" },
    { id: "awards", name: "पुरस्कार और सम्मान", icon: "🏆", count: "220", repeat: 80, color: "#ea580c" },
    { id: "books", name: "पुस्तकें और लेखक", icon: "📚", count: "180", repeat: 75, color: "#0891b2" },
    { id: "sports", name: "खेल", icon: "⚽", count: "260", repeat: 78, color: "#16a34a" },
  ]
};

const mostImportantData = {
  en: [
    { topic: "Modern Indian History (1857-1947)", repeat: "92%", tip: "Freedom struggle, Gandhi movements, INC sessions — 4-5 questions every exam" },
    { topic: "Indian Polity (Constitution)", repeat: "90%", tip: "Articles 12-35 (Fundamental Rights), 36-51 (DPSP), 52-78 (President/PM) — Most asked" },
    { topic: "Geography (Physical India)", repeat: "88%", tip: "Rivers, Mountains, Climate zones, Soil types — Map-based questions increasing" },
    { topic: "Science (Biology - Human Body)", repeat: "87%", tip: "Vitamins, Diseases, Hormones, Blood groups — SSC guarantees 3-4 questions" },
    { topic: "Economics (Basic Terms)", repeat: "85%", tip: "GDP, Inflation, RBI functions, Budget terms — Banking exams give 5-8 marks" },
    { topic: "Current Affairs (Last 6 months)", repeat: "85%", tip: "Government schemes, Appointments, Awards, Sports — read 10 min daily" },
    { topic: "Awards (National + International)", repeat: "80%", tip: "Bharat Ratna, Padma Awards, Nobel, Oscar — maintain updated list" },
    { topic: "Static GK (First/Largest/Longest)", repeat: "78%", tip: "Capitals, Currencies, National Symbols — make one master list" },
  ],
  hi: [
    { topic: "आधुनिक भारतीय इतिहास (1857-1947)", repeat: "92%", tip: "स्वतंत्रता संग्राम, गांधी आंदोलन, INC अधिवेशन — हर परीक्षा में 4-5 प्रश्न" },
    { topic: "भारतीय राजव्यवस्था (संविधान)", repeat: "90%", tip: "अनुच्छेद 12-35 (मूल अधिकार), 36-51 (DPSP), 52-78 (राष्ट्रपति/PM) — सबसे ज़्यादा पूछे जाते हैं" },
    { topic: "भूगोल (भौतिक भारत)", repeat: "88%", tip: "नदियाँ, पर्वत, जलवायु क्षेत्र, मिट्टी के प्रकार — मानचित्र आधारित प्रश्न बढ़ रहे हैं" },
    { topic: "विज्ञान (जीव विज्ञान - मानव शरीर)", repeat: "87%", tip: "विटामिन, रोग, हार्मोन, रक्त समूह — SSC में 3-4 प्रश्न निश्चित" },
    { topic: "अर्थशास्त्र (मूल शब्द)", repeat: "85%", tip: "GDP, मुद्रास्फीति, RBI कार्य, बजट शब्द — बैंकिंग परीक्षाओं में 5-8 अंक" },
    { topic: "समसामयिकी (अंतिम 6 महीने)", repeat: "85%", tip: "सरकारी योजनाएं, नियुक्तियां, पुरस्कार, खेल — रोज़ 10 मिनट पढ़ें" },
    { topic: "पुरस्कार (राष्ट्रीय + अंतर्राष्ट्रीय)", repeat: "80%", tip: "भारत रत्न, पद्म पुरस्कार, नोबेल, ऑस्कर — अद्यतन सूची बनाएं" },
    { topic: "स्थैतिक GK (पहला/सबसे बड़ा/सबसे लंबा)", repeat: "78%", tip: "राजधानियाँ, मुद्राएं, राष्ट्रीय प्रतीक — एक मास्टर सूची बनाएं" },
  ]
};

const currentAffairsData = {
  en: [
    { date: "29", month: "Jul", day: "Tue", title: "India successfully launches Chandrayaan-4 mission; ISRO confirms lunar landing scheduled for August 15", tags: ["Science & Tech", "National", "Important"] },
    { date: "28", month: "Jul", day: "Mon", title: "RBI keeps repo rate unchanged at 6.5%; GDP growth forecast revised to 7.2%", tags: ["Banking", "Economy", "Important"] },
    { date: "27", month: "Jul", day: "Sun", title: "UPSC declares Civil Services 2025 final results", tags: ["Exam", "Polity"] },
    { date: "26", month: "Jul", day: "Sat", title: "India wins Gold in Badminton at World Championships 2026", tags: ["Sports", "International"] },
    { date: "25", month: "Jul", day: "Fri", title: "Parliament passes Digital India Act 2026; focuses on AI regulation and data privacy", tags: ["Polity", "Science & Tech", "Important"] },
  ],
  hi: [
    { date: "29", month: "जुल", day: "मंगल", title: "भारत ने चंद्रयान-4 मिशन सफलतापूर्वक लॉन्च किया; ISRO ने 15 अगस्त को चंद्र लैंडिंग की पुष्टि की", tags: ["विज्ञान", "राष्ट्रीय", "महत्वपूर्ण"] },
    { date: "28", month: "जुल", day: "सोम", title: "RBI ने रेपो दर 6.5% पर अपरिवर्तित रखी; GDP वृद्धि पूर्वानुमान 7.2% पर संशोधित", tags: ["बैंकिंग", "अर्थव्यवस्था", "महत्वपूर्ण"] },
    { date: "27", month: "जुल", day: "रवि", title: "UPSC ने सिविल सेवा 2025 के अंतिम परिणाम घोषित किए", tags: ["परीक्षा", "राजव्यवस्था"] },
    { date: "26", month: "जुल", day: "शनि", title: "भारत ने विश्व बैडमिंटन चैंपियनशिप 2026 में स्वर्ण पदक जीता", tags: ["खेल", "अंतर्राष्ट्रीय"] },
    { date: "25", month: "जुल", day: "शुक्र", title: "संसद ने डिजिटल इंडिया अधिनियम 2026 पारित किया; AI विनियमन और डेटा गोपनीयता पर ध्यान", tags: ["राजव्यवस्था", "विज्ञान", "महत्वपूर्ण"] },
  ]
};

const sampleQuestions = {
  history: [
    {
      id: 1,
      question: "The Indian National Congress was founded in 1885 by:",
      options: ["Mahatma Gandhi", "A.O. Hume", "Bal Gangadhar Tilak", "Gopal Krishna Gokhale"],
      correct: 1,
      explanation_en: "Indian National Congress was founded by A.O. Hume (Allan Octavian Hume) on 28 December 1885 in Bombay.\nFirst President: W.C. Bonnerjee\nA.O. Hume was a British Civil Servant working in India",
      explanation_hi: "भारतीय राष्ट्रीय कांग्रेस की स्थापना A.O. Hume (Allan Octavian Hume) ने 28 दिसंबर 1885 को बॉम्बे में की थी।\nपहले अध्यक्ष: W.C. Bonnerjee\nA.O. Hume भारत में कार्यरत एक ब्रिटिश नागरिक सेवक थे",
      trick_en: "💡 Trick: INC = 1885, Hume founded it, Bombay — '1885 Hume Bombay INC'",
      trick_hi: "💡 ट्रिक: INC = 1885, Hume ने बनाई, बॉम्बे में — '1885 Hume बॉम्बे INC'"
    },
  ],
  polity: [
    {
      id: 2,
      question: "Which Article of the Indian Constitution abolishes untouchability?",
      options: ["Article 14", "Article 17", "Article 21", "Article 25"],
      correct: 1,
      explanation_en: "Article 17 abolishes untouchability and makes its practice in any form a punishable offence.\nRemember: Article 14=Equality, 15=No discrimination, 16=Equal opportunity, 17=Untouchability abolished, 18=Titles abolished",
      explanation_hi: "अनुच्छेद 17 छुआछूत को समाप्त करता है और किसी भी रूप में इसका पालन करना दंडनीय अपराध है।\nयाद रखें: अनुच्छेद 14=समानता, 15=भेदभाव नहीं, 16=समान अवसर, 17=छुआछूत समाप्त, 18=उपाधियाँ समाप्त",
      trick_en: "💡 Trick: 14,15,16,17,18 = Equality Articles. 17 = Untouchability abolished",
      trick_hi: "💡 ट्रिक: 14,15,16,17,18 = समानता अनुच्छेद। 17 = छुआछूत समाप्त"
    },
  ],
};

export default function GKAI() {
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
  const staticTopics = staticTopicsData[lang];
  const mostImportant = mostImportantData[lang];
  const currentAffairs = currentAffairsData[lang];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const fetchQuestions = async (chapterName) => {
    try {
      const chapterMap = {
        history: 'History', geography: 'Geography', polity: 'Polity',
        economics: 'Economics', science: 'Science & Tech', awards: 'Awards & Honours',
        books: 'Books & Authors', sports: 'Sports'
      };
      const chapter = chapterMap[chapterName] || chapterName;
      const res = await fetch('/api/questions?exam=' + encodeURIComponent(selectedExam) + '&topic=General Awareness&chapter=' + encodeURIComponent(chapter) + '&limit=50');
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
            ? `आप SSC/बैंकिंग परीक्षा के लिए एक विशेषज्ञ सामान्य ज्ञान शिक्षक हैं। इस प्रश्न को शुद्ध हिंदी (देवनागरी लिपि) में समझाएं:\n\nप्रश्न: ${question}\n\n1. पूर्ण स्पष्टीकरण (शुद्ध हिंदी में)\n2. संबंधित तथ्य जो परीक्षा में आ सकते हैं\n3. याद करने की युक्ति (शुद्ध हिंदी में)\n4. इसी विषय से और प्रश्न\n\nशुद्ध देवनागरी हिंदी में उत्तर दें।`
            : `You are an expert GK teacher for SSC/Banking exam aspirants. Explain this question clearly:\n\nQuestion: ${question}\n\n1. Complete explanation with context\n2. Related facts that may appear in exams\n3. Memory trick\n4. Similar questions from this topic\n\nKeep it clear and practical. Respond in pure English only. No Hindi or Hinglish words whatsoever.`,
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

  const questions = dbQuestions.length > 0 ? dbQuestions : (selectedTopic ? (sampleQuestions[selectedTopic] || sampleQuestions.history) : sampleQuestions.history);
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
          <p style={{ color: '#ea580c', fontSize: '18px', fontWeight: 'bold' }}>{lang === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fff7ed', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>🌍 {c.title}</h1>
            <p style={{ color: '#fed7aa', fontSize: '12px', margin: '2px 0 0 0' }}>{c.subtitle}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
              <button onClick={() => setLang('en')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#ea580c' : 'white' }}>
                English
              </button>
              <button onClick={() => setLang('hi')}
                style={{ padding: '5px 14px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#ea580c' : 'white' }}>
                हिंदी
              </button>
            </div>
            <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back</a>
          </div>
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
          { id: 'dashboard', label: `🏠 ${c.dashboard}` },
          { id: 'current', label: `📰 ${c.current}` },
          { id: 'static', label: `📚 ${c.static}` },
          { id: 'pyq', label: `📅 ${c.pyq}` },
          { id: 'important', label: `🔥 ${c.important}` },
          { id: 'mock', label: `📝 ${c.mock}` },
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
                { value: '5,000', label: c.totalQ, color: '#ea580c' },
                { value: '20', label: c.yearsQ, color: '#7c3aed' },
                { value: '1,500+', label: c.currentA, color: '#dc2626' },
                { value: '8', label: c.subjects, color: '#16a34a' },
                { value: '0', label: c.attempted, color: '#0891b2' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📚 {c.staticTitle}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {staticTopics.map(topic => (
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setActiveTab('static'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '14px', cursor: 'pointer', border: `1px solid ${topic.color}30`, textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{topic.icon}</div>
                    <p style={{ color: topic.color, fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{topic.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>{topic.count} Qs</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📰 {c.currentTitle} (July 2026)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentAffairs.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                    <div style={{ textAlign: 'center', flexShrink: 0 }}>
                      <div style={{ backgroundColor: '#ea580c', color: 'white', borderRadius: '6px', padding: '4px 8px', fontSize: '16px', fontWeight: '800' }}>{item.date}</div>
                      <div style={{ color: '#ea580c', fontSize: '10px', fontWeight: '600' }}>{item.month}</div>
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
                {c.viewAll}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'current' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📰 {c.current} — July 2026</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentAffairs.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                  <div style={{ textAlign: 'center', flexShrink: 0, width: '50px' }}>
                    <div style={{ backgroundColor: '#ea580c', color: 'white', borderRadius: '8px', padding: '6px', fontSize: '18px', fontWeight: '800' }}>{item.date}</div>
                    <div style={{ color: '#64748b', fontSize: '10px', marginTop: '2px' }}>{item.day}</div>
                    <div style={{ color: '#ea580c', fontSize: '10px', fontWeight: '600' }}>{item.month}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1e293b', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0', lineHeight: '1.5' }}>{item.title}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.tags.map((tag, j) => (
                        <span key={j} style={{ backgroundColor: '#fed7aa', color: '#ea580c', padding: '2px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{tag}</span>
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
                  <div key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions(topic.id); }}
                    style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: `2px solid ${topic.color}20`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '32px' }}>{topic.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: topic.color, fontWeight: '800', fontSize: '15px', margin: '0 0 2px 0' }}>{topic.name}</p>
                      <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 6px 0' }}>{topic.count} Qs • {topic.repeat}% {c.repeatLabel}</p>
                      <div style={{ backgroundColor: '#f1f5f9', borderRadius: '4px', height: '4px' }}>
                        <div style={{ backgroundColor: topic.color, height: '100%', width: topic.repeat + '%', borderRadius: '4px' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => { setSelectedTopic(null); setSelectedAnswer(null); setShowExplanation(false); setAiExplanation(""); setDbQuestions([]); }}
                  style={{ backgroundColor: 'white', border: '2px solid #ea580c', color: '#ea580c', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                  {c.backToTopics}
                </button>
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ color: '#ea580c', fontSize: '16px', margin: 0 }}>
                      {staticTopics.find(t => t.id === selectedTopic)?.icon} {staticTopics.find(t => t.id === selectedTopic)?.name}
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
                      <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fed7aa' }}>
                        <p style={{ color: '#ea580c', fontWeight: '700', fontSize: '13px', margin: '0 0 6px 0' }}>📚 {c.explanation}</p>
                        <p style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.7', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>
                          {lang === 'hi' ? currentQ?.explanation_hi : currentQ?.explanation_en}
                        </p>
                        <p style={{ color: '#ca8a04', fontSize: '13px', margin: 0, fontWeight: '600' }}>
                          {lang === 'hi' ? currentQ?.trick_hi : currentQ?.trick_en}
                        </p>
                      </div>
                      <button onClick={() => getAIExplanation(currentQ.question)}
                        disabled={loadingAI}
                        style={{ backgroundColor: '#ea580c', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', opacity: loadingAI ? 0.7 : 1 }}>
                        {loadingAI ? c.aiThinking : c.aiBtn}
                      </button>
                      {aiExplanation && (
                        <div style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', marginBottom: '16px', border: '1px solid #fed7aa' }}>
                          <p style={{ color: '#ea580c', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>🤖 AI</p>
                          <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8' }}>
                            {aiExplanation.split('\n').map((line, i) => {
                              const cleaned = line.replace(/##\s*/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
                              if (!cleaned.trim()) return <br key={i} />;
                              const isHeading = line.startsWith('##') || line.startsWith('#');
                              return <p key={i} style={{ margin: isHeading ? '12px 0 4px 0' : '2px 0', fontWeight: isHeading ? '800' : 'normal', color: isHeading ? '#ea580c' : '#1e293b' }}>{cleaned}</p>;
                            })}
                          </div>
                        </div>
                      )}
                      {currentQuestion < questions.length - 1 && (
                        <button onClick={nextQuestion}
                          style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
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
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 4px 0', fontWeight: '800' }}>🔥 {c.impTitle} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>{c.impDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mostImportant.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#fff7ed', borderRadius: '10px', padding: '16px', border: '1px solid #fed7aa', display: 'flex', gap: '14px' }}>
                  <div style={{ backgroundColor: '#ea580c', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '800', flexShrink: 0 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <p style={{ color: '#ea580c', fontWeight: '800', fontSize: '14px', margin: 0 }}>{item.topic}</p>
                      <span style={{ backgroundColor: '#fed7aa', color: '#ea580c', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>{item.repeat} {c.repeatLabel}</span>
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
            <h2 style={{ color: '#ea580c', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📅 {c.pyqTitle} — {selectedExam}</h2>
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
              <button onClick={() => { setSelectedTopic('history'); setActiveTab('static'); fetchQuestions('history'); }}
                style={{ backgroundColor: '#ea580c', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                {c.startPYQ}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'mock' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#ea580c', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800' }}>📝 {c.mock} — {selectedExam}</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 20px 0' }}>{lang === 'hi' ? '25 प्रश्न • 15 मिनट • हिंदी स्पष्टीकरण' : '25 Questions • 15 Minutes • Hindi Explanation'}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
              {[
                { en: 'Static GK', hi: 'स्थैतिक GK', count: 15, color: '#ea580c' },
                { en: 'Current Affairs', hi: 'समसामयिकी', count: 7, color: '#7c3aed' },
                { en: 'Science & Tech', hi: 'विज्ञान और प्रौद्योगिकी', count: 3, color: '#16a34a' },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: '#fff7ed', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <p style={{ color: s.color, fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{lang === 'hi' ? s.hi : s.en}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{s.count} {lang === 'hi' ? 'प्रश्न' : 'Questions'}</p>
                </div>
              ))}
            </div>
            <button onClick={() => { setSelectedTopic('history'); setActiveTab('static'); setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); fetchQuestions('history'); }}
              style={{ width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
              {c.startMock}
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