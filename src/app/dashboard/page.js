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

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'white', fontSize: '14px' }}>
            👤 {session?.user?.name}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Nav */}
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

        {/* Welcome */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', margin: '0 0 8px 0' }}>
            Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Your personalized Sarkari job dashboard is ready.</p>
        </div>

        {/* Quick Stats */}
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

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: '🎯 AI Selection Coach', href: '/coach', bg: '#1e3a8a' },
            { label: '🧠 Revision Plan', href: '/revision', bg: '#7c3aed' },
            { label: '📈 Rank Predictor', href: '/rank-predictor', bg: '#ca8a04' },
            { label: '🧬 Selection DNA', href: '/selection-dna', bg: '#7c3aed' },
            { label: '📚 Learning Hub', href: '/learning-hub', bg: '#0891b2' },
            { label: '📅 Daily Mission', href: '/mission', bg: '#7c3aed' },
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

        {/* Coming Soon */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Coming Soon to Your Dashboard</h3>
          {[
            '🤖 AI Daily Mission — personalized study tasks every morning',
            '📊 Mock Test History — track your scores over time',
            '❌ Mistake Bank — learn from your wrong answers',
            '🔔 Custom Job Alerts — get notified for your target exams',
            '📈 Preparation Progress — see how you are improving',
          ].map((item, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none', color: '#444', fontSize: '14px' }}>
              {item}
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}