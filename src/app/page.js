"use client";
import { useState, useEffect } from "react";

const examCalendar = [
  { exam: "SSC CGL Tier 1", date: "August 2026", daysLeft: 30, color: "#dc2626" },
  { exam: "RRB Group D CBT", date: "3-21 August 2026", daysLeft: 15, color: "#dc2626" },
  { exam: "IBPS PO Prelims", date: "22 August 2026", daysLeft: 37, color: "#ca8a04" },
  { exam: "UPSC Mains", date: "21 August 2026", daysLeft: 36, color: "#ca8a04" },
  { exam: "CTET", date: "6 September 2026", daysLeft: 49, color: "#1e3a8a" },
  { exam: "RRB NTPC CBT 1", date: "September 2026", daysLeft: 60, color: "#1e3a8a" },
];

const categories = [
  { label: "Latest Jobs", icon: "💼", href: "#jobs", count: "15+", color: "#1e3a8a" },
  { label: "Results", icon: "📊", href: "#results", count: "6", color: "#16a34a" },
  { label: "Admit Cards", icon: "🪪", href: "/admitcard", count: "Soon", color: "#7c3aed" },
  { label: "State Jobs", icon: "🏛️", href: "/states", count: "20 States", color: "#dc2626" },
  { label: "Mock Tests", icon: "📝", href: "/mocktest", count: "Free", color: "#ca8a04" },
  { label: "Question Bank", icon: "📚", href: "/questions", count: "800+", color: "#0891b2" },
  { label: "AI Coach", icon: "🎯", href: "/coach", count: "New", color: "#16a34a" },
  { label: "Daily Mission", icon: "📅", href: "/mission", count: "AI", color: "#7c3aed" },
];

