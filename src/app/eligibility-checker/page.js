"use client";
import { useState } from "react";

const exams = [
  { name: 'UPSC Civil Services (IAS/IPS)', category: 'UPSC', minAge: 21, maxAge: 32, education: 'graduate', gender: 'all', link: '/upsc' },
  { name: 'UPSC CDS (Army/Navy/Air Force)', category: 'UPSC', minAge: 19, maxAge: 25, education: 'graduate', gender: 'all', link: '/upsc' },
  { name: 'UPSC NDA', category: 'UPSC', minAge: 16.5, maxAge: 19.5, education: '12th', gender: 'all', link: '/upsc' },
  { name: 'UPSC CAPF Assistant Commandant', category: 'UPSC', minAge: 20, maxAge: 25, education: 'graduate', gender: 'all', link: '/upsc' },
  { name: 'SSC CGL', category: 'SSC', minAge: 18, maxAge: 32, education: 'graduate', gender: 'all', link: '/ssc' },
  { name: 'SSC CHSL', category: 'SSC', minAge: 18, maxAge: 27, education: '12th', gender: 'all', link: '/ssc' },
  { name: 'SSC MTS', category: 'SSC', minAge: 18, maxAge: 25, education: '10th', gender: 'all', link: '/ssc' },
  { name: 'SSC GD Constable', category: 'SSC', minAge: 18, maxAge: 23, education: '10th', gender: 'all', link: '/ssc' },
  { name: 'SSC CPO (SI)', category: 'SSC', minAge: 20, maxAge: 25, education: 'graduate', gender: 'all', link: '/ssc' },
  { name: 'RRB NTPC (Graduate Posts)', category: 'Railway', minAge: 18, maxAge: 33, education: 'graduate', gender: 'all', link: '/rrb' },
  { name: 'RRB NTPC (12th Pass Posts)', category: 'Railway', minAge: 18, maxAge: 33, education: '12th', gender: 'all', link: '/rrb' },
  { name: 'RRB Group D', category: 'Railway', minAge: 18, maxAge: 33, education: '10th', gender: 'all', link: '/rrb' },
  { name: 'RRB ALP', category: 'Railway', minAge: 18, maxAge: 28, education: '10th', gender: 'all', link: '/rrb' },
  { name: 'IBPS PO', category: 'Banking', minAge: 20, maxAge: 30, education: 'graduate', gender: 'all', link: '/banking' },
  { name: 'IBPS Clerk', category: 'Banking', minAge: 20, maxAge: 28, education: 'graduate', gender: 'all', link: '/banking' },
  { name: 'SBI PO', category: 'Banking', minAge: 21, maxAge: 30, education: 'graduate', gender: 'all', link: '/banking' },
  { name: 'SBI Clerk', category: 'Banking', minAge: 20, maxAge: 28, education: 'graduate', gender: 'all', link: '/banking' },
  { name: 'Agniveer Army', category: 'Defence', minAge: 17.5, maxAge: 23, education: '10th', gender: 'all', link: '/defence' },
  { name: 'Agniveer Navy', category: 'Defence', minAge: 17.5, maxAge: 23, education: '12th', gender: 'all', link: '/defence' },
  { name: 'Agniveer Air Force', category: 'Defence', minAge: 17.5, maxAge: 23, education: '12th', gender: 'all', link: '/defence' },
  { name: 'DRDO Scientist B', category: 'PSU', minAge: 18, maxAge: 28, education: 'btech', gender: 'all', link: '/psu' },
  { name: 'HAL Management Trainee', category: 'PSU', minAge: 18, maxAge: 28, education: 'btech', gender: 'all', link: '/psu' },
  { name: 'KVS TGT Teacher', category: 'Teaching', minAge: 18, maxAge: 35, education: 'graduate', gender: 'all', link: '/teaching' },
  { name: 'KVS PGT Teacher', category: 'Teaching', minAge: 18, maxAge: 40, education: 'postgraduate', gender: 'all', link: '/teaching' },
];

const categoryColors = {
  UPSC: '#7c3aed', SSC: '#1e3a8a', Banking: '#1e40af',
  Railway: '#0f766e', Defence: '#dc2626', PSU: '#0891b2', Teaching: '#16a34a',
};

const educationLevels = {
  '10th': 1, '12th': 2, 'graduate': 3, 'btech': 3, 'postgraduate': 4,
};

