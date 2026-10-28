"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EDUCATION_OPTIONS = [
  { value: '8th', label: '8th Pass' },
  { value: '10th', label: '10th Pass (Matriculation)' },
  { value: '12th', label: '12th Pass (Intermediate)' },
  { value: 'iti', label: 'ITI Certificate' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'graduate', label: 'Graduate (BA / BSc / BCom / BTech etc.)' },
  { value: 'postgraduate', label: 'Post Graduate (MA / MSc / MTech / MBA etc.)' },
  { value: 'phd', label: 'PhD / Doctorate' },
];

const CATEGORY_OPTIONS = [
  { value: 'general', label: 'General (UR)' },
  { value: 'obc', label: 'OBC (Other Backward Class) — +3 yr age relaxation' },
  { value: 'sc', label: 'SC (Scheduled Caste) — +5 yr age relaxation' },
  { value: 'st', label: 'ST (Scheduled Tribe) — +5 yr age relaxation' },
  { value: 'ews', label: 'EWS (Economically Weaker Section)' },
];

const EXAM_OPTIONS = [
  'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD',
  'RRB NTPC', 'RRB Group D', 'RRB ALP',
  'UPSC CSE', 'UPSC CDS',
  'IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk',
  'Defence (NDA/CDS/AFCAT)',
  'State PSC', 'Teaching (TET/CTET)',
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Jammu & Kashmir', 'Ladakh',
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    age: '',
    education: '',
    category: '',
    state: '',
    preferred_exams: [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?redirect=/profile');
  }, [status]);

  useEffect(() => {
    if (session?.user) loadProfile();
  }, [session]);

  const loadProfile = async () => {
    try {
      const r = await fetch('/api/profile');
      const d = await r.json();
      if (d.profile) {
        setForm({
          age: d.profile.age || '',
          education: d.profile.education || '',
          category: d.profile.category || '',
          state: d.profile.state || '',
          preferred_exams: d.profile.preferred_exams || [],
        });
      }
    } catch {}
    setLoading(false);
  };

  const toggleExam = (exam) => {
    setForm(prev => ({
      ...prev,
      preferred_exams: prev.preferred_exams.includes(exam)
        ? prev.preferred_exams.filter(e => e !== exam)
        : [...prev.preferred_exams, exam],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {}
    setSaving(false);
  };

  const profileComplete = form.age && form.education && form.category;

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a' }}>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </a>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="/dashboard" style={{ color: '#93c5fd', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
      </div>

      <div style={{ maxWidth: '640px', margin: '32px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '24px', margin: '0 0 6px' }}>My Profile</h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>
            Fill your details to check eligibility for each job automatically
          </p>
        </div>

        {/* Completion indicator */}
        {!loading && (
          <div style={{
            backgroundColor: profileComplete ? '#dcfce7' : '#fef9c3',
            border: `1px solid ${profileComplete ? '#86efac' : '#fde047'}`,
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '13px',
            color: profileComplete ? '#15803d' : '#854d0e',
            fontWeight: '600',
          }}>
            {profileComplete
              ? '✅ Profile complete — eligibility checks are active on all job pages'
              : '⚠️ Fill Age, Education and Category to unlock eligibility checks'}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading profile...</div>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>

            {/* Age */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontWeight: '700', color: '#1e3a8a', marginBottom: '6px', fontSize: '14px' }}>
                Your Age <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="number"
                min="16" max="60"
                value={form.age}
                onChange={e => setForm(p => ({ ...p, age: e.target.value }))}
                placeholder="e.g. 24"
                style={{ width: '120px', padding: '9px 12px', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none' }}
              />
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#9ca3af' }}>
                Age relaxations for OBC/SC/ST are applied automatically
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontWeight: '700', color: '#1e3a8a', marginBottom: '8px', fontSize: '14px' }}>
                Highest Education <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {EDUCATION_OPTIONS.map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', border: `1.5px solid ${form.education === opt.value ? '#1e3a8a' : '#e5e7eb'}`, backgroundColor: form.education === opt.value ? '#eff6ff' : 'white', fontSize: '14px' }}>
                    <input
                      type="radio"
                      name="education"
                      value={opt.value}
                      checked={form.education === opt.value}
                      onChange={e => setForm(p => ({ ...p, education: e.target.value }))}
                      style={{ accentColor: '#1e3a8a' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontWeight: '700', color: '#1e3a8a', marginBottom: '8px', fontSize: '14px' }}>
                Category <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {CATEGORY_OPTIONS.map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 12px', borderRadius: '8px', border: `1.5px solid ${form.category === opt.value ? '#1e3a8a' : '#e5e7eb'}`, backgroundColor: form.category === opt.value ? '#eff6ff' : 'white', fontSize: '14px' }}>
                    <input
                      type="radio"
                      name="category"
                      value={opt.value}
                      checked={form.category === opt.value}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      style={{ accentColor: '#1e3a8a' }}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* State */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontWeight: '700', color: '#1e3a8a', marginBottom: '6px', fontSize: '14px' }}>
                Home State
              </label>
              <select
                value={form.state}
                onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                style={{ padding: '9px 12px', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '14px', width: '100%', maxWidth: '320px', outline: 'none' }}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Preferred Exams */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontWeight: '700', color: '#1e3a8a', marginBottom: '8px', fontSize: '14px' }}>
                Preferred Exam Types
                <span style={{ fontWeight: '400', color: '#9ca3af', fontSize: '12px', marginLeft: '8px' }}>(select all that interest you)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {EXAM_OPTIONS.map(exam => {
                  const selected = form.preferred_exams.includes(exam);
                  return (
                    <button
                      key={exam}
                      type="button"
                      onClick={() => toggleExam(exam)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: `1.5px solid ${selected ? '#1e3a8a' : '#d1d5db'}`,
                        backgroundColor: selected ? '#1e3a8a' : 'white',
                        color: selected ? 'white' : '#374151',
                        fontSize: '13px',
                        fontWeight: selected ? '600' : '400',
                        cursor: 'pointer',
                      }}
                    >
                      {selected ? '✓ ' : ''}{exam}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                backgroundColor: saving ? '#93c5fd' : '#1e3a8a',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: saving ? 'wait' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save Profile'}
            </button>

            {saved && (
              <p style={{ color: '#15803d', fontSize: '13px', marginTop: '10px' }}>
                ✅ Profile saved — eligibility checks are now active on job pages
              </p>
            )}
          </div>
        )}
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '48px' }}>
        © 2026 Sarkari Success. All rights reserved.
      </footer>
    </main>
  );
}
