"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      checkSubscription();
    }
  }, [status]);

  const checkSubscription = async () => {
    try {
      const res = await fetch('/api/subscription');
      const data = await res.json();
      setHasAccess(data.hasSubscription);
    } catch (e) {
      setHasAccess(false);
    }
    setChecking(false);
  };

  if (status === "loading" || checking) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👑</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>Checking access...</p>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f0f4ff', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>

          <div style={{ fontSize: '64px', marginBottom: '16px' }}>👑</div>
          <h1 style={{ color: '#1e3a8a', fontSize: '28px', fontWeight: '900', margin: '0 0 12px 0' }}>Topper's Plan Required</h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 32px 0', lineHeight: '1.6' }}>
            This AI feature is part of Topper's Plan. Upgrade to get access to all 20+ AI features and 30,000+ practice questions.
          </p>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', textAlign: 'left' }}>
            <p style={{ color: '#16a34a', fontWeight: '700', fontSize: '14px', margin: '0 0 12px 0' }}>✅ What you get with Topper's Plan:</p>
            {[
              '📘 English AI — 5,000+ Questions',
              '📗 Maths AI — 5,990+ Questions',
              '🧩 Reasoning AI — 5,279+ Questions',
              '🌍 GK/GS AI — 5,697+ Questions',
              '✍️ Descriptive AI — Essay + Letter',
              '🤖 Unlimited SarkariGPT',
              '📊 Exam Intelligence Report',
              '🎯 AI Selection Coach + 13 more features',
            ].map((item, i) => (
              <p key={i} style={{ color: '#1e293b', fontSize: '13px', margin: '0 0 6px 0' }}>✓ {item}</p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/toppers-plan" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: '800' }}>
              👑 Get Topper's Plan — ₹99/month
            </a>
            <a href="/" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '700', border: '2px solid #1e3a8a' }}>
              ← Back to Home
            </a>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '16px' }}>
            🔒 Secure payment via Razorpay • Instant access after payment
          </p>
        </div>
      </main>
    );
  }

  return children;
}