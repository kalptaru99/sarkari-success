"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const examLanguages = {
  "SSC CGL": ["English", "Hindi"],
  "SSC CHSL": ["English", "Hindi"],
  "SSC GD": ["English", "Hindi"],
  "SSC CPO": ["English", "Hindi"],
  "RRB NTPC": ["English", "Hindi"],
  "RRB Group D": ["English", "Hindi"],
  "UPSC Civil Services": ["English", "Hindi"],
  "UPSC NDA": ["English", "Hindi"],
  "UPSC CDS": ["English", "Hindi"],
  "IBPS PO": ["English", "Hindi"],
  "IBPS Clerk": ["English", "Hindi"],
  "SBI PO": ["English", "Hindi"],
  "RBI Grade B": ["English", "Hindi"],
  "CTET": ["English", "Hindi"],
  "Agniveer": ["English", "Hindi"],
  "BPSC": ["English", "Hindi"],
  "UPPSC": ["English", "Hindi"],
  "RPSC RAS": ["English", "Hindi"],
  "MPPSC": ["English", "Hindi"],
  "JPSC": ["English", "Hindi"],
  "CGPSC": ["English", "Hindi"],
  "HPSC": ["English", "Hindi"],
  "UKPSC": ["English", "Hindi"],
  "TNPSC": ["English", "Tamil"],
  "APPSC": ["English", "Telugu"],
  "TSPSC": ["English", "Telugu"],
  "Kerala PSC": ["English", "Malayalam"],
  "KPSC": ["English", "Kannada"],
  "MPSC": ["English", "Marathi"],
  "WBPSC": ["English", "Bengali"],
  "GPSC": ["English", "Gujarati"],
  "OPSC": ["English", "Odia"],
  "PPSC": ["English", "Punjabi"],
  "APSC": ["English", "Assamese"],
};

const exams = Object.keys(examLanguages);

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    preferred_exam: "SSC CGL",
    preferred_language: "English",
    daily_study_hours: 4,
    exam_date: "",
    state: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/student-profile");
      const data = await response.json();
      if (data.profile) {
        setProfile({
          preferred_exam: data.profile.preferred_exam || "SSC CGL",
          preferred_language: data.profile.preferred_language || "English",
          daily_study_hours: data.profile.daily_study_hours || 4,
          exam_date: data.profile.exam_date ? data.profile.exam_date.split('T')[0] : "",
          state: data.profile.state || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/student-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Profile saved successfully!");
      }
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
    setSaving(false);
  };

  const availableLanguages = examLanguages[profile.preferred_exam] || ["English", "Hindi"];

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p style={{ color: '#1e3a8a' }}>Loading your profile...</p>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — My Profile
        </h1>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 24px 0' }}>Exam Preferences</h2>

          {message && (
            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
              {message}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                Target Exam
              </label>
              <select
                value={profile.preferred_exam}
                onChange={(e) => {
                  const exam = e.target.value;
                  const langs = examLanguages[exam] || ["English", "Hindi"];
                  setProfile(prev => ({
                    ...prev,
                    preferred_exam: exam,
                    preferred_language: langs[0]
                  }));
                }}
                style={{ width: '100%', padding: '12px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {exams.map((exam, i) => (
                  <option key={i} value={exam}>{exam}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                Preferred Language
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {availableLanguages.map((lang, i) => (
                  <button
                    key={i}
                    onClick={() => setProfile(prev => ({ ...prev, preferred_language: lang }))}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '8px',
                      border: `2px solid ${profile.preferred_language === lang ? '#1e3a8a' : '#ddd'}`,
                      backgroundColor: profile.preferred_language === lang ? '#1e3a8a' : 'white',
                      color: profile.preferred_language === lang ? 'white' : '#444',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#888', margin: '6px 0 0 0' }}>
                SarkariGPT and AI Coach will respond in {profile.preferred_language}
              </p>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                Daily Study Hours
              </label>
              <select
                value={profile.daily_study_hours}
                onChange={(e) => setProfile(prev => ({ ...prev, daily_study_hours: parseInt(e.target.value) }))}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                  <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''} per day</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>
                Exam Date (if known)
              </label>
              <input
                type="date"
                value={profile.exam_date}
                onChange={(e) => setProfile(prev => ({ ...prev, exam_date: e.target.value }))}
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box' }}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              style={{ width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#1e3a8a', margin: '0 0 16px 0' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'AI Selection Coach', href: '/coach', desc: 'View your AI performance analysis' },
              { label: 'Take Mock Test', href: '/mocktest', desc: 'Practice with timed mock tests' },
              { label: 'Question Bank', href: '/questions', desc: 'Practice subject-wise questions' },
              { label: 'SarkariGPT', href: '/sarkarigpt', desc: 'Ask AI about your target exam' },
            ].map((link, i) => (
              <a key={i} href={link.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', textDecoration: 'none', border: '1px solid #e5e7eb' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#1e3a8a', fontSize: '14px' }}>{link.label}</p>
                  <p style={{ margin: 0, color: '#666', fontSize: '12px' }}>{link.desc}</p>
                </div>
                <span style={{ color: '#1e3a8a', fontSize: '18px' }}>→</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}