export default function EligibilityChecker() {
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);

  const checkEligibility = () => {
    if (!age || !education) return;
    const ageNum = parseFloat(age);
    const eduLevel = educationLevels[education] || 0;

    const eligible = exams.filter(exam => {
      const ageOk = ageNum >= exam.minAge && ageNum <= exam.maxAge;
      const eduOk = eduLevel >= educationLevels[exam.education];
      const catOk = !category || exam.category === category;
      return ageOk && eduOk && catOk;
    });

    const notEligible = exams.filter(exam => {
      const ageOk = ageNum >= exam.minAge && ageNum <= exam.maxAge;
      const eduOk = eduLevel >= educationLevels[exam.education];
      const catOk = !category || exam.category === category;
      return !(ageOk && eduOk && catOk);
    }).slice(0, 5);

    setResults({ eligible, notEligible, age: ageNum, education });
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Sarkari <span style={{ color: '#fca5a5' }}>Success™</span></h1>
        </a>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ backgroundColor: '#1e3a8a', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: '0 0 8px 0' }}>Government Job Eligibility Checker</h1>
        <p style={{ color: '#bfdbfe', fontSize: '16px', margin: 0 }}>Find which government exams you are eligible for — SSC, Railway, UPSC, Banking, Defence</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>

        {/* Input Form */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '32px' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '20px', fontWeight: '800', margin: '0 0 24px 0' }}>📋 Enter Your Details</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#374151', fontSize: '14px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Your Age *</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 24"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '15px', color: '#1e293b', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <label style={{ color: '#374151', fontSize: '14px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Education Qualification *</label>
              <select value={education} onChange={e => setEducation(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '15px', color: '#1e293b', boxSizing: 'border-box' }}>
                <option value="">Select qualification</option>
                <option value="10th">10th Pass (Matriculation)</option>
                <option value="12th">12th Pass (Intermediate)</option>
                <option value="graduate">Graduate (Any stream)</option>
                <option value="btech">B.Tech / Engineering</option>
                <option value="postgraduate">Post Graduate (MA/MSc/MCom)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#374151', fontSize: '14px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>Preferred Category (Optional)</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defence', 'PSU', 'Teaching'].map((cat, i) => (
                <button key={i} onClick={() => setCategory(cat)}
                  style={{ padding: '8px 16px', borderRadius: '20px', border: '2px solid', fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                    borderColor: category === cat ? (categoryColors[cat] || '#1e3a8a') : '#e2e8f0',
                    backgroundColor: category === cat ? (categoryColors[cat] || '#1e3a8a') : 'white',
                    color: category === cat ? 'white' : '#64748b' }}>
                  {cat || 'All Categories'}
                </button>
              ))}
            </div>
          </div>

          <button onClick={checkEligibility}
            style={{ width: '100%', backgroundColor: '#1e3a8a', color: 'white', padding: '16px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}>
            🔍 Check My Eligibility
          </button>
        </div>

        {/* Results */}
        {results && (
          <div>
            <div style={{ backgroundColor: '#dcfce7', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '2px solid #16a34a' }}>
              <h3 style={{ color: '#16a34a', fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>
                ✅ You are eligible for {results.eligible.length} exams!
              </h3>
              <p style={{ color: '#166534', fontSize: '14px', margin: 0 }}>
                Age: {results.age} years | Education: {results.education}
              </p>
            </div>

            {results.eligible.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '800', margin: '0 0 16px 0' }}>✅ Exams You Can Apply For</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {results.eligible.map((exam, i) => (
                    <a key={i} href={exam.link}
                      style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px 20px', border: `2px solid ${categoryColors[exam.category]}20`, textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                      <div>
                        <p style={{ color: '#1e3a8a', fontWeight: '700', fontSize: '15px', margin: '0 0 4px 0' }}>{exam.name}</p>
                        <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Age: {exam.minAge}-{exam.maxAge} yrs | Education: {exam.education}</p>
                      </div>
                      <span style={{ backgroundColor: categoryColors[exam.category], color: 'white', padding: '4px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>
                        {exam.category}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div style={{ backgroundColor: '#fff7ed', borderRadius: '12px', padding: '20px', marginBottom: '32px', border: '1px solid #fed7aa' }}>
              <h3 style={{ color: '#ea580c', fontSize: '16px', fontWeight: '800', margin: '0 0 12px 0' }}>💡 Pro Tip</h3>
              <p style={{ color: '#374151', fontSize: '14px', margin: '0 0 8px 0' }}>OBC candidates get 3 years age relaxation, SC/ST get 5 years. Check official notifications for exact eligibility.</p>
              <a href="/sarkarigpt" style={{ color: '#ea580c', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}>Ask SarkariGPT for personalized guidance →</a>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0' }}>🤖 Need more guidance?</h3>
          <p style={{ color: '#bfdbfe', fontSize: '14px', margin: '0 0 16px 0' }}>Ask SarkariGPT — get personalized exam recommendation and preparation tips</p>
          <a href="/sarkarigpt" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}>
            Ask SarkariGPT →
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}