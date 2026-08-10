"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ToppersPlan() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = {
    monthly: { label: 'Monthly', price: '₹99', period: 'per month', total: '₹99', savings: '', badge: '' },
    biannual: { label: '6 Months', price: '₹50', period: 'per month', total: '₹299 for 6 months', savings: 'Save ₹295', badge: 'Most Popular' },
    annual: { label: 'Annual', price: '₹42', period: 'per month', total: '₹499 per year', savings: 'Save ₹689', badge: 'Best Value' },
  };

  const problems = [
    { emoji: '😰', problem: 'Studying 8-10 hours daily but not getting selected', solution: 'AI tells you exactly what to study — no more wasted hours on wrong topics' },
    { emoji: '📉', problem: 'Mock test scores are stuck and you don\'t know why', solution: 'AI finds your exact weak areas and gives you a daily fix plan' },
    { emoji: '🤯', problem: 'Syllabus is huge — you don\'t know what to skip', solution: 'Exam Intelligence Report shows exactly what topics come every year' },
    { emoji: '😓', problem: 'Forgetting what you studied last week', solution: 'AI Smart Revision uses spaced repetition so you never forget again' },
    { emoji: '🌐', problem: 'English explanations are hard to understand', solution: 'Everything explained in pure Hindi or English — you choose' },
  ];

  const features = [
    { emoji: '📘', title: 'English AI', desc: '5,000+ Questions — Error Detection, Vocabulary, RC, Cloze Test with Hindi explanation', href: '/english-ai', color: '#1e3a8a' },
    { emoji: '📗', title: 'Maths AI', desc: '5,990+ Questions — Percentage, Profit/Loss, Geometry, DI with Hindi shortcuts', href: '/maths-ai', color: '#0f766e' },
    { emoji: '🧩', title: 'Reasoning AI', desc: '5,279+ Questions — Analogy, Syllogism, Puzzle, Coding with Hindi tricks', href: '/reasoning-ai', color: '#7c3aed' },
    { emoji: '🌍', title: 'GK/GS AI', desc: '5,697+ Questions — History, Polity, Geography, Science with AI explanation', href: '/gk-ai', color: '#ea580c' },
    { emoji: '✍️', title: 'Descriptive AI', desc: 'Essay + Letter Writing with AI Evaluation — SSC CGL Tier 3 pattern', href: '/descriptive-ai', color: '#0e7490' },
    { emoji: '📅', title: 'AI Daily Mission', desc: 'Personalized 4-5 study tasks every morning based on your weak topics and exam date', href: '/mission', color: '#dc2626' },
    { emoji: '🎯', title: 'AI Selection Coach', desc: 'Finds the exact 20% weaknesses causing 80% of your lost marks with action plan', href: '/coach', color: '#ca8a04' },
    { emoji: '🧠', title: 'AI Smart Revision', desc: '7-day revision plan using spaced repetition — AI decides what to revise and skip', href: '/revision', color: '#16a34a' },
    { emoji: '📚', title: 'AI Learning Hub', desc: 'Subject-wise AI mentors for your target exam in your preferred language', href: '/learning-hub', color: '#db2777' },
    { emoji: '📈', title: 'AI Rank Predictor', desc: 'See exactly how many marks you need to improve to reach the cutoff', href: '/rank-predictor', color: '#0891b2' },
    { emoji: '🧬', title: 'AI Selection DNA', desc: 'Your unique preparation fingerprint — speed, accuracy, consistency and readiness score', href: '/selection-dna', color: '#7c3aed' },
    { emoji: '📊', title: 'Exam Intelligence Report', desc: '10-year question analysis — topic weightage, cutoff trends and 6-month roadmap', href: '/exam-guide', color: '#1e3a8a' },
    { emoji: '🤖', title: 'Unlimited SarkariGPT', desc: 'Unlimited AI career guidance in Hindi, English and 10 more languages — ask anything', href: '/sarkarigpt', color: '#dc2626' },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #1e40af)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success</span></h1>
        </a>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 16px', marginBottom: '16px' }}>
          <span style={{ color: '#fde68a', fontSize: '13px', fontWeight: '700' }}>👑 LIMITED TIME — Starting at ₹42/month</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: '1.2' }}>
          India का सबसे Powerful<br />AI Exam Preparation Plan
        </h1>
        <p style={{ color: '#bfdbfe', fontSize: '18px', margin: '0 0 8px 0' }}>
          20+ AI Features • 30,000+ Questions • Hindi & English • 11 Exams
        </p>
        <p style={{ color: '#fde68a', fontSize: '14px', margin: '0 0 32px 0', fontWeight: '700' }}>
          ⚡ Jo other platforms नहीं दे सकते — वो सब यहाँ है
        </p>
        <a href="#pricing" style={{ backgroundColor: '#fca5a5', color: '#1e3a8a', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: '900', display: 'inline-block' }}>
          👑 Get Topper's Plan — ₹99/month
        </a>
        <p style={{ color: '#93c5fd', fontSize: '12px', marginTop: '12px' }}>🔒 Secure payment via Razorpay • Instant access</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* Problem Section */}
        <div style={{ padding: '50px 0 20px 0', textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0' }}>क्या आप भी इन Problems से जूझ रहे हैं?</h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0' }}>लाखों aspirants इन्हीं problems की वजह से fail होते हैं — Topper's Plan इन्हें solve करता है</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {problems.map((item, i) => (
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
        <div style={{ padding: '40px 0' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', textAlign: 'center' }}>Topper's Plan में क्या मिलेगा?</h2>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0', textAlign: 'center' }}>20+ AI Features जो कोई दूसरा platform नहीं देता</p>

          {/* Subject AI Pages */}
          <div style={{ backgroundColor: '#eff6ff', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '2px solid #bfdbfe' }}>
            <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>📚 Subject AI Pages — 30,000+ Questions</h3>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>Pure Hindi या English में — आप choose करो। हर topic के लिए AI explanation + shortcuts</p>
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

          {/* Other AI Features */}
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

        {/* Why Choose Us */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '16px', padding: '32px', marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', margin: '0 0 24px 0' }}>दूसरे platforms से Topper's Plan अलग क्यों है?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { emoji: '🤖', title: 'AI-Powered', desc: 'सिर्फ content नहीं — AI analyze करता है और बताता है क्या करना है' },
              { emoji: '🗣️', title: 'Hindi & English', desc: 'Pure Hindi या Pure English — दोनों में पूरा platform available' },
              { emoji: '📊', title: '30,000+ Questions', desc: 'SSC, Railway, UPSC, Banking — सभी exams के लिए chapter-wise questions' },
              { emoji: '🏛️', title: '24+ States', desc: 'Central + State govt jobs — सब एक जगह, daily update' },
              { emoji: '💰', title: 'सिर्फ ₹42/month', desc: 'Coaching center का ₹5,000/month vs हमारा ₹42/month — choose करो' },
              { emoji: '⚡', title: 'Instant Access', desc: 'Payment के बाद तुरंत access — कोई wait नहीं' },
            ].map((item, i) => (
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
          <h2 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', textAlign: 'center' }}>अपना Plan चुनो</h2>
          <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 32px 0', textAlign: 'center' }}>Coaching center का ₹5,000/month vs हमारा ₹42/month — फैसला आपका</p>

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
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 4px 0' }}>You selected</p>
            <p style={{ color: '#1e3a8a', fontWeight: '900', fontSize: '32px', margin: '0 0 4px 0' }}>{plans[selectedPlan].total}</p>
            {plans[selectedPlan].savings && <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', margin: '0 0 16px 0' }}>🎉 {plans[selectedPlan].savings}</p>}

            <div style={{ backgroundColor: '#f0fdf4', borderRadius: '10px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
              <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px', margin: '0 0 8px 0' }}>✅ What you get:</p>
              {['20+ AI Features', '30,000+ Chapter-wise Questions', 'Hindi & English toggle', '11 Exams covered', '24+ States job notifications', 'Unlimited SarkariGPT'].map((item, i) => (
                <p key={i} style={{ color: '#1e293b', fontSize: '13px', margin: '0 0 4px 0' }}>✓ {item}</p>
              ))}
            </div>

            <button
              onClick={() => session ? alert('Razorpay coming soon!') : router.push('/login')}
              style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '18px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', marginBottom: '12px' }}>
              👑 Get Topper's Plan — {plans[selectedPlan].total}
            </button>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>🔒 Secure payment via Razorpay • Instant access after payment</p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '900', margin: '0 0 24px 0', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'कौन से exams support होते हैं?', a: 'SSC CGL, CHSL, GD, MTS, CPO, RRB NTPC, Group D, ALP, UPSC, IBPS PO, Clerk, SBI PO, BPSC, UPPSC, TNPSC, Kerala PSC और 20+ more exams.' },
              { q: 'क्या free trial है?', a: 'हाँ — job notifications, results, admit cards, SarkariGPT (limited) और mock tests बिल्कुल free हैं। Topper\'s Plan सभी AI features unlock करता है।' },
              { q: 'क्या cancel कर सकते हैं?', a: 'हाँ। आप कभी भी cancel कर सकते हैं। Access billing period के end तक रहेगा। Refund policy के अनुसार refund नहीं होगा।' },
              { q: 'कौन सी languages support हैं?', a: 'Hindi, English, Tamil, Telugu, Malayalam, Kannada, Marathi, Bengali, Gujarati, Odia, Punjabi, Assamese — 12 languages।' },
              { q: 'क्या mobile पर काम करेगा?', a: 'हाँ — website mobile, tablet और desktop सभी पर perfectly काम करती है।' },
            ].map((item, i) => (
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
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>आज ही शुरू करो — Selection तक का सफर</h2>
        <p style={{ color: '#bfdbfe', fontSize: '15px', margin: '0 0 24px 0' }}>हजारों aspirants AI की मदद से government exams crack कर रहे हैं</p>
        <a href="#pricing" style={{ backgroundColor: '#fca5a5', color: '#1e3a8a', padding: '16px 40px', borderRadius: '50px', textDecoration: 'none', fontSize: '18px', fontWeight: '900', display: 'inline-block', marginBottom: '12px' }}>
          👑 Get Topper's Plan — Starting ₹42/month
        </a>
        <p style={{ color: '#93c5fd', fontSize: '12px', margin: 0 }}>🔒 Secure payment via Razorpay • Instant access</p>
      </div>

      <footer style={{ backgroundColor: '#0f172a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}