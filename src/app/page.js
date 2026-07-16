"use client";
import { useState } from "react";
import Link from "next/link"; // ← ADD THIS IMPORT
import { useRouter } from "next/navigation";

const jobs = [
  {
    title: "SSC CGL 2026",
    org: "Staff Selection Commission",
    vacancies: "17,727",
    lastDate: "31 July 2026",
    isNew: true,
    link: "https://ssc.gov.in",
  },
  {
    title: "RRB NTPC 2026",
    org: "Railway Recruitment Board",
    vacancies: "11,558",
    lastDate: "15 August 2026",
    isNew: true,
    link: "https://indianrailways.gov.in",
  },
  {
    title: "IBPS PO 2026",
    org: "Institute of Banking Personnel Selection",
    vacancies: "6,432",
    lastDate: "10 August 2026",
    isNew: false,
    link: "https://ibps.in",
  },
  {
    title: "UPSC Civil Services 2026",
    org: "Union Public Service Commission",
    vacancies: "1,056",
    lastDate: "5 September 2026",
    isNew: false,
    link: "https://upsc.gov.in",
  },
];

const examCalendar = [
  { exam: "SSC CGL Tier 1", date: "20 July 2026", daysLeft: 5 },
  { exam: "RRB NTPC CBT 1", date: "5 August 2026", daysLeft: 21 },
  { exam: "IBPS PO Prelims", date: "12 August 2026", daysLeft: 28 },
  { exam: "UPSC Prelims", date: "24 August 2026", daysLeft: 40 },
];

