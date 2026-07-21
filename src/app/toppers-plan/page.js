"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ToppersPlan() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handleBuy = () => {
    if (!session) {
      router.push('/register?redirect=/toppers-plan');
    } else {
      router.push('/dashboard');
    }
  };

  const plans = [
    { id: 'monthly', label: 'Monthly', price: '₹99', period: 'per month', total: '₹99/month', badge: null },
    { id: 'halfyearly', label: '6 Months', price: '₹299', period: 'for 6 months', total: '₹50/month', badge: 'Most Popular' },
    { id: 'annual', label: 'Annual', price: '₹499', period: 'per year', total: '₹42/month', badge: 'Best Value' },
  ];

  const features = [
    { icon: '📅', title: 'AI Daily Mission', desc: 'Every morning get 4-5 personalized study tasks based on your weak topics, exam date and study hours. No more wondering what to study today.' },
    { icon: '🎯', title: 'AI Selection Coach', desc: 'AI analyzes your mock tests and finds the 20% weaknesses causing 80% of your lost marks. Get an actionable daily improvement plan.' },
    { icon: '🧠', title: 'AI Smart Revision Planner', desc: '7-day personalized revision plan based on spaced repetition, your exam date, and weak topics. AI decides what to revise and what to skip.' },
    { icon: '📚', title: 'AI Learning Hub', desc: 'Subject-wise AI mentors for your target exam. Get explanations, practice questions, and shortcuts for every topic in your preferred language.' },
    { icon: '📈', title: 'AI Rank Predictor', desc: 'See exactly how many marks you need to improve and in which subjects to reach the cutoff. Based on last 4 years of actual cutoff data.' },
    { icon: '🧬', title: 'AI Selection DNA', desc: 'Your unique preparation fingerprint. AI creates a complete profile of your speed, accuracy, consistency, strengths and selection readiness score.' },
    { icon: '📊', title: 'Exam Intelligence Report', desc: '10-year question analysis for your target exam. Topic-wise weightage, cutoff trends, what to study, what to skip, and a 6-month study roadmap.' },
    { icon: '🤖', title: 'Unlimited SarkariGPT', desc: 'Unlimited AI career guidance in Hindi, Tamil, Telugu, Malayalam and 8 more languages. Ask anything about your target exam anytime.' },
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
        <p style={{ color: '#c4b5fd', fontSize: '18px', margin: '0 0 40px 0' }}>
          8 AI-Powered Features to Maximize Your Selection Chances
        </p>

        {/* Pricing Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px' }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{ backgroundColor: selectedPlan === plan.id ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '24px 16px', border: selectedPlan === plan.id ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: plan.badge === 'Best Value' ? '#16a34a' : '#7c3aed', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '3px 10px', borderRadius: '10px', whiteSpace: 'nowrap' }}>
                  {plan.badge}
                </div>
              )}
              <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 8px 0', fontWeight: '600' }}>{plan.label}</p>
              <p style={{ color: '#fbbf24', fontSize: '32px', fontWeight: '900', margin: '0 0 4px 0', lineHeight: '1' }}>{plan.price}</p>
              <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 8px 0' }}>{plan.period}</p>
              <p style={{ color: '#c4b5fd', fontSize: '11px', margin: 0, fontWeight: '600' }}>{plan.total}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleBuy}
          style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '18px 48px', borderRadius: '12px', border: 'none', fontSize: '18px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 32px rgba(251,191,36,0.4)', display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto 12px' }}
        >
          👑 Get Topper's Plan
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
              <span style={{ fontSize: '32px' }}>{feature.icon}</span>
              <h3 style={{ color: 'white', margin: 0, fontSize: '17px', fontWeight: '800' }}>{feature.title}</h3>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '13px', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: 'white', textAlign: 'center', fontSize: '22px', fontWeight: '800', margin: '0 0 24px 0' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: "What exams does Topper's Plan support?", a: 'SSC CGL, CHSL, GD, RRB NTPC, Group D, UPSC, IBPS PO, Clerk, SBI PO, BPSC, UPPSC, TNPSC, Kerala PSC, MPSC and 20+ more exams.' },
              { q: 'Is there a free trial?', a: "Yes — all basic features including job notifications, results, admit cards, SarkariGPT (limited), and mock tests are free. Topper's Plan unlocks all AI features." },
              { q: 'Can I cancel anytime?', a: 'Yes. You can cancel your subscription at any time. Your access continues until the end of the billing period. No refunds as per our refund policy.' },
              { q: 'Which languages are supported?', a: 'Hindi, English, Tamil, Telugu, Malayalam, Kannada, Marathi, Bengali, Gujarati, Odia, Punjabi, and Assamese — 12 languages total.' },
              { q: 'How is this different from other platforms?', a: "Other platforms only provide study material. Topper's Plan provides AI-powered preparation — it analyzes your performance and tells you exactly what to do to get selected." },
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
            👑 Get Topper's Plan
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