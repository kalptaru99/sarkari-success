"use client";
import { useState } from "react";

const content = {
  en: {
    back: "← Back to Home",
    badge: "🚨 READ THIS BEFORE YOU STUDY ANOTHER DAY",
    headline1: "ATTENTION ASPIRANTS —",
    headline2: "The Mantra That 90% of Candidates Ignore…Until It's Too Late",
    reality_label: "The Harsh Reality",
    reality_text1: "The Govt. Job system is",
    reality_bold1: "NOT designed to reward hard work.",
    reality_text2: "It rewards",
    reality_bold2: "Strategic Preparation.",
    stat1_val: "2.3 Crore", stat1_label: "Students apply every year",
    stat2_val: "0.8%", stat2_label: "Actually get selected",
    stat3_val: "3-5 Years", stat3_label: "Wasted by the rest",
    reality_end: "The rest waste",
    reality_end_bold: "3 to 5 years",
    reality_end2: "buying books and watching YouTube videos.",
    q_label: "The Big Question",
    q_title: "❓ Why 94% of Govt. Job Aspirants Fail the Exam",
    q_sub: "Even though they study 8 to 10 hours a day.",
    lies_label: "🔴 The Lies That Are Killing Your Dream",
    lie1_title: "# LIE 1: More Hours = More Marks",
    lie1_truth: "TRUTH —",
    lie1_text: "The topper who studies 6 hours beats the one who studies 10 hours. Because the topper knows exactly what to study. You are drowning in irrelevant material and wrong strategy.",
    lie2_title: "# LIE 2: Mock Tests Will Prepare You",
    lie2_truth: "TRUTH —",
    lie2_text: "Blind mock tests without Pattern Analysis and Weakness Diagnosis are like 🔫 Firing in the Dark. You repeat the same mistakes many times and call it practice.",
    join_title: "✅ What Happens When You Join",
    join_items: [
      "Stop fearing the negative marking",
      "Start solving 20% more questions in the same time",
      "You decode the right pattern",
      "You destroy your weaknesses",
      "You know what to study, what to skip and what to practice",
      "One Goal. One System. One Serious Attempt.",
    ],
    cta: "👑 Get Topper's Plan — Starting ₹42/month",
    secure: "🔒 Secure payment via Razorpay • Instant access after payment",
  },
  hi: {
    back: "← होम पर वापस जाएं",
    badge: "🚨 एक और दिन पढ़ने से पहले यह पढ़ें",
    headline1: "ध्यान दें aspirants —",
    headline2: "वो मंत्र जिसे 90% उम्मीदवार नज़रअंदाज़ करते हैं…जब तक बहुत देर हो जाती है",
    reality_label: "कड़वी सच्चाई",
    reality_text1: "सरकारी नौकरी का सिस्टम",
    reality_bold1: "मेहनत को इनाम देने के लिए नहीं बना है।",
    reality_text2: "यह इनाम देता है",
    reality_bold2: "रणनीतिक तैयारी को।",
    stat1_val: "2.3 करोड़", stat1_label: "छात्र हर साल आवेदन करते हैं",
    stat2_val: "0.8%", stat2_label: "वास्तव में चुने जाते हैं",
    stat3_val: "3-5 साल", stat3_label: "बाकी बर्बाद करते हैं",
    reality_end: "बाकी बर्बाद करते हैं",
    reality_end_bold: "3 से 5 साल",
    reality_end2: "किताबें खरीदने और YouTube videos देखने में।",
    q_label: "बड़ा सवाल",
    q_title: "❓ 94% सरकारी नौकरी aspirants परीक्षा में क्यों फेल होते हैं",
    q_sub: "जबकि वो रोज़ 8 से 10 घंटे पढ़ते हैं।",
    lies_label: "🔴 वो झूठ जो आपके सपने को मार रहे हैं",
    lie1_title: "# झूठ 1: ज़्यादा घंटे = ज़्यादा नंबर",
    lie1_truth: "सच्चाई —",
    lie1_text: "वो topper जो 6 घंटे पढ़ता है, उसे हराता है जो 10 घंटे पढ़ता है। क्योंकि topper को पता है कि ठीक क्या पढ़ना है। आप बेकार material और गलत strategy में डूब रहे हैं।",
    lie2_title: "# झूठ 2: Mock Tests आपको तैयार करेंगे",
    lie2_truth: "सच्चाई —",
    lie2_text: "Pattern Analysis और Weakness Diagnosis के बिना अंधे Mock Tests 🔫 अंधेरे में गोली चलाने जैसे हैं। आप वही गलतियाँ बार-बार दोहराते हैं और इसे practice कहते हैं।",
    join_title: "✅ Join करने पर क्या होता है",
    join_items: [
      "Negative marking से डरना बंद करें",
      "उतने ही समय में 20% ज़्यादा questions solve करें",
      "आप सही pattern decode करते हैं",
      "आप अपनी कमज़ोरियां खत्म करते हैं",
      "आप जानते हैं क्या पढ़ना है, क्या skip करना है और क्या practice करनी है",
      "एक लक्ष्य। एक सिस्टम। एक गंभीर प्रयास।",
    ],
    cta: "👑 Topper's Plan लें — केवल ₹42/महीना",
    secure: "🔒 Razorpay द्वारा सुरक्षित भुगतान • Payment के बाद तुरंत access",
  }
};

