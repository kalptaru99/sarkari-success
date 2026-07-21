"use client";
import { useState, useEffect } from "react";

const examCalendar = [
  { exam: "SSC CGL Tier 1", date: "August 2026", daysLeft: 30 },
  { exam: "RRB NTPC CBT 1", date: "September 2026", daysLeft: 60 },
  { exam: "IBPS PO Prelims", date: "22 August 2026", daysLeft: 37 },
  { exam: "UPSC Mains", date: "21 August 2026", daysLeft: 36 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/api/jobs?limit=20')
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []));
    fetch('/api/results?limit=10')
      .then(res => res.json())
      .then(data => setResults(data.results || []));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 20px', textAlign: 'center', fontSize: '13px' }}>
        India's First AI-Powered Sarkari Career Companion —{' '}
        <a href="/sarkarigpt" style={{ color: '#fca5a5', textDecoration: 'none', fontWeight: 'bold' }}>Try SarkariGPT Free</a>
      </div>

      <header style={{ backgroundColor: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #1e3a8a', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <p style={{ color: '#374151', fontSize: '12px', margin: '2px 0 0 0' }}>AI-Powered Sarkari Naukri, Results and Exam Updates</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/login" style={{ padding: '8px 16px', border: '2px solid #1e3a8a', borderRadius: '6px', color: '#1e3a8a', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Login</a>
          <a href="/register" style={{ padding: '8px 16px', backgroundColor: '#1e3a8a', borderRadius: '6px', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Register Free</a>
        </div>
      </header>

      <nav style={{ backgroundColor: '#1e3a8a', padding: '10px 20px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {[
         { label: 'Home', href: '/' },
          { label: 'Jobs', href: '#jobs' },
          { label: 'Results', href: '#results' },
          { label: 'Admit Cards', href: '/admit-card' },
          { label: 'State Jobs', href: '/states' },
          { label: 'Mock Test', href: '/mocktest' },
          { label: 'SarkariGPT', href: '/sarkarigpt' },
          { label: 'AI Coach', href: '/coach', color: '#4ade80' },
          { label: "👑 Topper's Plan", href: '/dashboard', color: '#fbbf24' },
          { label: 'Dashboard', href: '/dashboard' },
        ].map((item, index) => (
          <a key={index} href={item.href} style={{ color: item.color || 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ backgroundColor: '#fee2e2', borderBottom: '1px solid #dc2626', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>LIVE</span>
        <span style={{ color: '#991b1b', fontSize: '13px' }}>SSC CGL 2026 — 12,256 Vacancies | RRB NTPC 2026 — 8,868 Vacancies | UPSC Civil Services 2026 — 933 Vacancies | IBPS PO 2026 — 6,715 Vacancies</span>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #dc2626 100%)', padding: '50px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '30px', padding: '6px 20px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.3)' }}>
          <span style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 'bold' }}>🤖 India's First AI-Powered Sarkari Career Companion</span>
        </div>
        <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.2' }}>
          Find Your Sarkari Success with AI
        </h2>
        <p style={{ color: '#bfdbfe', fontSize: '18px', margin: '0 0 32px 0' }}>
          SSC • Railway • UPSC • Banking • State PSC
        </p>

        <div style={{ maxWidth: '650px', margin: '0 auto 16px auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search SSC, Railway, UPSC, Banking jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', border: '2px solid white', fontSize: '15px', outline: 'none', color: '#1a1a1a', backgroundColor: 'white' }}
          />
          <button onClick={() => document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })} style={{ padding: '14px 24px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ maxWidth: '650px', margin: '0 auto 24px auto', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>SarkariGPT — AI Career Guide</p>
                <p style={{ color: '#bfdbfe', fontSize: '11px', margin: 0 }}>Hindi, Tamil, Telugu & 9 more languages</p>
              </div>
            </div>
            <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
              Ask Now →
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {["SSC CGL crack karne ki strategy?", "Railway Group D vs NTPC?", "UPSC 6 months preparation?", "IBPS PO cut off 2026?", "Agniveer physical test?", "BPSC 72nd CCE tips?"].map((q, i) => (
              <a key={i} href={"/sarkarigpt?q=" + encodeURIComponent(q)} style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#e0f2fe', padding: '5px 12px', borderRadius: '16px', textDecoration: 'none', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)' }}>
                {q}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: '🎯 AI Coach', href: '/coach', color: '#16a34a' },
            { label: '📅 Daily Mission', href: '/mission' },
            { label: '📝 Mock Test', href: '/mocktest' },
            { label: '📚 Question Bank', href: '/questions' },
            { label: '🏛️ State Jobs', href: '/states' },
          ].map((item, i) => (
            <a key={i} href={item.href} style={{ padding: '8px 18px', backgroundColor: item.color ? 'rgba(22,163,74,0.2)' : 'rgba(255,255,255,0.15)', color: item.color || 'white', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', border: '1px solid ' + (item.color || 'rgba(255,255,255,0.3)'), fontWeight: '500' }}>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', borderBottom: '1px solid #e5e7eb' }}>
        {[
          { value: '50,000+', label: 'Active Jobs' },
          { value: '1,00,000+', label: 'Students' },
          { value: '800+', label: 'Practice Questions' },
          { value: '14+', label: 'AI Features' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#374151' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        <div id="jobs" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: '0 0 16px 0' }}>Latest Sarkari Jobs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {filteredJobs.length === 0 && searchQuery === '' && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563', backgroundColor: 'white', borderRadius: '8px', gridColumn: '1/-1' }}>Loading jobs...</div>
            )}
            {filteredJobs.length === 0 && searchQuery !== '' && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888', backgroundColor: 'white', borderRadius: '8px', gridColumn: '1/-1' }}>No jobs found for "{searchQuery}"</div>
            )}
            {filteredJobs.map((job, index) => (
              <a key={index} href={"/jobs/" + job.slug} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '28px' }}>🏛️</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', flexShrink: 0 }}>NEW</span>}
                  <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: 0, lineHeight: '1.3' }}>{job.title}</p>
                </div>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{job.org}</p>
                <p style={{ color: '#1e3a8a', fontSize: '12px', fontWeight: '600', margin: 0 }}>Vacancies: {job.vacancies}</p>
                <p style={{ color: '#dc2626', fontSize: '12px', fontWeight: '600', margin: 0 }}>Last Date: {job.last_date}</p>
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', marginTop: 'auto' }}>
                  View Details
                </span>
              </a>
            ))}
          </div>
        </div>

        <div id="calendar" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: '0 0 16px 0' }}>Upcoming Exam Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {examCalendar.map((item, index) => (
              <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', color: '#1e3a8a', margin: '0 0 4px 0' }}>{item.exam}</h3>
                  <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Exam Date: {item.date}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ backgroundColor: item.daysLeft <= 10 ? '#fee2e2' : item.daysLeft <= 30 ? '#fef9c3' : '#dbeafe', color: item.daysLeft <= 10 ? '#dc2626' : item.daysLeft <= 30 ? '#ca8a04' : '#1e3a8a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    {item.daysLeft} days left
                  </span>
                  <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Practice</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="results" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: '0 0 16px 0' }}>Latest Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888', backgroundColor: 'white', borderRadius: '8px', gridColumn: '1/-1' }}>Loading results...</div>
            )}
            {results.map((item, index) => (
              <a key={index} href={"/results/" + item.slug} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '28px' }}>📊</div>
                <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '14px', margin: 0, lineHeight: '1.3' }}>{item.exam}</p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{item.org}</p>
                <p style={{ color: '#374151', fontSize: '12px', margin: 0 }}>Result Date: <strong>{item.result_date}</strong></p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ backgroundColor: item.status === 'Declared' ? '#dcfce7' : '#fef9c3', color: item.status === 'Declared' ? '#16a34a' : '#ca8a04', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                    {item.status}
                  </span>
                  <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                    Check Result
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #1e3a8a' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0' }}>Free Mock Tests</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 16px 0' }}>Timed tests for SSC, Railway, UPSC, Banking</p>
            <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Start Test</a>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #dc2626' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📚</div>
            <h3 style={{ color: '#dc2626', margin: '0 0 8px 0' }}>Question Bank</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 16px 0' }}>Practice questions with explanations</p>
            <a href="/questions" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Practice Now</a>
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '30px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
              </h3>
              <p style={{ color: '#93c5fd', fontSize: '13px', margin: '0 0 12px 0' }}>India's First AI-Powered Sarkari Career Companion</p>
              <p style={{ color: 'white', fontSize: '13px', margin: '0 0 4px 0', fontWeight: '800' }}>MAIL US</p>
              <a href="mailto:contact.sarkarisuccess@gmail.com" style={{ color: 'white', fontSize: '16px', textDecoration: 'none', fontWeight: '800' }}>
                📧 <span style={{ color: '#fca5a5' }}>contact.sarkarisuccess@gmail.com</span>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>QUICK LINKS</p>
                {[
                  { label: 'Jobs', href: '#jobs' },
                  { label: 'Results', href: '#results' },
                  { label: 'Admit Cards', href: '/admit-card' },
                  { label: 'Mock Test', href: '/mocktest' },
                  { label: 'SarkariGPT', href: '/sarkarigpt' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>{link.label}</a>
                ))}
              </div>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>ACCOUNT</p>
                {[
                  { label: 'Login', href: '/login' },
                  { label: 'Register Free', href: '/register' },
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Question Bank', href: '/questions' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>{link.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <p style={{ color: '#93c5fd', fontSize: '12px', margin: '0 0 8px 0' }}>2026 Sarkari Success. All rights reserved. sarkarisuccess.com</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a href="/privacy" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Terms of Service</a>
                <a href="/disclaimer" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Disclaimer</a>
                <a href="/refund-policy" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Refund Policy</a>
                <a href="/cookie-policy" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>Cookie Policy</a>
                <a href="/sarkarigpt" style={{ color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '700' }}>SarkariGPT</a>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'white', fontSize: '12px', margin: '0 0 8px 0', fontWeight: '800' }}>Scan to open on mobile</p>
              <img
                src={"https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://sarkarisuccess.com&color=ffffff&bgcolor=1e3a8a"}
                alt="Sarkari Success QR Code"
                style={{ width: '100px', height: '100px', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.3)' }}
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}