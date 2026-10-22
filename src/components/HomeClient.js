"use client";
import { useState, useEffect } from "react";

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/api/jobs?limit=50')
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
    <>
      {/* Search Bar */}
      <div style={{ maxWidth: '650px', margin: '0 auto 16px auto', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search SSC, Railway, UPSC, Banking jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })}
          style={{ flex: 1, padding: '14px 20px', borderRadius: '8px', border: '2px solid white', fontSize: '15px', outline: 'none', color: '#1a1a1a', backgroundColor: 'white' }}
        />
        <button
          onClick={() => document.getElementById('jobs').scrollIntoView({ behavior: 'smooth' })}
          style={{ padding: '14px 24px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>

      {/* Jobs Grid — rendered client-side after hydration */}
      <div id="jobs-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
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

      {/* Results Grid — rendered client-side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '14px' }} id="results-list">
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
    </>
  );
}
