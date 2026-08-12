"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ToppersPlan() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [lang, setLang] = useState('en');

  const plans = {
    monthly: { label: 'Monthly', price: '₹99', period: 'per month', total: '₹99', savings: '', badge: '' },
    biannual: { label: '6 Months', price: '₹50', period: 'per month', total: '₹299 for 6 months', savings: 'Save ₹295', badge: 'Most Popular' },
    annual: { label: 'Annual', price: '₹42', period: 'per month', total: '₹499 per year', savings: 'Save ₹689', badge: 'Best Value' },
  };

  const content = {
    en: {
      hero_badge: '👑 LIMITED TIME — Starting at ₹42/month',
      hero_title: "India's Most Powerful AI Exam Preparation Plan",
      hero_sub: '20+ AI Features • 25,000+ Questions • Hindi & English • 11 Exams',
      hero_tag: '⚡ Everything other platforms cannot give — all here',
      hero_btn: 'See What You Get →',
      prob_title: 'Are You Facing These Problems?',
      prob_sub: 'Millions of aspirants fail because of these problems — Topper\'s Plan solves them all',
      feat_title: 'What\'s Inside Topper\'s Plan?',
      feat_sub: '20+ AI Features that no other government exam platform offers',
      feat_subject: '📚 Subject AI Pages — 25,000+ Questions',
      feat_subject_sub: 'Pure Hindi or English — you choose. AI explanation + shortcuts for every topic',
      why_title: 'Why Topper\'s Plan is Different from Others?',
      price_title: 'Choose Your Plan',
      price_sub: 'Coaching center charges ₹5,000/month. We charge ₹42/month — you decide',
      get_label: 'You selected',
      what_get: '✅ What you get:',
      buy_btn: '👑 Get Topper\'s Plan',
      secure: '🔒 Secure payment via Razorpay • Instant access after payment',
      faq_title: 'Frequently Asked Questions',
      bottom_title: 'Start Your Journey to Selection Today',
      bottom_sub: 'Thousands of aspirants are using AI to crack government exams',
      bottom_btn: '👑 Get Topper\'s Plan — Starting ₹42/month',
      problems: [
        { emoji: '😰', problem: 'Studying 8-10 hours daily but still not getting selected', solution: 'AI tells you exactly what to study — no more wasted hours on wrong topics' },
        { emoji: '📉', problem: 'Mock test scores are stuck and you don\'t know why', solution: 'AI finds your exact weak areas and gives you a daily improvement plan' },
        { emoji: '🤯', problem: 'Syllabus is huge — you don\'t know what to skip', solution: 'Exam Intelligence Report shows exactly which topics appear every year' },
        { emoji: '😓', problem: 'Forgetting what you studied last week', solution: 'AI Smart Revision uses spaced repetition so you never forget again' },
        { emoji: '🌐', problem: 'English explanations are hard to understand', solution: 'Everything explained in pure Hindi or English — you choose' },
      ],
      why: [
        { emoji: '🤖', title: 'AI-Powered', desc: 'Not just content — AI analyzes your performance and tells you exactly what to do' },
        { emoji: '🗣️', title: 'Hindi & English', desc: 'Pure Hindi or Pure English — entire platform available in both languages' },
        { emoji: '📊', title: '25,000+ Questions', desc: 'SSC, Railway, UPSC, Banking — chapter-wise questions for all exams' },
        { emoji: '🏛️', title: '24 States', desc: 'Central + State govt jobs — everything in one place, updated daily' },
        { emoji: '💰', title: 'Only ₹42/month', desc: 'Coaching center charges ₹5,000/month — we charge ₹42/month' },
        { emoji: '⚡', title: 'Instant Access', desc: 'Immediate access after payment — no waiting, no delay' },
      ],
      faqs: [
        { q: 'Which exams are supported?', a: 'SSC CGL, CHSL, GD, MTS, CPO, RRB NTPC, Group D, ALP, UPSC, IBPS PO, Clerk, SBI PO, BPSC, UPPSC, TNPSC, Kerala PSC and 20+ more exams.' },
        { q: 'Is there a free trial?', a: 'Yes — job notifications, results, admit cards, SarkariGPT (limited) and mock tests are completely free. Topper\'s Plan unlocks all AI features.' },
        { q: 'Can I cancel anytime?', a: 'Yes. You can cancel at any time. Access continues until the end of the billing period. No refund as per our refund policy.' },
        { q: 'Which languages are supported?', a: 'Hindi, English, Tamil, Telugu, Malayalam, Kannada, Marathi, Bengali, Gujarati, Odia, Punjabi, Assamese — 12 languages.' },
        { q: 'Does it work on mobile?', a: 'Yes — the website works perfectly on mobile, tablet and desktop.' },
      ],
      getlist: ['20+ AI Features', '25,000+ Chapter-wise Questions', 'Hindi & English toggle', '11 Exams covered', '24 States job notifications', 'Unlimited SarkariGPT'],
    },
    hi: {
      hero_badge: '👑 सीमित समय — केवल ₹42/महीना',
      hero_title: 'भारत का सबसे शक्तिशाली AI परीक्षा तैयारी प्लान',
      hero_sub: '20+ AI सुविधाएं • 25,000+ प्रश्न • हिंदी और अंग्रेज़ी • 11 परीक्षाएं',
      hero_tag: '⚡ जो दूसरे platforms नहीं दे सकते — वो सब यहाँ है',
      hero_btn: 'देखें क्या मिलेगा →',
      prob_title: 'क्या आप भी इन समस्याओं से जूझ रहे हैं?',
      prob_sub: 'लाखों aspirants इन्हीं समस्याओं की वजह से fail होते हैं — Topper\'s Plan इन्हें solve करता है',
      feat_title: 'Topper\'s Plan में क्या मिलेगा?',
      feat_sub: '20+ AI सुविधाएं जो कोई दूसरा सरकारी परीक्षा platform नहीं देता',
      feat_subject: '📚 विषय AI पृष्ठ — 25,000+ प्रश्न',
      feat_subject_sub: 'शुद्ध हिंदी या अंग्रेज़ी — आप चुनें। हर topic के लिए AI स्पष्टीकरण + shortcuts',
      why_title: 'Topper\'s Plan दूसरों से अलग क्यों है?',
      price_title: 'अपना Plan चुनें',
      price_sub: 'Coaching center ₹5,000/महीना लेता है। हम ₹42/महीना लेते हैं — फैसला आपका',
      get_label: 'आपने चुना',
      what_get: '✅ आपको क्या मिलेगा:',
      buy_btn: '👑 Topper\'s Plan लें',
      secure: '🔒 Razorpay द्वारा सुरक्षित भुगतान • तुरंत access',
      faq_title: 'अक्सर पूछे जाने वाले प्रश्न',
      bottom_title: 'आज ही शुरू करें — Selection तक का सफर',
      bottom_sub: 'हजारों aspirants AI की मदद से सरकारी परीक्षाएं crack कर रहे हैं',
      bottom_btn: '👑 Topper\'s Plan लें — केवल ₹42/महीना',
      problems: [
        { emoji: '😰', problem: 'रोज़ 8-10 घंटे पढ़ते हैं लेकिन selection नहीं हो रहा', solution: 'AI बताता है कि क्या पढ़ना है — गलत topics पर समय बर्बाद नहीं' },
        { emoji: '📉', problem: 'Mock test scores stuck हैं और कारण नहीं पता', solution: 'AI आपकी exact कमज़ोरियां ढूंढता है और daily improvement plan देता है' },
        { emoji: '🤯', problem: 'Syllabus बहुत बड़ा है — क्या skip करें नहीं पता', solution: 'Exam Intelligence Report बताता है कि कौन से topics हर साल आते हैं' },
        { emoji: '😓', problem: 'पिछले हफ्ते जो पढ़ा वो भूल गए', solution: 'AI Smart Revision spaced repetition use करता है — भूलने की समस्या खत्म' },
        { emoji: '🌐', problem: 'अंग्रेज़ी में explanation समझ नहीं आती', solution: 'सब कुछ शुद्ध हिंदी या अंग्रेज़ी में — आप choose करें' },
      ],
      why: [
        { emoji: '🤖', title: 'AI-Powered', desc: 'सिर्फ content नहीं — AI performance analyze करता है और बताता है क्या करना है' },
        { emoji: '🗣️', title: 'हिंदी और अंग्रेज़ी', desc: 'शुद्ध हिंदी या शुद्ध अंग्रेज़ी — पूरा platform दोनों में available' },
        { emoji: '📊', title: '25,000+ प्रश्न', desc: 'SSC, Railway, UPSC, Banking — सभी exams के लिए chapter-wise प्रश्न' },
        { emoji: '🏛️', title: '24 राज्य', desc: 'Central + State सरकारी नौकरियां — एक जगह, daily update' },
        { emoji: '💰', title: 'सिर्फ ₹42/महीना', desc: 'Coaching center ₹5,000/महीना लेता है — हम ₹42/महीना लेते हैं' },
        { emoji: '⚡', title: 'तुरंत Access', desc: 'Payment के बाद तुरंत access — कोई wait नहीं' },
      ],
      faqs: [
        { q: 'कौन सी परीक्षाएं support होती हैं?', a: 'SSC CGL, CHSL, GD, MTS, CPO, RRB NTPC, Group D, ALP, UPSC, IBPS PO, Clerk, SBI PO, BPSC, UPPSC, TNPSC, Kerala PSC और 20+ और परीक्षाएं।' },
        { q: 'क्या free trial है?', a: 'हाँ — job notifications, results, admit cards, SarkariGPT (limited) और mock tests बिल्कुल free हैं। Topper\'s Plan सभी AI features unlock करता है।' },
        { q: 'क्या cancel कर सकते हैं?', a: 'हाँ। आप कभी भी cancel कर सकते हैं। Access billing period के end तक रहेगा। Refund policy के अनुसार refund नहीं होगा।' },
        { q: 'कौन सी languages support हैं?', a: 'हिंदी, अंग्रेज़ी, तमिल, तेलुगु, मलयालम, कन्नड़, मराठी, बंगाली, गुजराती, ओड़िया, पंजाबी, असमिया — 12 languages।' },
        { q: 'क्या mobile पर काम करेगा?', a: 'हाँ — website mobile, tablet और desktop सभी पर perfectly काम करती है।' },
      ],
      getlist: ['20+ AI सुविधाएं', '25,000+ Chapter-wise प्रश्न', 'हिंदी और अंग्रेज़ी toggle', '11 परीक्षाएं covered', '24 राज्यों की job notifications', 'Unlimited SarkariGPT'],
    }
  };


  const c = content[lang];

  const features = [
    { emoji: '📘', title: 'English AI', desc: lang === 'en' ? '6,000+ Questions — Error Detection, Vocabulary, RC, Cloze Test with Hindi explanation' : '6,000+ प्रश्न — Error Detection, Vocabulary, RC, Cloze Test हिंदी explanation के साथ', href: '/english-ai', color: '#1e3a8a' },
    { emoji: '📗', title: 'Maths AI', desc: lang === 'en' ? '6,000+ Questions — Percentage, Profit/Loss, Geometry, DI with Hindi shortcuts' : '6,000+ प्रश्न — Percentage, Profit/Loss, Geometry, DI हिंदी shortcuts के साथ', href: '/maths-ai', color: '#0f766e' },
    { emoji: '🧩', title: 'Reasoning AI', desc: lang === 'en' ? '6,000+ Questions — Analogy, Syllogism, Puzzle, Coding with Hindi tricks' : '6,000+ प्रश्न — Analogy, Syllogism, Puzzle, Coding हिंदी tricks के साथ', href: '/reasoning-ai', color: '#7c3aed' },
    { emoji: '🌍', title: 'GK/GS AI', desc: lang === 'en' ? '6,000+ Questions — History, Polity, Geography, Science with AI explanation' : '6,000+ प्रश्न — History, Polity, Geography, Science AI explanation के साथ', href: '/gk-ai', color: '#ea580c' },
    { emoji: '✍️', title: 'Descriptive AI', desc: lang === 'en' ? 'Essay + Letter Writing with AI Evaluation — SSC CGL Tier 3 pattern' : 'Essay + Letter Writing AI Evaluation के साथ — SSC CGL Tier 3 pattern', href: '/descriptive-ai', color: '#0e7490' },
    { emoji: '📅', title: lang === 'en' ? 'AI Daily Mission' : 'AI दैनिक मिशन', desc: lang === 'en' ? 'Personalized 4-5 study tasks every morning based on your weak topics' : 'हर सुबह आपकी कमज़ोरियों के आधार पर 4-5 personalized study tasks', href: '/mission', color: '#dc2626' },
    { emoji: '🎯', title: lang === 'en' ? 'AI Selection Coach' : 'AI Selection Coach', desc: lang === 'en' ? 'Finds the exact 20% weaknesses causing 80% of your lost marks' : 'वो exact 20% कमज़ोरियां ढूंढता है जो 80% marks खा जाती हैं', href: '/coach', color: '#ca8a04' },
    { emoji: '🧠', title: lang === 'en' ? 'AI Smart Revision' : 'AI Smart Revision', desc: lang === 'en' ? '7-day revision plan using spaced repetition — AI decides what to revise' : '7-दिन का revision plan spaced repetition से — AI decide करता है क्या revise करें', href: '/revision', color: '#16a34a' },
    { emoji: '📚', title: lang === 'en' ? 'AI Learning Hub' : 'AI Learning Hub', desc: lang === 'en' ? 'Subject-wise AI mentors for your target exam in your preferred language' : 'आपकी target exam के लिए subject-wise AI mentors आपकी भाषा में', href: '/learning-hub', color: '#db2777' },
    { emoji: '📈', title: lang === 'en' ? 'AI Rank Predictor' : 'AI Rank Predictor', desc: lang === 'en' ? 'See exactly how many marks you need to improve to reach the cutoff' : 'देखें cutoff तक पहुंचने के लिए कितने marks सुधारने हैं', href: '/rank-predictor', color: '#0891b2' },
    { emoji: '🧬', title: lang === 'en' ? 'AI Selection DNA' : 'AI Selection DNA', desc: lang === 'en' ? 'Your unique preparation fingerprint — speed, accuracy, consistency score' : 'आपका unique preparation fingerprint — speed, accuracy, consistency score', href: '/selection-dna', color: '#7c3aed' },
    { emoji: '📊', title: lang === 'en' ? 'Exam Intelligence Report' : 'Exam Intelligence Report', desc: lang === 'en' ? '10-year question analysis — topic weightage, cutoff trends and 6-month roadmap' : '10 साल का question analysis — topic weightage, cutoff trends और 6-month roadmap', href: '/exam-guide', color: '#1e3a8a' },
    { emoji: '🤖', title: lang === 'en' ? 'Unlimited SarkariGPT' : 'Unlimited SarkariGPT', desc: lang === 'en' ? 'Unlimited AI career guidance in Hindi, English and 10 more languages' : 'Hindi, English और 10 और languages में unlimited AI career guidance', href: '/sarkarigpt', color: '#dc2626' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success</span></h1>
        </a>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
            <button onClick={() => setLang('en')} style={{ padding: '4px 12px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#1e3a8a' : 'white' }}>English</button>
            <button onClick={() => setLang('hi')} style={{ padding: '4px 12px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#1e3a8a' : 'white' }}>हिंदी</button>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
          <span style={{ color: '#fde68a', fontSize: '13px', fontWeight: '700' }}>{c.hero_badge}</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: '1.2' }}>{c.hero_title}</h1>
        <p style={{ color: '#bfdbfe', fontSize: '18px', margin: '0 0 8px 0' }}>{c.hero_sub}</p>
        <p style={{ color: '#fde68a', fontSize: '14px', margin: '0 0 32px 0', fontWeight: '700' }}>{c.hero_tag}</p>
        <a href="#features" style={{ backgroundColor: '#fca5a5', color: '#1e3a8a', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: '900', display: 'inline-block' }}>
          {c.hero_btn}
        </a>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* Problems */}
        <div style={{ padding: '50px 0 20px 0', textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0' }}>{c.prob_title}</h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0' }}>{c.prob_sub}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.problems.map((item, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'flex-start', textAlign: 'left', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '32px', flexShrink: 0 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#dc2626', fontWeight: '700', fontSize: '15px', margin: '0 0 6px 0' }}>❌ {item.problem}</p>
                  <p style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px', margin: 0 }}>✅ {item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{ padding: '40px 0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', textAlign: 'center' }}>{c.feat_title}</h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0', textAlign: 'center' }}>{c.feat_sub}</p>

          <div style={{ backgroundColor: '#eff6ff', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '2px solid #bfdbfe' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>{c.feat_subject}</h3>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>{c.feat_subject_sub}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {features.slice(0, 5).map((f, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '14px', border: `1px solid ${f.color}30`, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{f.emoji}</span>
                  <div>
                    <p style={{ color: f.color, fontWeight: '800', fontSize: '13px', margin: '0 0 2px 0' }}>{f.title}</p>
                    <p style={{ color: '#64748b', fontSize: '11px', margin: 0, lineHeight: '1.4' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {features.slice(5).map((f, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', alignItems: 'flex-start', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{f.emoji}</span>
                <div>
                  <p style={{ color: f.color, fontWeight: '800', fontSize: '13px', margin: '0 0 2px 0' }}>{f.title}</p>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: 0, lineHeight: '1.4' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Us */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '32px', marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', margin: '0 0 24px 0' }}>{c.why_title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {c.why.map((item, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.emoji}</div>
                <p style={{ color: 'white', fontWeight: '700', fontSize: '13px', margin: '0 0 4px 0' }}>{item.title}</p>
                <p style={{ color: '#bfdbfe', fontSize: '11px', margin: 0, lineHeight: '1.4' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', textAlign: 'center' }}>{c.price_title}</h2>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px 0', textAlign: 'center' }}>{c.price_sub}</p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'center' }}>
            {Object.entries(plans).map(([key, plan]) => (
              <button key={key} onClick={() => setSelectedPlan(key)}
                style={{ position: 'relative', padding: '16px 24px', borderRadius: '12px', border: '2px solid', cursor: 'pointer', textAlign: 'center', minWidth: '160px',
                  borderColor: selectedPlan === key ? '#1e3a8a' : '#e2e8f0',
                  backgroundColor: selectedPlan === key ? '#1e3a8a' : 'white',
                  color: selectedPlan === key ? 'white' : '#1e293b' }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#dc2626', color: 'white', padding: '2px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                    {plan.badge}
                  </div>
                )}
                <p style={{ fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{plan.label}</p>
                <p style={{ fontWeight: '900', fontSize: '24px', margin: '0 0 2px 0' }}>{plan.price}</p>
                <p style={{ fontSize: '11px', margin: '0 0 4px 0', opacity: 0.8 }}>{plan.period}</p>
                {plan.savings && <p style={{ color: selectedPlan === key ? '#fde68a' : '#16a34a', fontSize: '11px', fontWeight: '700', margin: 0 }}>{plan.savings}</p>}
              </button>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '2px solid #1e3a8a', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 4px 0' }}>{c.get_label}</p>
            <p style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '32px', margin: '0 0 4px 0' }}>{plans[selectedPlan].total}</p>
            {plans[selectedPlan].savings && <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', margin: '0 0 16px 0' }}>🎉 {plans[selectedPlan].savings}</p>}

            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>{c.what_get}</p>
              {c.getlist.map((item, i) => (
                <p key={i} style={{ color: '#1e293b', fontSize: '13px', margin: '0 0 4px 0' }}>✓ {item}</p>
              ))}
            </div>

            <button onClick={() => session ? alert('Razorpay coming soon!') : router.push('/login')}
              style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', marginBottom: '12px' }}>
              {c.buy_btn} — {plans[selectedPlan].total}
            </button>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{c.secure}</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '900', margin: '0 0 24px 0', textAlign: 'center' }}>{c.faq_title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.faqs.map((item, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: '0 0 6px 0' }}>Q: {item.q}</p>
                <p style={{ color: '#64748b', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{c.bottom_title}</h2>
        <p style={{ color: '#bfdbfe', fontSize: '15px', margin: '0 0 24px 0' }}>{c.bottom_sub}</p>
        <a href="#pricing" style={{ backgroundColor: '#fca5a5', color: '#1e3a8a', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: '900', display: 'inline-block', marginBottom: '12px' }}>
          {c.bottom_btn}
        </a>
        <p style={{ color: '#93c5fd', fontSize: '12px', margin: 0 }}>{c.secure}</p>
      </div>

      <footer style={{ backgroundColor: '#0f172a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}