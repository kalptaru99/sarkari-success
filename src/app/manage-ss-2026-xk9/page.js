"use client";
import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "RajShiv@1949";

const categories = ["SSC", "Railway", "UPSC", "Banking", "Defence", "Police", "Teaching", "State PSC", "Others"];

function EditStateJob() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/state-jobs?limit=100')
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []));
  }, []);

  const handleSelect = (job) => {
    setSelectedJob({ ...job });
    setMessage("");
    setError("");
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch('/api/state-jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedJob),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage('Job updated successfully!');
        const updated = await fetch('/api/state-jobs?limit=100').then(r => r.json());
        setJobs(updated.jobs || []);
      }
    } catch (error) {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: '#1e3a8a', margin: '0 0 20px 0' }}>Edit State Job</h2>

      {!selectedJob ? (
        <div>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>Select a job to edit:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto' }}>
            {jobs.map((job, i) => (
              <div key={i}
                onClick={() => handleSelect(job)}
                style={{ padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1e3a8a', fontSize: '14px' }}>{job.title}</p>
                  <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>{job.state} — {job.category}</p>
                </div>
                <span style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '12px' }}>Edit</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedJob(null)}
            style={{ backgroundColor: 'transparent', border: '2px solid #1e3a8a', color: '#1e3a8a', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', marginBottom: '20px' }}
          >
            ← Back to List
          </button>

          {message && <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{message}</div>}
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Title (English)', key: 'title' },
              { label: 'Title (Local)', key: 'title_local' },
              { label: 'Organization', key: 'org' },
              { label: 'Organization (Local)', key: 'org_local' },
              { label: 'Vacancies', key: 'vacancies' },
              { label: 'Last Date', key: 'last_date' },
              { label: 'Exam Date', key: 'exam_date' },
              { label: 'Salary', key: 'salary' },
              { label: 'Apply Link', key: 'apply_link' },
              { label: 'Notification Link', key: 'notification_link' },
            ].map((field, i) => (
              <div key={i}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{field.label}</label>
                <input
                  type="text"
                  value={selectedJob[field.key] || ''}
                  onChange={(e) => setSelectedJob(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>
            ))}

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description (English)</label>
              <textarea
                value={selectedJob.description || ''}
                onChange={(e) => setSelectedJob(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description (Local Language)</label>
              <textarea
                value={selectedJob.description_local || ''}
                onChange={(e) => setSelectedJob(prev => ({ ...prev, description_local: e.target.value }))}
                rows={3}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Eligibility</label>
              <textarea
                value={selectedJob.eligibility || ''}
                onChange={(e) => setSelectedJob(prev => ({ ...prev, eligibility: e.target.value }))}
                rows={2}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={selectedJob.is_new || false}
                onChange={(e) => setSelectedJob(prev => ({ ...prev, is_new: e.target.checked }))}
              />
              <label style={{ fontSize: '14px', color: '#444' }}>Mark as NEW</label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={selectedJob.is_active || false}
                onChange={(e) => setSelectedJob(prev => ({ ...prev, is_active: e.target.checked }))}
              />
              <label style={{ fontSize: '14px', color: '#444' }}>Active (visible on site)</label>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Updating...' : '✏️ Update Job'}
          </button>
        </div>
      )}
    </div>
  );
}
function StateJobForm() {
  const statesList = [
    { code: "BR", name: "Bihar", language: "Hindi" },
    { code: "UP", name: "Uttar Pradesh", language: "Hindi" },
    { code: "RJ", name: "Rajasthan", language: "Hindi" },
    { code: "MP", name: "Madhya Pradesh", language: "Hindi" },
    { code: "JH", name: "Jharkhand", language: "Hindi" },
    { code: "HR", name: "Haryana", language: "Hindi" },
    { code: "UK", name: "Uttarakhand", language: "Hindi" },
    { code: "HP", name: "Himachal Pradesh", language: "Hindi" },
    { code: "CG", name: "Chhattisgarh", language: "Hindi" },
    { code: "TN", name: "Tamil Nadu", language: "Tamil" },
    { code: "AP", name: "Andhra Pradesh", language: "Telugu" },
    { code: "TS", name: "Telangana", language: "Telugu" },
    { code: "KL", name: "Kerala", language: "Malayalam" },
    { code: "KA", name: "Karnataka", language: "Kannada" },
    { code: "MH", name: "Maharashtra", language: "Marathi" },
    { code: "WB", name: "West Bengal", language: "Bengali" },
    { code: "GJ", name: "Gujarat", language: "Gujarati" },
    { code: "OD", name: "Odisha", language: "Odia" },
    { code: "PB", name: "Punjab", language: "Punjabi" },
    { code: "AS", name: "Assam", language: "Assamese" },
  ];

  const [form, setForm] = useState({
    title: "", title_local: "", org: "", org_local: "",
    state: "Bihar", state_code: "BR", language: "Hindi",
    vacancies: "", last_date: "", exam_date: "", salary: "",
    eligibility: "", eligibility_local: "", description: "",
    description_local: "", apply_link: "", notification_link: "",
    category: "State PSC", slug: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStateChange = (e) => {
    const selected = statesList.find(s => s.code === e.target.value);
    setForm(prev => ({ ...prev, state: selected.name, state_code: selected.code, language: selected.language }));
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSubmit = async () => {
    if (!form.title || !form.org || !form.slug) {
      setError("Title, org and slug are required");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/state-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setMessage("State job added successfully!");
        setForm({ title: "", title_local: "", org: "", org_local: "", state: "Bihar", state_code: "BR", language: "Hindi", vacancies: "", last_date: "", exam_date: "", salary: "", eligibility: "", eligibility_local: "", description: "", description_local: "", apply_link: "", notification_link: "", category: "State PSC", slug: "" });
      }
    } catch (error) {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div>
      {message && <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{message}</div>}
      {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>State *</label>
          <select value={form.state_code} onChange={handleStateChange}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}>
            {statesList.map((s, i) => <option key={i} value={s.code}>{s.name} </option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Category</label>
          <select value={form.category} onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}>
            {["State PSC", "State Police", "State TET", "State SSC", "State Court", "Others"].map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Job Title (English) *</label>
          <input type="text" placeholder="e.g. BPSC 72nd CCE 2026 Recruitment"
            value={form.title}
            onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value, slug: generateSlug(e.target.value) }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Job Title (Local Language)</label>
          <input type="text" placeholder="e.g. बीपीएससी 72वीं संयुक्त प्रतियोगिता परीक्षा 2026"
            value={form.title_local}
            onChange={(e) => setForm(prev => ({ ...prev, title_local: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Slug *</label>
          <input type="text" value={form.slug}
            onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>URL: sarkarisuccess.com/state-jobs/{form.slug}</p>
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Organization (English)</label>
          <input type="text" placeholder="e.g. Bihar Public Service Commission"
            value={form.org}
            onChange={(e) => setForm(prev => ({ ...prev, org: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Organization (Local Language)</label>
          <input type="text" placeholder="e.g. बिहार लोक सेवा आयोग"
            value={form.org_local}
            onChange={(e) => setForm(prev => ({ ...prev, org_local: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Vacancies</label>
          <input type="text" placeholder="e.g. 1186"
            value={form.vacancies}
            onChange={(e) => setForm(prev => ({ ...prev, vacancies: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Last Date</label>
          <input type="text" placeholder="e.g. 31 May 2026 (Closed)"
            value={form.last_date}
            onChange={(e) => setForm(prev => ({ ...prev, last_date: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Exam Date</label>
          <input type="text" placeholder="e.g. 26 July 2026"
            value={form.exam_date}
            onChange={(e) => setForm(prev => ({ ...prev, exam_date: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Salary</label>
          <input type="text" placeholder="e.g. Rs 56,100 - Rs 1,77,500"
            value={form.salary}
            onChange={(e) => setForm(prev => ({ ...prev, salary: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Apply Link</label>
          <input type="text" placeholder="e.g. https://bpsc.bih.nic.in"
            value={form.apply_link}
            onChange={(e) => setForm(prev => ({ ...prev, apply_link: e.target.value }))}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description (English)</label>
          <textarea placeholder="Brief description in English..."
            value={form.description}
            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description (Local Language)</label>
          <textarea placeholder="Local language description e.g. बीपीएससी 72वीं CCE 2026 अधिसूचना जारी..."
            value={form.description_local}
            onChange={(e) => setForm(prev => ({ ...prev, description_local: e.target.value }))}
            rows={3}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
          />
        </div>

      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Adding...' : '🗺️ Add State Job'}
      </button>
    </div>
  );
}
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("addjob");
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");


  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

 const handleLogin = () => {
    if (passwordInput === "RajShiv@1949") {
      sessionStorage.setItem("admin_auth", "true");
      setAuthenticated(true);
    } else {
      setPasswordError("Wrong password. Try again.");
    }
  };

  
  const [resultForm, setResultForm] = useState({
    exam: "", org: "", result_date: "", status: "Declared",
    result_link: "", scorecard_link: "", cutoff_link: "",
    description: "", category: "SSC", slug: "",
  });
  const [resultMessage, setResultMessage] = useState("");
  const [resultError, setResultError] = useState("");
  const [resultLoading, setResultLoading] = useState(false);
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
useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  
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
if (!authenticated) {
if (!authenticated) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Admin Panel — Restricted Access</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', marginBottom: '12px' }}
          />
          {passwordError && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{passwordError}</p>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Login to Admin
          </button>
        </div>
      </main>
    );
  }    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Admin Panel — Restricted Access</p>
          <input type="password" placeholder="Enter admin password" value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', marginBottom: '12px' }}
          />
          {passwordError && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{passwordError}</p>}
          <button onClick={handleLogin}
            style={{ width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
            Login to Admin
          </button>
        </div>
      </main>
    );
  }
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
          { id: 'addresult', label: '📊 Add Result' },
          { id: 'addstatejob', label: '🗺️ Add State Job' },
          { id: 'editstatejob', label: '✏️ Edit State Job' },
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
{/* Add Result Tab */}
        {activeTab === 'addresult' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 24px 0' }}>Add New Result</h2>

            {resultMessage && <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{resultMessage}</div>}
            {resultError && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{resultError}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Exam Name *</label>
                <input type="text" placeholder="e.g. SSC CHSL Tier 1 Result 2025-26"
                  value={resultForm.exam}
                  onChange={(e) => {
                    const exam = e.target.value;
                    setResultForm(prev => ({ ...prev, exam, slug: exam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }));
                  }}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Slug *</label>
                <input type="text" placeholder="e.g. ssc-chsl-tier1-result-2025-26"
                  value={resultForm.slug}
                  onChange={(e) => setResultForm(prev => ({ ...prev, slug: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>Page will be at: sarkarisuccess.com/results/{resultForm.slug}</p>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Organization *</label>
                <input type="text" placeholder="e.g. Staff Selection Commission"
                  value={resultForm.org}
                  onChange={(e) => setResultForm(prev => ({ ...prev, org: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Category</label>
                <select value={resultForm.category}
                  onChange={(e) => setResultForm(prev => ({ ...prev, category: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}>
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Result Date</label>
                <input type="text" placeholder="e.g. 27 February 2026"
                  value={resultForm.result_date}
                  onChange={(e) => setResultForm(prev => ({ ...prev, result_date: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Status</label>
                <select value={resultForm.status}
                  onChange={(e) => setResultForm(prev => ({ ...prev, status: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}>
                  {['Declared', 'Expected Soon', 'Awaited'].map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Result Link</label>
                <input type="text" placeholder="e.g. https://ssc.gov.in/result"
                  value={resultForm.result_link}
                  onChange={(e) => setResultForm(prev => ({ ...prev, result_link: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Scorecard Link</label>
                <input type="text" placeholder="https://ssc.gov.in/scorecard"
                  value={resultForm.scorecard_link}
                  onChange={(e) => setResultForm(prev => ({ ...prev, scorecard_link: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Cut Off Link</label>
                <input type="text" placeholder="https://ssc.gov.in/cutoff"
                  value={resultForm.cutoff_link}
                  onChange={(e) => setResultForm(prev => ({ ...prev, cutoff_link: e.target.value }))}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description</label>
                <textarea placeholder="Brief description of the result..."
                  value={resultForm.description}
                  onChange={(e) => setResultForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>
            </div>

            <button
              onClick={async () => {
                if (!resultForm.exam || !resultForm.org || !resultForm.slug) {
                  setResultError("Exam, organization and slug are required");
                  return;
                }
                setResultLoading(true);
                setResultError("");
                setResultMessage("");
                try {
                  const response = await fetch("/api/results", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resultForm),
                  });
                  const data = await response.json();
                  if (data.error) {
                    setResultError(data.error);
                  } else {
                    setResultMessage("Result added successfully!");
                    setResultForm({ exam: "", org: "", result_date: "", status: "Declared", result_link: "", scorecard_link: "", cutoff_link: "", description: "", category: "SSC", slug: "" });
                  }
                } catch (error) {
                  setResultError("Something went wrong.");
                }
                setResultLoading(false);
              }}
              disabled={resultLoading}
              style={{ marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: resultLoading ? 'not-allowed' : 'pointer', opacity: resultLoading ? 0.7 : 1 }}
            >
              {resultLoading ? 'Adding Result...' : '📊 Add Result'}
            </button>
          </div>
        )}
        {/* Add State Job Tab */}
        {activeTab === 'addstatejob' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 24px 0' }}>Add State Job Notification</h2>

            <StateJobForm />
          </div>
        )}
        {/* Edit State Job Tab */}
        {activeTab === 'editstatejob' && (
          <EditStateJob />
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