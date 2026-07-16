"use client";
import { useState } from "react";

const categories = ["SSC", "Railway", "UPSC", "Banking", "Defence", "Police", "Teaching", "State PSC", "Others"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("addjob");
  const [jobForm, setJobForm] = useState({
    title: "", org: "", vacancies: "", last_date: "",
    apply_link: "", notification_link: "", exam_date: "",
    salary: "", eligibility: "", description: "", category: "SSC", slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [genExam, setGenExam] = useState("SSC CGL");
  const [genTopic, setGenTopic] = useState("General Intelligence");
  const [genCount, setGenCount] = useState(10);
  const [genLoading, setGenLoading] = useState(false);
  const [genResults, setGenResults] = useState([]);

  const exams = ["SSC CGL", "SSC CHSL", "RRB NTPC", "RRB Group D", "UPSC Civil Services", "IBPS PO", "IBPS Clerk", "SBI PO"];
  const topics = {
    "SSC CGL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
    "SSC CHSL": ["General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
    "RRB NTPC": ["Mathematics", "General Intelligence", "General Awareness", "English Language"],
    "RRB Group D": ["Mathematics", "General Intelligence", "General Science", "General Awareness"],
    "UPSC Civil Services": ["History", "Geography", "Polity", "Economy", "Current Affairs"],
    "IBPS PO": ["Reasoning", "English Language", "Quantitative Aptitude", "General Awareness"],
    "IBPS Clerk": ["Reasoning", "English Language", "Numerical Ability", "General Awareness"],
    "SBI PO": ["Reasoning", "English Language", "Data Analysis", "General Awareness"],
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setJobForm(prev => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handleSubmitJob = async () => {
    if (!jobForm.title || !jobForm.org || !jobForm.slug) {
      setError("Title, organization and slug are required");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobForm),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMessage(`✅ Job "${jobForm.title}" added successfully!`);
        setJobForm({
          title: "", org: "", vacancies: "", last_date: "",
          apply_link: "", notification_link: "", exam_date: "",
          salary: "", eligibility: "", description: "", category: "SSC", slug: "",
        });
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const generateQuestions = async () => {
    setGenLoading(true);
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam: genExam, topic: genTopic, count: genCount }),
      });
      const data = await response.json();
      if (data.success) {
        setGenResults(prev => [...prev, { exam: genExam, topic: genTopic, count: data.inserted, time: new Date().toLocaleTimeString() }]);
      }
    } catch (error) {
      console.error("Generation error:", error);
    }
    setGenLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — Admin Panel
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Site</a>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 24px', display: 'flex', gap: '0' }}>
        {[
          { id: 'addjob', label: '➕ Add Job' },
          { id: 'questions', label: '📝 Generate Questions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 24px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              color: activeTab === tab.id ? '#1e3a8a' : '#666',
              borderBottom: activeTab === tab.id ? '3px solid #1e3a8a' : '3px solid transparent',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px' }}>

        {/* Add Job Tab */}
        {activeTab === 'addjob' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 24px 0' }}>Add New Job Notification</h2>

            {message && <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{message}</div>}
            {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Job Title *</label>
                <input
                  type="text"
                  placeholder="e.g. SSC CGL 2026 Recruitment"
                  value={jobForm.title}
                  onChange={handleTitleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>URL Slug *</label>
                <input
                  type="text"
                  placeholder="e.g. ssc-cgl-2026-recruitment"
                  value={jobForm.slug}
                  onChange={(e) => setJobForm(prev => ({ ...prev, slug: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>Page will be at: sarkarisuccess.com/jobs/{jobForm.slug}</p>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Organization *</label>
                <input
                  type="text"
                  placeholder="e.g. Staff Selection Commission"
                  value={jobForm.org}
                  onChange={(e) => setJobForm(prev => ({ ...prev, org: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Category</label>
                <select
                  value={jobForm.category}
                  onChange={(e) => setJobForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
                >
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Total Vacancies</label>
                <input
                  type="text"
                  placeholder="e.g. 17,727"
                  value={jobForm.vacancies}
                  onChange={(e) => setJobForm(prev => ({ ...prev, vacancies: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Last Date to Apply</label>
                <input
                  type="text"
                  placeholder="e.g. 31 July 2026"
                  value={jobForm.last_date}
                  onChange={(e) => setJobForm(prev => ({ ...prev, last_date: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Exam Date</label>
                <input
                  type="text"
                  placeholder="e.g. September 2026"
                  value={jobForm.exam_date}
                  onChange={(e) => setJobForm(prev => ({ ...prev, exam_date: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Salary</label>
                <input
                  type="text"
                  placeholder="e.g. ₹47,600 - ₹1,51,100"
                  value={jobForm.salary}
                  onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Eligibility</label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor's degree, Age 18-32 years"
                  value={jobForm.eligibility}
                  onChange={(e) => setJobForm(prev => ({ ...prev, eligibility: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Apply Link</label>
                <input
                  type="text"
                  placeholder="e.g. https://ssc.gov.in/apply"
                  value={jobForm.apply_link}
                  onChange={(e) => setJobForm(prev => ({ ...prev, apply_link: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Official Notification Link</label>
                <input
                  type="text"
                  placeholder="e.g. https://ssc.gov.in/notification.pdf"
                  value={jobForm.notification_link}
                  onChange={(e) => setJobForm(prev => ({ ...prev, notification_link: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description</label>
                <textarea
                  placeholder="Brief description of the job notification..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

            </div>

            <button
              onClick={handleSubmitJob}
              disabled={loading}
              style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Adding Job...' : '➕ Add Job Notification'}
            </button>
          </div>
        )}

        {/* Generate Questions Tab */}
        {activeTab === 'questions' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 20px 0' }}>Generate Questions</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Exam</label>
                <select
                  value={genExam}
                  onChange={(e) => { setGenExam(e.target.value); setGenTopic(topics[e.target.value][0]); }}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
                >
                  {exams.map((exam, i) => <option key={i} value={exam}>{exam}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Topic</label>
                <select
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
                >
                  {topics[genExam].map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Number of Questions</label>
              <select
                value={genCount}
                onChange={(e) => setGenCount(parseInt(e.target.value))}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {[5, 10, 20, 30, 50].map(n => <option key={n} value={n}>{n} questions</option>)}
              </select>
            </div>

            <button
              onClick={generateQuestions}
              disabled={genLoading}
              style={{ width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: genLoading ? 'not-allowed' : 'pointer', opacity: genLoading ? 0.7 : 1 }}
            >
              {genLoading ? 'Generating...' : `Generate ${genCount} Questions`}
            </button>

            {genResults.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>Generation Log</h3>
                {genResults.map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#dcfce7', borderRadius: '6px', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✅ {r.exam} — {r.topic}</span>
                    <span style={{ color: '#16a34a' }}>{r.count} questions • {r.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}