export default function WhyToppersPlan() {
  const [lang, setLang] = useState("en");
  const c = content[lang];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success</span></h1>
        </a>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '3px' }}>
            <button onClick={() => setLang('en')} style={{ padding: '4px 12px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'en' ? 'white' : 'transparent', color: lang === 'en' ? '#1e3a8a' : 'white' }}>English</button>
            <button onClick={() => setLang('hi')} style={{ padding: '4px 12px', borderRadius: '16px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', backgroundColor: lang === 'hi' ? 'white' : 'transparent', color: lang === 'hi' ? '#1e3a8a' : 'white' }}>हिंदी</button>
          </div>
          <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>{c.back}</a>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#dc2626', borderRadius: '8px', padding: '6px 16px', marginBottom: '20px' }}>
            <span style={{ color: 'white', fontSize: '13px', fontWeight: '800' }}>{c.badge}</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0', lineHeight: '1.3' }}>{c.headline1}</h1>
          <h2 style={{ color: '#fbbf24', fontSize: '24px', fontWeight: '900', margin: 0, lineHeight: '1.3' }}>{c.headline2}</h2>
        </div>

        {/* Reality */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '28px', marginBottom: '24px', borderLeft: '4px solid #dc2626' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '700', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.reality_label}</p>
          <p style={{ color: 'white', fontSize: '17px', lineHeight: '1.8', margin: '0 0 20px 0' }}>
            {c.reality_text1} <span style={{ color: '#dc2626', fontWeight: '900' }}>{c.reality_bold1}</span> {c.reality_text2} <span style={{ color: '#4ade80', fontWeight: '900' }}>{c.reality_bold2}</span>
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {[
              { val: c.stat1_val, label: c.stat1_label, color: '#dc2626' },
              { val: c.stat2_val, label: c.stat2_label, color: '#4ade80' },
              { val: c.stat3_val, label: c.stat3_label, color: '#fbbf24' },
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: '#0f172a', borderRadius: '10px', padding: '16px 24px', textAlign: 'center', flex: 1, minWidth: '120px' }}>
                <p style={{ color: stat.color, fontSize: '28px', fontWeight: '900', margin: '0 0 4px 0' }}>{stat.val}</p>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            {c.reality_end} <strong style={{ color: 'white' }}>{c.reality_end_bold}</strong> {c.reality_end2}
          </p>
        </div>

        {/* Question */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '28px', marginBottom: '24px', borderLeft: '4px solid #fbbf24' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '700', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.q_label}</p>
          <h3 style={{ color: '#fbbf24', fontSize: '22px', fontWeight: '900', margin: '0 0 12px 0', lineHeight: '1.4' }}>{c.q_title}</h3>
          <p style={{ color: 'white', fontSize: '17px', fontWeight: '700', margin: 0 }}>{c.q_sub}</p>
        </div>

        {/* Lies */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '28px', marginBottom: '24px', borderLeft: '4px solid #a855f7' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '700', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.lies_label}</p>
          <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <p style={{ color: '#dc2626', fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0' }}>{c.lie1_title}</p>
            <div style={{ borderLeft: '3px solid #4ade80', paddingLeft: '16px' }}>
              <p style={{ color: '#4ade80', fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0' }}>{c.lie1_truth}</p>
              <p style={{ color: 'white', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{c.lie1_text}</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '20px' }}>
            <p style={{ color: '#dc2626', fontSize: '18px', fontWeight: '900', margin: '0 0 8px 0' }}>{c.lie2_title}</p>
            <div style={{ borderLeft: '3px solid #4ade80', paddingLeft: '16px' }}>
              <p style={{ color: '#4ade80', fontSize: '13px', fontWeight: '800', margin: '0 0 6px 0' }}>{c.lie2_truth}</p>
              <p style={{ color: 'white', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{c.lie2_text}</p>
            </div>
          </div>
        </div>

        {/* What Happens */}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '28px', marginBottom: '40px', borderLeft: '4px solid #4ade80' }}>
          <p style={{ color: '#4ade80', fontSize: '20px', fontWeight: '900', margin: '0 0 20px 0' }}>{c.join_title}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.join_items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#4ade80', fontSize: '18px', flexShrink: 0 }}>✅</span>
                <p style={{ color: i === 5 ? '#fbbf24' : 'white', fontSize: '16px', margin: 0, lineHeight: '1.5', fontWeight: i === 5 ? '900' : '400' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '20px 0 60px 0' }}>
          <a href="/toppers-plan#pricing"
            style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#0f172a', padding: '20px 48px', borderRadius: '50px', textDecoration: 'none', fontSize: '20px', fontWeight: '900', boxShadow: '0 8px 32px rgba(251,191,36,0.4)' }}>
            {c.cta}
          </a>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '12px' }}>{c.secure}</p>
        </div>

      </div>
    </main>
  );
}