const gptQuestions = [
  "SSC CGL 2026 crack karne ki strategy?",
  "Railway Group D vs NTPC — kaunsa better?",
  "UPSC 6 months mein kaise prepare karein?",
  "Banking exam cut off kitna hota hai?",
  "Agniveer 2026 physical test details?",
  "BPSC 72nd CCE preparation tips?",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/api/jobs?limit=6')
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []));
    fetch('/api/results?limit=6')
      .then(res => res.json())
      .then(data => setResults(data.results || []));
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Top Banner */}
      <div style={{ backgroundColor: '#dc2626', color: 'white', padding: '7px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600' }}>
        🔴 LIVE — RRB Group D Exam: 3 Aug 2026 | IBPS PO Apply: 21 July 2026 | SSC CGL Tier 1: August 2026
      </div>

      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #1e3a8a', flexWrap: 'wrap', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e3a8a', margin: 0, letterSpacing: '-0.5px' }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '11px', margin: '2px 0 0 0', fontWeight: '500' }}>India's First AI-Powered Sarkari Career Companion</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a href="/sarkarigpt" style={{ padding: '8px 14px', backgroundColor: '#fef9c3', border: '1px solid #ca8a04', borderRadius: '6px', color: '#92400e', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>🤖 SarkariGPT</a>
          <a href="/login" style={{ padding: '8px 14px', border: '2px solid #1e3a8a', borderRadius: '6px', color: '#1e3a8a', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Login</a>
          <a href="/register" style={{ padding: '8px 14px', backgroundColor: '#1e3a8a', borderRadius: '6px', color: 'white', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Register Free</a>
        </div>
      </header>

      {/* Nav */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '0 20px', display: 'flex', justifyContent: 'center', gap: '0', flexWrap: 'wrap', overflowX: 'auto' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '#jobs' },
          { label: 'Results', href: '#results' },
          { label: 'State Jobs', href: '/states' },
          { label: 'Mock Test', href: '/mocktest' },
          { label: 'Questions', href: '/questions' },
          { label: 'SarkariGPT', href: '/sarkarigpt' },
          { label: 'AI Coach', href: '/coach', color: '#4ade80' },
          { label: 'Daily Mission', href: '/mission' },
          { label: 'Profile', href: '/profile' },
          { label: 'Dashboard', href: '/dashboard' },
        ].map((item, index) => (
          <a key={index} href={item.href} style={{ color: item.color || 'white', textDecoration: 'none', fontSize: '12px', fontWeight: '500', padding: '12px 14px', whiteSpace: 'nowrap', borderBottom: '3px solid transparent' }}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #1d4ed8 100%)', padding: '40px 20px 32px', textAlign: 'center' }}>
        <p style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fbbf24', fontSize: '12px', fontWeight: 'bold', padding: '5px 16px', borderRadius: '20px', margin: '0 0 14px 0', border: '1px solid rgba(251,191,36,0.4)' }}>
          🤖 India's First AI-Powered Sarkari Career Companion
        </p>
        <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: '1.2' }}>
          Apni Sarkari Naukri Dhundein AI ke Saath
        </h2>
        <p style={{ color: '#bfdbfe', fontSize: '15px', margin: '0 0 28px 0' }}>
          SSC • Railway • UPSC • Banking • State PSC — Sab Ek Jagah
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '580px', margin: '0 auto 16px auto', display: 'flex', gap: '8px', backgroundColor: 'white', borderRadius: '10px', padding: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <input
            type="text"
            placeholder="Search jobs — SSC, Railway, UPSC, Banking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#1a1a1a', backgroundColor: 'transparent', padding: '8px 12px' }}
          />
          <button style={{ padding: '10px 20px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            Search
          </button>
        </div>

        {/* SarkariGPT Panel */}
        <div style={{ maxWidth: '580px', margin: '0 auto', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>🤖</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>SarkariGPT</p>
                <p style={{ color: '#bfdbfe', fontSize: '11px', margin: 0 }}>Hindi, Tamil, Telugu & 9 more languages</p>
              </div>
            </div>
            <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
              Ask Now →
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {gptQuestions.map((q, i) => (
              <a key={i} href={"/sarkarigpt?q=" + encodeURIComponent(q)}
                style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#e0f2fe', padding: '5px 12px', borderRadius: '16px', textDecoration: 'none', fontSize: '11px', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
                {q}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ backgroundColor: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', borderBottom: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {[
          { value: '50,000+', label: 'Active Jobs' },
          { value: '1,00,000+', label: 'Students' },
          { value: '800+', label: 'Questions' },
          { value: '14+', label: 'AI Features' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a8a' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '500' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Category Grid */}
      <div style={{ maxWidth: '960px', margin: '24px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '32px' }}>
          {categories.map((cat, i) => (
            <a key={i} href={cat.href} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px 12px', textAlign: 'center', textDecoration: 'none', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              <span style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '13px' }}>{cat.label}</span>
              <span style={{ backgroundColor: cat.color, color: 'white', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{cat.count}</span>
            </a>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>

          {/* Latest Jobs */}
          <div id="jobs">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '18px', color: '#1e3a8a', margin: 0, fontWeight: '800' }}>💼 Latest Jobs</h2>
              <a href="#jobs" style={{ fontSize: '12px', color: '#dc2626', textDecoration: 'none', fontWeight: 'bold' }}>View All →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredJobs.length === 0 && searchQuery === '' && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', backgroundColor: 'white', borderRadius: '8px', fontSize: '13px' }}>Loading...</div>
              )}
              {filteredJobs.length === 0 && searchQuery !== '' && (
                <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', backgroundColor: 'white', borderRadius: '8px', fontSize: '13px' }}>No jobs found for "{searchQuery}"</div>
              )}
              {filteredJobs.map((job, index) => (
                <a key={index} href={"/jobs/" + job.slug} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px 14px', textDecoration: 'none', display: 'block', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                        {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '9px', padding: '1px 5px', borderRadius: '3px', fontWeight: 'bold', flexShrink: 0 }}>NEW</span>}
                        <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '13px', margin: 0, lineHeight: '1.3' }}>{job.title}</p>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '11px', margin: '0 0 3px 0' }}>{job.org}</p>
                      <p style={{ color: '#374151', fontSize: '11px', margin: 0 }}>
                        <span style={{ color: '#1e3a8a', fontWeight: '700' }}>{job.vacancies}</span> vacancies
                        <span style={{ color: '#dc2626', marginLeft: '8px', fontWeight: '600' }}>Last: {job.last_date}</span>
                      </p>
                    </div>
                  </div>
                </a>
              ))}
              <a href="#jobs" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', marginTop: '4px' }}>
                View All Jobs →
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Latest Results */}
            <div id="results">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '18px', color: '#1e3a8a', margin: 0, fontWeight: '800' }}>📊 Latest Results</h2>
                <a href="#results" style={{ fontSize: '12px', color: '#dc2626', textDecoration: 'none', fontWeight: 'bold' }}>View All →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {results.slice(0, 4).map((item, index) => (
                  <a key={index} href={"/results/" + item.slug} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div>
                      <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{item.exam}</p>
                      <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>{item.result_date}</p>
                    </div>
                    <span style={{ backgroundColor: '#dcfce7', color: '#16a34a', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', flexShrink: 0 }}>
                      {item.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Exam Calendar */}
            <div id="calendar">
              <h2 style={{ fontSize: '18px', color: '#1e3a8a', margin: '0 0 12px 0', fontWeight: '800' }}>📅 Exam Calendar</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {examCalendar.slice(0, 4).map((item, index) => (
                  <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div>
                      <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '12px', margin: '0 0 2px 0' }}>{item.exam}</p>
                      <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>{item.date}</p>
                    </div>
                    <span style={{ backgroundColor: item.daysLeft <= 20 ? '#fee2e2' : item.daysLeft <= 40 ? '#fef9c3' : '#dbeafe', color: item.color, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold', flexShrink: 0 }}>
                      {item.daysLeft}d left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Banner */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #7c3aed)', borderRadius: '14px', padding: '28px', marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700' }}>AI Selection Coach</h3>
            <p style={{ color: '#c4b5fd', fontSize: '12px', margin: '0 0 12px 0' }}>Personalized weakness analysis and study plan</p>
            <a href="/coach" style={{ backgroundColor: '#4ade80', color: '#1a1a1a', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Try Now</a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🤖</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700' }}>SarkariGPT</h3>
            <p style={{ color: '#c4b5fd', fontSize: '12px', margin: '0 0 12px 0' }}>AI career guide in Hindi & 11 regional languages</p>
            <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1a1a1a', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Ask Now</a>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700' }}>Daily AI Mission</h3>
            <p style={{ color: '#c4b5fd', fontSize: '12px', margin: '0 0 12px 0' }}>Personalized daily study tasks every morning</p>
            <a href="/mission" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>View Mission</a>
          </div>
        </div>

        {/* Mock Test + Question Bank */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '2px solid #1e3a8a', boxShadow: '0 2px 8px rgba(30,58,138,0.1)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 6px 0', fontSize: '16px' }}>Free Mock Tests</h3>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 16px 0' }}>Timed tests for SSC, Railway, UPSC, Banking</p>
            <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Start Test</a>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '2px solid #dc2626', boxShadow: '0 2px 8px rgba(220,38,38,0.1)' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
            <h3 style={{ color: '#dc2626', margin: '0 0 6px 0', fontSize: '16px' }}>Question Bank</h3>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 16px 0' }}>800+ practice questions with explanations</p>
            <a href="/questions" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>Practice Now</a>
          </div>
        </div>

        {/* State Jobs Banner */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '32px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800' }}>🏛️ State Government Jobs</h3>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>BPSC, UPPSC, TNPSC, Kerala PSC, MPSC — 20 states, local languages</p>
          </div>
          <a href="/states" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>
            Explore State Jobs →
          </a>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '30px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0' }}>
                Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
              </h3>
              <p style={{ color: '#93c5fd', fontSize: '12px', margin: 0 }}>India's First AI-Powered Sarkari Career Companion</p>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '11px', margin: '0 0 8px 0', fontWeight: 'bold' }}>QUICK LINKS</p>
                {[
                  { label: 'Jobs', href: '#jobs' },
                  { label: 'Results', href: '#results' },
                  { label: 'Mock Test', href: '/mocktest' },
                  { label: 'SarkariGPT', href: '/sarkarigpt' },
                  { label: 'State Jobs', href: '/states' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '12px', marginBottom: '4px' }}>{link.label}</a>
                ))}
              </div>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '11px', margin: '0 0 8px 0', fontWeight: 'bold' }}>AI FEATURES</p>
                {[
                  { label: 'AI Coach', href: '/coach' },
                  { label: 'Daily Mission', href: '/mission' },
                  { label: 'Question Bank', href: '/questions' },
                  { label: 'My Profile', href: '/profile' },
                  { label: 'Dashboard', href: '/dashboard' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '12px', marginBottom: '4px' }}>{link.label}</a>
                ))}
              </div>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '11px', margin: '0 0 8px 0', fontWeight: 'bold' }}>ACCOUNT</p>
                {[
                  { label: 'Login', href: '/login' },
                  { label: 'Register Free', href: '/register' },
                ].map((link, i) => (
                  <a key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '12px', marginBottom: '4px' }}>{link.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ color: '#93c5fd', fontSize: '12px', margin: '0 0 6px 0' }}>2026 Sarkari Success. All rights reserved. sarkarisuccess.com</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="/privacy" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '12px' }}>Privacy Policy</a>
                <a href="/terms" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '12px' }}>Terms of Service</a>
                <a href="/sarkarigpt" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '12px' }}>SarkariGPT</a>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#93c5fd', fontSize: '11px', margin: '0 0 6px 0' }}>Scan to open on mobile</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://sarkarisuccess.com&color=ffffff&bgcolor=1e3a8a"
                alt="QR Code"
                style={{ width: '90px', height: '90px', borderRadius: '6px', border: '2px solid rgba(255,255,255,0.3)' }}
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}