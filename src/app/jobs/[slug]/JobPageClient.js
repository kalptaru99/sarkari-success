"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const STATUS_CONFIG = {
  NEW:          { label: '🟢 New',          bg: '#dcfce7', color: '#15803d', border: '#86efac' },
  OPEN:         { label: '🔵 Open',         bg: '#dbeafe', color: '#1d4ed8', border: '#93c5fd' },
  CLOSING_SOON: { label: '🟡 Closing Soon', bg: '#fef9c3', color: '#a16207', border: '#fde047' },
  CLOSED:       { label: '🔴 Closed',       bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5' },
  RESULT_OUT:   { label: '🏆 Result Out',   bg: '#f3e8ff', color: '#7e22ce', border: '#d8b4fe' },
};

const EVENT_LABELS = {
  STATUS_CHANGE:   { icon: '🔄', label: 'Status Changed' },
  DEADLINE_CHANGE: { icon: '📅', label: 'Deadline Updated' },
  NEW_JOB:         { icon: '🆕', label: 'Job Listed' },
  VACANCY_CHANGE:  { icon: '👥', label: 'Vacancy Updated' },
  NOTIFY_SENT:     { icon: '📧', label: 'Notifications Sent' },
};

function SaveButton({ slug }) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) { setLoading(false); return; }
    fetch(`/api/jobs/save?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setSaved(!!d.saved); setLoading(false); })
      .catch(() => setLoading(false));
  }, [session, slug]);

  const toggle = async () => {
    if (!session?.user) {
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      return;
    }
    setLoading(true);
    try {
      if (saved) {
        await fetch(`/api/jobs/save?slug=${slug}`, { method: 'DELETE' });
        setSaved(false);
      } else {
        await fetch('/api/jobs/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });
        setSaved(true);
      }
    } catch (e) {
      console.error('Save toggle error:', e);
    }
    setLoading(false);
  };

  if (!session?.user) {
    return (
      <a
        href={'/login?redirect=' + encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}
        style={{ backgroundColor: '#f8fafc', color: '#6b7280', border: '1px solid #d1d5db', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        🔖 Save Job
      </a>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        backgroundColor: saved ? '#fef3c7' : '#f8fafc',
        color: saved ? '#92400e' : '#374151',
        border: `1px solid ${saved ? '#fcd34d' : '#d1d5db'}`,
        padding: '10px 18px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '13px',
        cursor: loading ? 'wait' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
    >
      {loading ? '...' : saved ? '⭐ Saved' : '🔖 Save Job'}
    </button>
  );
}

function JobTimeline({ slug }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/jobs/events?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setEvents(d.events || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return null;
  if (!events.length) return null;

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
      <h3 style={{ color: '#1e3a8a', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '800' }}>📋 Status Timeline</h3>
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', backgroundColor: '#e5e7eb' }} />
        {events.map((ev, i) => {
          const cfg = EVENT_LABELS[ev.event_type] || { icon: '•', label: ev.event_type };
          const date = new Date(ev.happened_at);
          const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
          return (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < events.length - 1 ? '16px' : '0', alignItems: 'flex-start' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#1e3a8a', flexShrink: 0, marginTop: '2px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px' }}>
                ●
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#1e3a8a', fontSize: '13px' }}>{cfg.icon} {cfg.label}</span>
                  <span style={{ color: '#9ca3af', fontSize: '12px' }}>{dateStr}</span>
                </div>
                {ev.event_type === 'STATUS_CHANGE' && (
                  <p style={{ margin: '2px 0 0', color: '#374151', fontSize: '12px' }}>
                    {ev.old_value || '—'} → <strong>{ev.new_value}</strong>
                  </p>
                )}
                {ev.event_type === 'DEADLINE_CHANGE' && (
                  <p style={{ margin: '2px 0 0', color: '#374151', fontSize: '12px' }}>
                    Last date: {ev.old_value || '—'} → <strong>{ev.new_value}</strong>
                  </p>
                )}
                {(ev.event_type === 'NEW_JOB' || ev.event_type === 'VACANCY_CHANGE') && (
                  <p style={{ margin: '2px 0 0', color: '#374151', fontSize: '12px' }}>{ev.new_value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function JobPageClient({ slug }) {
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

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || job.title + " recruitment notification by " + job.org,
    "datePosted": job.created_at ? new Date(job.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    "validThrough": job.last_date ? job.last_date : "",
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.org,
      "sameAs": job.official_link || "https://sarkarisuccess.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "All India"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": 25500,
        "maxValue": 151100,
        "unitText": "MONTH"
      }
    },
    "employmentType": "FULL_TIME",
    "educationRequirements": "Bachelor's Degree",
    "experienceRequirements": "Freshers eligible",
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "India"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the last date to apply for " + job.title + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The last date to apply for " + job.title + " is " + job.last_date + ". Apply through the official website."
        }
      },
      {
        "@type": "Question",
        "name": "How many vacancies are there in " + job.title + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are " + job.vacancies + " vacancies in " + job.title + " by " + job.org + "."
        }
      },
      {
        "@type": "Question",
        "name": "What is the salary for " + job.title + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": job.salary || "Salary details are available in the official notification for " + job.title + "."
        }
      },
      {
        "@type": "Question",
        "name": "What is the eligibility for " + job.title + "?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": job.eligibility || "Check the official notification for " + job.title + " eligibility criteria."
        }
      }
    ]
  };

  const s = STATUS_CONFIG[job.lifecycle_status || 'OPEN'] || STATUS_CONFIG.OPEN;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '24px', color: '#1e3a8a', margin: 0 }}>{job.title}</h2>
                <span style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
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
            ].filter(item => item.value && item.value !== 'TBA' && item.value !== 'See notification' && !item.value.toLowerCase().includes('tba')).map((item, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '14px', border: '1px solid #e5e7eb' }}>
                <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px 0' }}>{item.icon} {item.label}</p>
                <p style={{ color: item.urgent ? '#dc2626' : '#1e3a8a', fontSize: '15px', fontWeight: 'bold', margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons — Apply + Save */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
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
            {/* Save Job button — auth-aware */}
            <SaveButton slug={slug} />
          </div>

          {/* Closing Soon warning banner */}
          {job.lifecycle_status === 'CLOSING_SOON' && (
            <div style={{ marginTop: '16px', backgroundColor: '#fef9c3', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <span style={{ color: '#92400e', fontWeight: '600', fontSize: '14px' }}>Closing Soon — Apply before the last date passes!</span>
            </div>
          )}
        </div>

        {/* Status Timeline */}
        <JobTimeline slug={slug} />

        {/* AI Generated Rich Content */}
        {job.seo_content && (
          <>
            {job.seo_content.intro && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <p style={{ color: '#374151', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>{job.seo_content.intro}</p>
              </div>
            )}
            {job.seo_content.important_dates && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>📅 Important Dates</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.important_dates}</p>
              </div>
            )}
            {job.seo_content.eligibility_summary && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>📋 Eligibility Criteria</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.eligibility_summary}</p>
              </div>
            )}
            {job.seo_content.age_limit && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>🎂 Age Limit</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.age_limit}</p>
              </div>
            )}
            {job.seo_content.application_fee && (
              <div style={{ backgroundColor: '#fef9c3', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px', border: '1px solid #fde68a' }}>
                <h3 style={{ color: '#92400e', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>💳 Application Fee</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.application_fee}</p>
              </div>
            )}
            {job.seo_content.selection_process && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>🎯 Selection Process</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.selection_process}</p>
              </div>
            )}
            {job.seo_content.salary_details && (
              <div style={{ backgroundColor: '#f0fdf4', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px', border: '1px solid #bbf7d0' }}>
                <h3 style={{ color: '#166534', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>💰 Salary Details</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.salary_details}</p>
              </div>
            )}
            {job.seo_content.how_to_apply && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800' }}>📝 How to Apply</h3>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-line' }}>{job.seo_content.how_to_apply}</p>
              </div>
            )}
          </>
        )}

        {/* Eligibility — only show if no seo_content */}
        {job.eligibility && !job.seo_content && (
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

        {/* FAQ Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 20px 0' }}>Frequently Asked Questions</h3>
          {[
            { q: `What is the last date to apply for ${job.title}?`, a: `The last date to apply for ${job.title} is ${job.last_date}. Apply before the deadline through the official website.` },
            { q: `How many vacancies are there in ${job.title}?`, a: job.vacancies && !job.vacancies.toLowerCase().includes('check') ? `There are ${job.vacancies} vacancies in ${job.title} by ${job.org}.` : `Vacancy details are available in the official notification for ${job.title} by ${job.org}.` },
            { q: `What is the salary for ${job.title}?`, a: job.salary && job.salary !== 'TBA' && !job.salary.toLowerCase().includes('check') ? `The salary for ${job.title} is ${job.salary}.` : `Salary details are mentioned in the official notification for ${job.title}. Visit the official website for exact pay scale.` },
            { q: `What is the eligibility for ${job.title}?`, a: job.eligibility ? job.eligibility : `Check the official notification for ${job.title} eligibility criteria including age limit and educational qualification.` },
            { q: `How to apply for ${job.title}?`, a: `To apply for ${job.title}, visit the official website of ${job.org}, register with your details, fill the application form, upload required documents and pay the application fee before ${job.last_date}.` },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: i < 4 ? '1px solid #e2e8f0' : 'none', paddingBottom: '16px', marginBottom: '16px' }}>
              <h4 style={{ color: '#1e3a8a', fontSize: '14px', fontWeight: '700', margin: '0 0 6px 0' }}>Q: {faq.q}</h4>
              <p style={{ color: '#374151', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>A: {faq.a}</p>
            </div>
          ))}
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
