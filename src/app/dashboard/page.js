"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a', fontSize: '18px' }}>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'white', fontSize: '14px' }}>👤 {session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
      </div>

      <nav style={{ backgroundColor: '#1e3a8a', padding: '10px 20px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/#jobs' },
          { label: 'Mock Test', href: '/mocktest' },
          { label: 'Question Bank', href: '/questions' },
          { label: 'SarkariGPT 🤖', href: '/sarkarigpt' },
        ].map((item, i) => (
          <a key={i} href={item.href} style={{ color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', margin: '0 0 8px 0' }}>
            Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Your personalized Sarkari job dashboard is ready.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Jobs Saved', value: '0', icon: '📌' },
            { label: 'Exams Tracked', value: '0', icon: '📅' },
            { label: 'Tests Taken', value: '0', icon: '📝' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '🤖 Ask SarkariGPT', href: '/sarkarigpt', bg: '#7c3aed' },
            { label: '📝 Take Mock Test', href: '/mocktest', bg: '#dc2626' },
            { label: '📚 Practice Questions', href: '/questions', bg: '#16a34a' },
            { label: '⚙️ My Profile', href: '/profile', bg: '#ca8a04' },
            { label: '🏠 Back to Home', href: '/', bg: '#6b7280' },
          ].map((action, i) => (
            <a key={i} href={action.href} style={{ backgroundColor: action.bg, color: 'white', padding: '16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textAlign: 'center', display: 'block' }}>
              {action.label}
            </a>
          ))}
        </div>

        {/* Premium Plan Card */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(124,58,237,0.3)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '24px' }}>👑</span>
                <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '800' }}>Topper's Plan</h3>
              </div>
              <p style={{ color: '#c4b5fd', margin: 0, fontSize: '13px' }}>India's Most Powerful AI Exam Preparation Plan</p>
            </div>
            <div style={{ backgroundColor: '#fbbf24', borderRadius: '20px', padding: '6px 16px' }}>
              <span style={{ color: '#1a1a1a', fontWeight: '800', fontSize: '16px' }}>₹99/month</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { icon: '📅', label: 'AI Daily Mission', desc: 'Personalized daily study plan every morning' },
              { icon: '🎯', label: 'AI Selection Coach', desc: 'Find your 20% weaknesses causing 80% lost marks' },
              { icon: '🧠', label: 'AI Smart Revision Planner', desc: '7-day AI revision plan based on your weak topics' },
              { icon: '📚', label: 'AI Learning Hub', desc: 'Subject-wise AI mentors for your target exam' },
              { icon: '📈', label: 'AI Rank Predictor', desc: 'See exactly how to improve your rank' },
              { icon: '🧬', label: 'AI Selection DNA', desc: 'Your unique preparation fingerprint and readiness score' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 16px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: 'white', fontWeight: '700', fontSize: '13px', margin: 0 }}>{item.label}</p>
                  <p style={{ color: '#c4b5fd', fontSize: '11px', margin: 0 }}>{item.desc}</p>
                </div>
                <span style={{ fontSize: '16px' }}>🔒</span>
              </div>
            ))}
          </div>

          <a href="https://wa.me/919999999999?text=I want to subscribe to Topper's Plan Plan" target="_blank" style={{ display: 'block', backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '14px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: '800', fontSize: '15px', textAlign: 'center' }}>
            👑 Upgrade to Topper's Plan — ₹99/month
          </a>
          <p style={{ color: '#c4b5fd', fontSize: '11px', margin: '10px 0 0 0', textAlign: 'center' }}>
            🔒 Secure payment via Razorpay • Cancel anytime • Instant access
          </p>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}