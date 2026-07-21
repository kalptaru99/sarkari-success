"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ToppersPlan() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBuy = () => {
    if (!session) {
      router.push('/register?redirect=/toppers-plan');
    } else {
      router.push('/dashboard');
    }
  };

  const features = [
    {
      icon: '📅',
      title: 'AI Daily Mission',
      desc: 'Every morning get 4-5 personalized study tasks based on your weak topics, exam date and study hours. No more wondering what to study today.',
      value: '₹500/month value'
    },
    {
      icon: '🎯',
      title: 'AI Selection Coach',
      desc: 'AI analyzes your mock tests and finds the 20% weaknesses causing 80% of your lost marks. Get an actionable daily improvement plan.',
      value: '₹800/month value'
    },
    {
      icon: '🧠',
      title: 'AI Smart Revision Planner',
      desc: '7-day personalized revision plan based on spaced repetition, your exam date, and weak topics. AI decides what to revise and what to skip.',
      value: '₹400/month value'
    },
    {
      icon: '📚',
      title: 'AI Learning Hub',
      desc: 'Subject-wise AI mentors for your target exam. Get explanations, practice questions, and shortcuts for every topic in your preferred language.',
      value: '₹600/month value'
    },
    {
      icon: '📈',
      title: 'AI Rank Predictor',
      desc: 'See exactly how many marks you need to improve and in which subjects to reach the cutoff. Based on last 4 years of actual cutoff data.',
      value: '₹300/month value'
    },
    {
      icon: '🧬',
      title: 'AI Selection DNA',
      desc: 'Your unique preparation fingerprint. AI creates a complete profile of your speed, accuracy, consistency, strengths and selection readiness score.',
      value: '₹400/month value'
    },
    {
      icon: '📊',
      title: 'Exam Intelligence Report',
      desc: '10-year question analysis for your target exam. Topic-wise weightage, cutoff trends, what to study, what to skip, and a 6-month study roadmap.',
      value: '₹1000/month value'
    },
    {
      icon: '🤖',
      title: 'Unlimited SarkariGPT',
      desc: 'Unlimited AI career guidance in Hindi, Tamil, Telugu, Malayalam and 8 more languages. Ask anything about your target exam anytime.',
      value: '₹200/month value'
    },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
          </h1>
        </a>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/login" style={{ color: 'white', fontSize: '13px', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px' }}>Login</a>
          <a href="/register" style={{ color: '#1a1a1a', fontSize: '13px', textDecoration: 'none', padding: '8px 16px', backgroundColor: '#fbbf24', borderRadius: '6px', fontWeight: 'bold' }}>Register Free</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(251,191,36,0.2)', color: '#fbbf24', fontSize: '13px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(251,191,36,0.4)' }}>
          👑 India's Most Powerful AI Exam Preparation Plan
        </div>
        <h1 style={{ color: 'white', fontSize: '42px', fontWeight: '900', margin: '0 0 16px 0', lineHeight: '1.2' }}>
          Topper's Plan
        </h1>
        <p style={{ color: '#c4b5fd', fontSize: '18px', margin: '0 0 8px 0' }}>
          8 AI-Powered Features to Maximize Your Selection Chances
        </p>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 32px 0' }}>
          Total value: ₹4,200/month — Get everything for just
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>₹4,200/month</div>
            <div style={{ fontSize: '52px', fontWeight: '900', color: '#fbbf24', lineHeight: '1' }}>₹99</div>
            <div style={{ fontSize: '16px', color: '#c4b5fd' }}>per month</div>
          </div>
          <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
            97% OFF
          </div>
        </div>

        <button
          onClick={handleBuy}
          style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '18px 48px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 32px rgba(251,191,36,0.4)', marginBottom: '12px', display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto 12px' }}
        >
          👑 Buy Topper's Plan — ₹99/month
        </button>
        <p style={{ color: '#64748b', fontSize: '12px', margin: '12px 0 0 0' }}>
          🔒 Secure payment • Cancel anytime • Instant access after payment
        </p>
      </div>

      {/* Features */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px 60px' }}>
        <h2 style={{ color: 'white', textAlign: 'center', fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>
          What's Inside Topper's Plan
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '14px', margin: '0 0 40px 0' }}>
          8 AI features that no other government exam platform offers
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {features.map((feature, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>{feature.icon}</span>
                <span style={{ backgroundColor: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontSize: '11px', padding: '3px 10px', borderRadius: '10px', fontWeight: 'bold' }}>
                  {feature.value}
                </span>
              </div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '17px', fontWeight: '800' }}>{feature.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '22px', fontWeight: '800', margin: '0 0 24px 0' }}>
            Sarkari Success vs Other Platforms
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  <th style={{ color: '#94a3b8', textAlign: 'left', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Feature</th>
                  <th style={{ color: '#fbbf24', textAlign: 'center', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>👑 Topper's Plan</th>
                  <th style={{ color: '#94a3b8', textAlign: 'center', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Testbook</th>
                  <th style={{ color: '#94a3b8', textAlign: 'center', padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Unacademy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI Weakness Analyzer', '✅', '❌', '❌'],
                  ['Personalized Daily Mission', '✅', '❌', '❌'],
                  ['AI Rank Predictor', '✅', '❌', '❌'],
                  ['AI Selection DNA', '✅', '❌', '❌'],
                  ['12 Regional Languages', '✅', '❌', '❌'],
                  ['10-Year Exam Analysis', '✅', '✅', '✅'],
                  ['Mock Tests', '✅', '✅', '✅'],
                  ['Price', '₹99/month', '₹299+/month', '₹499+/month'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ color: 'white', padding: '12px 10px' }}>{row[0]}</td>
                    <td style={{ color: '#4ade80', textAlign: 'center', padding: '12px 10px', fontWeight: 'bold' }}>{row[1]}</td>
                    <td style={{ color: '#94a3b8', textAlign: 'center', padding: '12px 10px' }}>{row[2]}</td>
                    <td style={{ color: '#94a3b8', textAlign: 'center', padding: '12px 10px' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '22px', fontWeight: '800', margin: '0 0 24px 0' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'What exams does Topper\'s Plan support?', a: 'SSC CGL, CHSL, GD, RRB NTPC, Group D, UPSC, IBPS PO, Clerk, SBI PO, BPSC, UPPSC, TNPSC, Kerala PSC, MPSC and 20+ more exams.' },
              { q: 'Is there a free trial?', a: 'Yes — all basic features including job notifications, results, admit cards, SarkariGPT (limited), and mock tests are free. Topper\'s Plan unlocks all AI features.' },
              { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time. Your access continues until the end of the billing period. No refunds as per our refund policy.' },
              { q: 'Which languages are supported?', a: 'Hindi, English, Tamil, Telugu, Malayalam, Kannada, Marathi, Bengali, Gujarati, Odia, Punjabi, and Assamese — 12 languages total.' },
              { q: 'How is this different from SarkariResult?', a: 'SarkariResult only provides information. Topper\'s Plan provides AI-powered preparation — it helps you actually get selected, not just find jobs.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '16px 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: '0 0 6px 0' }}>Q: {item.q}</p>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: 'center', backgroundColor: 'rgba(251,191,36,0.1)', borderRadius: '16px', padding: '40px', border: '1px solid rgba(251,191,36,0.3)' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0' }}>
            Start Your Journey to Selection Today
          </h2>
          <p style={{ color: '#c4b5fd', fontSize: '14px', margin: '0 0 24px 0' }}>
            Join thousands of aspirants using AI to crack government exams
          </p>
          <button
            onClick={handleBuy}
            style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '18px 48px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 32px rgba(251,191,36,0.4)' }}
          >
            👑 Buy Topper's Plan — ₹99/month
          </button>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '12px 0 0 0' }}>
            🔒 Secure payment via Razorpay • Cancel anytime • Instant access
          </p>
        </div>

      </div>

      <footer style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}