const results = [
  { exam: "SSC CHSL 2025", org: "Staff Selection Commission", status: "Declared", date: "28 June 2026", link: "https://ssc.gov.in" },
  { exam: "RRB Group D 2025", org: "Railway Recruitment Board", status: "Declared", date: "25 June 2026", link: "https://indianrailways.gov.in" },
  { exam: "IBPS Clerk 2025", org: "Institute of Banking Personnel Selection", status: "Expected Soon", date: "July 2026", link: "https://ibps.in" },
  { exam: "UPSC NDA 2025", org: "Union Public Service Commission", status: "Declared", date: "20 June 2026", link: "https://upsc.gov.in" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Top bar */}
      <div style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 20px', textAlign: 'center', fontSize: '13px' }}>
        📢 India's First AI-Powered Sarkari Career Companion — <Link href="/sarkarigpt" style={{ color: '#fca5a5', textDecoration: 'none', fontWeight: 'bold' }}>Try SarkariGPT Free →</Link>
      </div>

      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #1e3a8a', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <p style={{ color: '#555', fontSize: '12px', margin: '2px 0 0 0' }}>
            AI-Powered Sarkari Naukri, Results & Exam Updates
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/login" style={{ padding: '8px 16px', border: '2px solid #1e3a8a', borderRadius: '6px', color: '#1e3a8a', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Login
          </Link>
          <Link href="/register" style={{ padding: '8px 16px', backgroundColor: '#1e3a8a', borderRadius: '6px', color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
            Register Free
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#1e3a8a', padding: '10px 20px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '#jobs' },
          { label: 'Results', href: '#results' },
          { label: 'Exam Calendar', href: '#calendar' },
          { label: 'Mock Test', href: '/mocktest' },
          { label: 'Question Bank', href: '/questions' },
          { label: 'SarkariGPT 🤖', href: '/sarkarigpt' },
          { label: 'Dashboard', href: '/dashboard' },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            style={{ color: 'white', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Alert ticker */}
      <div style={{ backgroundColor: '#fee2e2', borderTop: '1px solid #dc2626', borderBottom: '1px solid #dc2626', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
        <span style={{ backgroundColor: '#dc2626', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
          LIVE
        </span>
        <span style={{ color: '#991b1b', fontSize: '13px', whiteSpace: 'nowrap' }}>
          🔴 SSC CGL 2026 — 17,727 Vacancies | 🔴 RRB NTPC 2026 — 11,558 Vacancies | 🔴 UPSC Civil Services 2026 — 1,056 Vacancies | 🔴 IBPS PO 2026 — 6,432 Vacancies
        </span>
      </div>

      {/* Hero Section */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
          Find Your Sarkari Naukri with AI
        </h2>
        <p style={{ color: '#93c5fd', fontSize: '15px', margin: '0 0 24px 0' }}>
          SSC, Railway, UPSC, Banking — All Govt Jobs in One Place
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search SSC, Railway, UPSC, Banking jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              outline: 'none',
              color: '#1a1a1a',
            }}
          />
          <button style={{
            padding: '14px 24px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            Search
          </button>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
          {[
            { label: '🤖 SarkariGPT', href: '/sarkarigpt' },
            { label: '📝 Mock Test', href: '/mocktest' },
            { label: '📚 Question Bank', href: '/questions' },
            { label: '👤 My Dashboard', href: '/dashboard' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              style={{
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '13px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ backgroundColor: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', borderBottom: '1px solid #e5e7eb' }}>
        {[
          { value: '50,000+', label: 'Active Jobs' },
          { value: '1,00,000+', label: 'Students' },
          { value: '500+', label: 'Mock Tests' },
          { value: '14+', label: 'AI Features' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Job Listings */}
        <div id="jobs" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: 0 }}>Latest Sarkari Jobs</h2>
            <Link href="#jobs" style={{ color: '#dc2626', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold' }}>View All →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredJobs.map((job, index) => (
              <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', color: '#1e3a8a', margin: 0 }}>{job.title}</h3>
                    {job.isNew && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                  </div>
                  <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>{job.org}</p>
                  <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>
                    Vacancies: <strong>{job.vacancies}</strong> &nbsp;|&nbsp; Last Date: <strong style={{ color: '#dc2626' }}>{job.lastDate}</strong>
                  </p>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}
                >
                  View Details →
                </a>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                No jobs found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* SarkariGPT Banner */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '28px', textAlign: 'center', marginBottom: '40px', backgroundImage: 'linear-gradient(135deg, #1e3a8a, #1e40af)' }}>
          <h3 style={{ color: 'white', fontSize: '22px', margin: '0 0 8px 0' }}>🤖 Meet SarkariGPT</h3>
          <p style={{ color: '#93c5fd', margin: '0 0 20px 0', fontSize: '14px' }}>
            India's First AI Career Guide for Govt Jobs — Ask anything in Hindi or English
          </p>
          <Link
            href="/sarkarigpt"
            style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}
          >
            Chat with SarkariGPT →
          </Link>
        </div>

        {/* Exam Calendar */}
        <div id="calendar" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: 0 }}>Upcoming Exam Calendar</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  <Link href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
                    Practice →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div id="results" style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: 0 }}>Latest Results</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {results.map((item, index) => (
              <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', color: '#1e3a8a', margin: '0 0 4px 0' }}>{item.exam}</h3>
                  <p style={{ color: '#666', fontSize: '12px', margin: '0 0 2px 0' }}>{item.org}</p>
                  <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>Result Date: <strong>{item.date}</strong></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ backgroundColor: item.status === 'Declared' ? '#dcfce7' : '#fef9c3', color: item.status === 'Declared' ? '#16a34a' : '#ca8a04', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                    {item.status}
                  </span>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
                    Check Result →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Test + Question Bank CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #1e3a8a' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0' }}>Free Mock Tests</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 16px 0' }}>Timed tests for SSC, Railway, UPSC, Banking</p>
            <Link href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
              Start Test →
            </Link>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #dc2626' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>📚</div>
            <h3 style={{ color: '#dc2626', margin: '0 0 8px 0' }}>Question Bank</h3>
            <p style={{ color: '#666', fontSize: '13px', margin: '0 0 16px 0' }}>Practice questions with explanations</p>
            <Link href="/questions" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>
              Practice Now →
            </Link>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '30px 20px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
              </h3>
              <p style={{ color: '#93c5fd', fontSize: '13px', margin: 0 }}>India's First AI-Powered Sarkari Career Companion</p>
            </div>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: '#93c5fd', fontSize: '12px', margin: '0 0 8px 0', fontWeight: 'bold' }}>QUICK LINKS</p>
                {[
                  { label: 'Jobs', href: '#jobs' },
                  { label: 'Results', href: '#results' },
                  { label: 'Mock Test', href: '/mocktest' },
                  { label: 'SarkariGPT', href: '/sarkarigpt' },
                ].map((link, i) => (
                  <Link key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>{link.label}</Link>
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
                  <Link key={i} href={link.href} style={{ display: 'block', color: 'white', textDecoration: 'none', fontSize: '13px', marginBottom: '4px' }}>{link.label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px', textAlign: 'center', fontSize: '12px', color: '#93c5fd' }}>
            © 2026 Sarkari Success. All rights reserved. | sarkarisuccess.com
          </div>
        </div>
      </footer>
    </main>
  );
}