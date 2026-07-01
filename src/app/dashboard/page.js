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
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '24px', margin: '0 0 8px 0' }}>
            Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            Your personalized Sarkari job dashboard is ready.
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Jobs Saved', value: '0', icon: '📌' },
            { label: 'Exams Tracked', value: '0', icon: '📅' },
            { label: 'Results Pending', value: '0', icon: '🔔' },
          ].map((stat, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Coming Soon Features */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#1e3a8a', marginTop: 0 }}>Coming Soon to Your Dashboard</h3>
          {[
            '🤖 SarkariGPT — AI doubt solver',
            '📝 Personalized mock tests',
            '🔔 Custom job alerts by exam category',
            '📊 Exam preparation progress tracker',
          ].map((item, index) => (
            <div key={index} style={{ padding: '10px 0', borderBottom: index < 3 ? '1px solid #f0f0f0' : 'none', color: '#444', fontSize: '14px' }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}