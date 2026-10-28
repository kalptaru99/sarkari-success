"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const STATUS_CONFIG = {
  NEW:          { label: '🟢 New',          bg: '#dcfce7', color: '#15803d' },
  OPEN:         { label: '🔵 Open',         bg: '#dbeafe', color: '#1d4ed8' },
  CLOSING_SOON: { label: '⚠️ Closing Soon', bg: '#fef9c3', color: '#a16207' },
  CLOSED:       { label: '🔴 Closed',       bg: '#fee2e2', color: '#b91c1c' },
  RESULT_OUT:   { label: '🏆 Result Out',   bg: '#f3e8ff', color: '#7e22ce' },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) fetchSaved();
  }, [session]);

  const fetchSaved = async () => {
    try {
      const r = await fetch('/api/jobs/save?all=true');
      const d = await r.json();
      setSavedJobs(d.saved || []);
    } catch (e) {
      console.error('Fetch saved error:', e);
    }
    setLoading(false);
  };

  const unsave = async (slug) => {
    setRemoving(prev => ({ ...prev, [slug]: true }));
    try {
      await fetch(`/api/jobs/save?slug=${slug}`, { method: 'DELETE' });
      setSavedJobs(prev => prev.filter(j => j.slug !== slug));
    } catch (e) {
      console.error('Unsave error:', e);
    }
    setRemoving(prev => ({ ...prev, [slug]: false }));
  };

  if (status === 'loading' || (status === 'unauthenticated')) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a' }}>Loading...</p>
      </main>
    );
  }

  const openJobs = savedJobs.filter(j => j.lifecycle_status !== 'CLOSED');
  const closedJobs = savedJobs.filter(j => j.lifecycle_status === 'CLOSED');

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/profile" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>🎯 My Profile</a>
          <span style={{ color: '#93c5fd', fontSize: '13px' }}>{session?.user?.name || session?.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ backgroundColor: 'transparent', border: '1px solid #93c5fd', color: '#93c5fd', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
        {/* Title */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '26px', margin: '0 0 4px' }}>My Dashboard</h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Track saved jobs and get notified of status changes</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Saved Jobs', value: savedJobs.length, icon: '🔖', color: '#1e3a8a' },
            { label: 'Still Open', value: openJobs.length, icon: '✅', color: '#15803d' },
            { label: 'Closed', value: closedJobs.length, icon: '🔴', color: '#b91c1c' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '4px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>Loading saved jobs...</div>
        ) : savedJobs.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔖</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 8px' }}>No saved jobs yet</h3>
            <p style={{ color: '#6b7280', margin: '0 0 20px', fontSize: '14px' }}>Browse jobs and click "Save Job" to track them here</p>
            <a href="/" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
              Browse Jobs →
            </a>
          </div>
        ) : (
          <>
            {/* Open Jobs */}
            {openJobs.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ color: '#1e3a8a', fontSize: '17px', fontWeight: '800', margin: '0 0 14px' }}>
                  ✅ Active Jobs ({openJobs.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {openJobs.map(job => <JobCard key={job.slug} job={job} onUnsave={unsave} removing={removing[job.slug]} />)}
                </div>
              </div>
            )}

            {/* Closed Jobs */}
            {closedJobs.length > 0 && (
              <div>
                <h2 style={{ color: '#6b7280', fontSize: '17px', fontWeight: '800', margin: '0 0 14px' }}>
                  🔴 Closed ({closedJobs.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {closedJobs.map(job => <JobCard key={job.slug} job={job} onUnsave={unsave} removing={removing[job.slug]} />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* Alert Subscription link */}
        <div style={{ marginTop: '32px', backgroundColor: '#eff6ff', borderRadius: '12px', padding: '20px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
          <p style={{ margin: '0 0 10px', color: '#1e40af', fontWeight: '600' }}>📧 Get email alerts for new government jobs</p>
          <a href="/#subscribe" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 22px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            Subscribe Free →
          </a>
        </div>
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '48px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}

function JobCard({ job, onUnsave, removing }) {
  const s = STATUS_CONFIG[job.lifecycle_status || 'OPEN'] || STATUS_CONFIG.OPEN;
  const savedDate = new Date(job.saved_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '18px 20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '220px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
          <a href={`/jobs/${job.slug}`} style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>
            {job.title}
          </a>
          <span style={{ backgroundColor: s.bg, color: s.color, padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>
            {s.label}
          </span>
        </div>
        <p style={{ margin: '0 0 8px', color: '#6b7280', fontSize: '13px' }}>{job.org} · {job.category}</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {job.vacancies && <span style={{ fontSize: '12px', color: '#374151' }}>👥 {job.vacancies} posts</span>}
          {job.last_date && <span style={{ fontSize: '12px', color: job.lifecycle_status === 'CLOSING_SOON' ? '#b45309' : '#374151', fontWeight: job.lifecycle_status === 'CLOSING_SOON' ? '700' : '400' }}>📅 {job.last_date}</span>}
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Saved {savedDate}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
        <a href={`/jobs/${job.slug}`} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
          View →
        </a>
        <button
          onClick={() => onUnsave(job.slug)}
          disabled={removing}
          style={{ backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: removing ? 'wait' : 'pointer', fontSize: '12px', fontWeight: '600' }}
        >
          {removing ? '...' : '✕ Remove'}
        </button>
      </div>
    </div>
  );
}
