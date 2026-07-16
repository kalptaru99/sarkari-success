"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function JobPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      const response = await fetch(`/api/jobs?slug=${slug}`);
      const data = await response.json();
      setJob(data.job);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
    setLoading(false);
  };

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
          <a href="/" style={{ color: '#dc2626', textDecoration: 'none' }}>← Back to Home</a>
        </div>
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
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>

        {/* Breadcrumb */}
        <p style={{ color: '#666', fontSize: '13px', marginBottom: '16px' }}>
          <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Home</a> {' › '}
          <a href="/#jobs" style={{ color: '#1e3a8a', textDecoration: 'none' }}>Jobs</a> {' › '}
          {job.title}
        </p>

        {/* Job Header */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', color: '#1e3a8a', margin: 0 }}>{job.title}</h2>
                {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
              </div>
              <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>{job.org}</p>
            </div>
            <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              {job.category}
            </span>
          </div>

          {/* Key Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Total Vacancies', value: job.vacancies, icon: '👥' },
              { label: 'Last Date', value: job.last_date, icon: '📅', urgent: true },
              { label: 'Exam Date', value: job.exam_date, icon: '📝' },
              { label: 'Salary', value: job.salary, icon: '💰' },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px 0' }}>{item.icon} {item.label}</p>
                <p style={{ color: item.urgent ? '#dc2626' : '#1e3a8a', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {job.apply_link && (
              <a
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
              >
                Apply Online →
              </a>
            )}
            {job.notification_link && (
              <a
                href={job.notification_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
              >
                📄 Official Notification
              </a>
            )}
          </div>
        </div>

        {/* Eligibility */}
        {job.eligibility && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>📋 Eligibility Criteria</h3>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{job.eligibility}</p>
          </div>
        )}

        {/* Description */}
        {job.description && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>ℹ️ About This Recruitment</h3>
            <p style={{ color: '#444', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{job.description}</p>
          </div>
        )}

        {/* SarkariGPT CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>🤖 Have questions about this exam?</h3>
          <p style={{ color: '#93c5fd', margin: '0 0 16px 0', fontSize: '14px' }}>Ask SarkariGPT — AI-powered answers in Hindi & English</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Ask SarkariGPT →
          </a>
        </div>

        {/* Mock Test CTA */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '2px solid #1e3a8a' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '18px', margin: '0 0 8px 0' }}>📝 Prepare for {job.category} Exam</h3>
          <p style={{ color: '#666', margin: '0 0 16px 0', fontSize: '14px' }}>Take a free mock test and practice questions</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              Start Mock Test →
            </a>
            <a href="/questions" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', border: '2px solid #1e3a8a' }}>
              Practice Questions →
            </a>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        © 2026 Sarkari Success. All rights reserved. | sarkarisuccess.com
      </footer>
    </main>
  );
}