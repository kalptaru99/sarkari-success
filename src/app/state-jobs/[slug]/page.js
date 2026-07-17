"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function StateJobPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/state-jobs?slug=" + slug)
      .then(res => res.json())
      .then(data => {
        setJob(data.job);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a', fontSize: '18px' }}>Loading...</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a' }}>Job not found</h2>
          <a href="/states" style={{ color: '#dc2626', textDecoration: 'none' }}>Back to States</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <a href="/states" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>Back to States</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>

        <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a>
          {' > '}
          <a href="/states" style={{ color: '#1e3a8a', textDecoration: 'none' }}>States</a>
          {' > '}
          {job.state}
          {' > '}
          {job.title}
        </p>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h2 style={{ fontSize: '22px', color: '#1e3a8a', margin: 0 }}>{job.title}</h2>
                {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
              </div>
              {job.title_local && (
                <p style={{ color: '#666', fontSize: '18px', margin: '0 0 6px 0' }}>{job.title_local}</p>
              )}
              <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>{job.org}</p>
              {job.org_local && (
                <p style={{ color: '#888', fontSize: '13px', margin: '2px 0 0 0' }}>{job.org_local}</p>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
              <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                {job.state}
              </span>
              <span style={{ backgroundColor: '#f3f4f6', color: '#666', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                {job.language}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Total Vacancies', value: job.vacancies },
              { label: 'Last Date', value: job.last_date, urgent: true },
              { label: 'Exam Date', value: job.exam_date },
              { label: 'Salary', value: job.salary },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px 0' }}>{item.label}</p>
                <p style={{ color: item.urgent ? '#dc2626' : '#1e3a8a', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {job.apply_link && (
            <a href={job.apply_link} target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', display: 'inline-block' }}>
              Apply Online
            </a>
          )}
        </div>

        {(job.description || job.description_local) && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>About This Recruitment</h3>
            {job.description && (
              <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: '0 0 12px 0' }}>{job.description}</p>
            )}
            {job.description_local && (
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px', borderLeft: '4px solid #1e3a8a' }}>
                <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>{job.description_local}</p>
              </div>
            )}
          </div>
        )}

        {job.eligibility && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>Eligibility Criteria</h3>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{job.eligibility}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>
            {job.state} exam ke baare mein poochein
          </h3>
          <p style={{ color: '#93c5fd', margin: '0 0 16px 0', fontSize: '14px' }}>
            SarkariGPT answers in {job.language} and English
          </p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Ask SarkariGPT
          </a>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #1e3a8a' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 8px 0' }}>Prepare for {job.state} Exams</h3>
          <p style={{ color: '#666', margin: '0 0 16px 0', fontSize: '14px' }}>Free mock tests and practice questions</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              Start Mock Test
            </a>
            <a href="/questions" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', border: '2px solid #1e3a8a' }}>
              Practice Questions
            </a>
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}