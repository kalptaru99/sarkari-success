"use client";
import { useState, useEffect } from "react";

const states = [
  { code: "BR", name: "Bihar", nameLocal: "बिहार", language: "Hindi", flag: "🏛️", color: "#FF6B35" },
  { code: "UP", name: "Uttar Pradesh", nameLocal: "उत्तर प्रदेश", language: "Hindi", flag: "🏛️", color: "#4CAF50" },
  { code: "RJ", name: "Rajasthan", nameLocal: "राजस्थान", language: "Hindi", flag: "🏛️", color: "#FF9800" },
  { code: "MP", name: "Madhya Pradesh", nameLocal: "मध्य प्रदेश", language: "Hindi", flag: "🏛️", color: "#9C27B0" },
  { code: "JH", name: "Jharkhand", nameLocal: "झारखंड", language: "Hindi", flag: "🏛️", color: "#00BCD4" },
  { code: "HR", name: "Haryana", nameLocal: "हरियाणा", language: "Hindi", flag: "🏛️", color: "#3F51B5" },
  { code: "UK", name: "Uttarakhand", nameLocal: "उत्तराखंड", language: "Hindi", flag: "🏛️", color: "#009688" },
  { code: "HP", name: "Himachal Pradesh", nameLocal: "हिमाचल प्रदेश", language: "Hindi", flag: "🏛️", color: "#F44336" },
  { code: "CG", name: "Chhattisgarh", nameLocal: "छत्तीसगढ़", language: "Hindi", flag: "🏛️", color: "#795548" },
  { code: "TN", name: "Tamil Nadu", nameLocal: "தமிழ்நாடு", language: "Tamil", flag: "🏛️", color: "#E91E63" },
  { code: "AP", name: "Andhra Pradesh", nameLocal: "ఆంధ్రప్రదేశ్", language: "Telugu", flag: "🏛️", color: "#FF5722" },
  { code: "TS", name: "Telangana", nameLocal: "తెలంగాణ", language: "Telugu", flag: "🏛️", color: "#607D8B" },
  { code: "KL", name: "Kerala", nameLocal: "കേരളം", language: "Malayalam", flag: "🏛️", color: "#4CAF50" },
  { code: "KA", name: "Karnataka", nameLocal: "ಕರ್ನಾಟಕ", language: "Kannada", flag: "🏛️", color: "#FF9800" },
  { code: "MH", name: "Maharashtra", nameLocal: "महाराष्ट्र", language: "Marathi", flag: "🏛️", color: "#2196F3" },
  { code: "WB", name: "West Bengal", nameLocal: "পশ্চিমবঙ্গ", language: "Bengali", flag: "🏛️", color: "#009688" },
  { code: "GJ", name: "Gujarat", nameLocal: "ગુજરાત", language: "Gujarati", flag: "🏛️", color: "#FF5722" },
  { code: "OD", name: "Odisha", nameLocal: "ଓଡ଼ିଶା", language: "Odia", flag: "🏛️", color: "#9C27B0" },
  { code: "PB", name: "Punjab", nameLocal: "ਪੰਜਾਬ", language: "Punjabi", flag: "🏛️", color: "#F44336" },
  { code: "AS", name: "Assam", nameLocal: "অসম", language: "Assamese", flag: "🏛️", color: "#3F51B5" },
];

const examsByState = {
  BR: ["BPSC CCE", "BPSC TRE", "Bihar Police", "Bihar SSC", "Bihar Court Clerk"],
  UP: ["UPPSC PCS", "UP Police", "UPSESSB TGT/PGT", "UP TET", "UP Lekhpal", "UP B.Ed"],
  RJ: ["RPSC RAS", "Rajasthan Police", "REET", "Rajasthan Patwari", "RPSC 1st Grade"],
  MP: ["MPPSC", "MP Police", "MP TET", "MP Patwari", "MPESB Group 2"],
  JH: ["JPSC", "Jharkhand Police", "JTET", "JSSC CGL"],
  HR: ["HPSC HCS", "Haryana Police", "HSSC CET", "Haryana TET"],
  UK: ["UKPSC", "Uttarakhand Police", "UTET"],
  HP: ["HPPSC", "HP Police", "HPTET"],
  CG: ["CGPSC", "CG Police", "CG TET", "CG Vyapam"],
  TN: ["TNPSC Group 1", "TNPSC Group 2", "TNPSC Group 4", "TN Police", "TN TET"],
  AP: ["APPSC Group 1", "APPSC Group 2", "APPSC Group 3", "AP Police", "AP TET"],
  TS: ["TSPSC Group 1", "TSPSC Group 2", "TSPSC Group 4", "TS Police", "TS TET"],
  KL: ["Kerala PSC", "Kerala Police", "Kerala TET", "Kerala LD Clerk"],
  KA: ["KPSC", "Karnataka Police", "Karnataka TET", "KPSC FDA/SDA"],
  MH: ["MPSC", "Maharashtra Police", "MH TET", "MPSC Group B"],
  WB: ["WBPSC", "WB Police", "WB TET", "WBCS"],
  GJ: ["GPSC", "Gujarat Police", "GTET", "GPSC Class 1/2"],
  OD: ["OPSC", "Odisha Police", "OTET", "OSSSC"],
  PB: ["PPSC", "Punjab Police", "Punjab TET", "PSSSB"],
  AS: ["APSC", "Assam Police", "Assam TET", "SLPRB"],
};

export default function StatesPage() {
  const [selectedState, setSelectedState] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStateJobs = async (stateCode) => {
    setLoading(true);
    try {
      const response = await fetch("/api/state-jobs?state=" + stateCode);
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching state jobs:", error);
    }
    setLoading(false);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    fetchStateJobs(state.code);
  };

  const filteredStates = states.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameLocal.includes(searchQuery)
  );
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ maxWidth: '1100px', margin: '30px auto', padding: '0 20px' }}>

        <h2 style={{ fontSize: '24px', color: '#1e3a8a', margin: '0 0 8px 0' }}>State Government Jobs</h2>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
          Apne state ke sarkari naukri — Hindi, Tamil, Telugu, Malayalam aur 8 local languages mein
        </p>

        {/* Search States */}
        <input
          type="text"
          placeholder="Search your state... (e.g. Bihar, Tamil Nadu, Kerala)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #1e3a8a', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', marginBottom: '24px', backgroundColor: 'white' }}
        />

        {/* States Grid */}
        {!selectedState && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '40px' }}>
            {filteredStates.map((state) => (
              <div
                key={state.code}
                onClick={() => handleStateSelect(state)}
                style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', cursor: 'pointer', border: '2px solid #e5e7eb', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏛️</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e3a8a' }}>{state.name}</div>
                <div style={{ fontSize: '13px', color: '#666', margin: '2px 0' }}>{state.nameLocal}</div>
                <div style={{ fontSize: '11px', color: 'white', backgroundColor: state.color, padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginTop: '6px' }}>
                  {state.language}
                </div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>
                  {examsByState[state.code]?.length} exams
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected State View */}
        {selectedState && (
          <div>
            <button
              onClick={() => { setSelectedState(null); setJobs([]); }}
              style={{ backgroundColor: 'transparent', border: '2px solid #1e3a8a', color: '#1e3a8a', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}
            >
              ← Back to All States
            </button>

            {/* State Header */}
            <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ color: 'white', fontSize: '24px', margin: '0 0 4px 0' }}>{selectedState.name}</h2>
                <p style={{ color: '#93c5fd', fontSize: '18px', margin: '0 0 8px 0' }}>{selectedState.nameLocal}</p>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
                  Language: {selectedState.language}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#93c5fd', fontSize: '13px', margin: '0 0 8px 0' }}>Exams covered:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                  {examsByState[selectedState.code]?.map((exam, i) => (
                    <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '3px 10px', borderRadius: '10px', fontSize: '11px' }}>
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SarkariGPT CTA for State */}
            <div style={{ backgroundColor: '#fee2e2', borderRadius: '10px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ color: '#dc2626', fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '14px' }}>
                  🤖 {selectedState.name} exams ke baare mein {selectedState.language} mein poochein
                </p>
                <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
                  SarkariGPT answers in {selectedState.language} + English
                </p>
              </div>
              <a href="/sarkarigpt" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', flexShrink: 0 }}>
                Ask in {selectedState.language}
              </a>
            </div>

            {/* Jobs List */}
            <h3 style={{ color: '#1e3a8a', margin: '0 0 16px 0' }}>Latest {selectedState.name} Government Jobs</h3>

            {loading && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#1e3a8a' }}>Loading jobs...</div>
            )}

            {!loading && jobs.length === 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <p style={{ color: '#666', fontSize: '16px', margin: '0 0 8px 0' }}>
                  {selectedState.name} ke liye abhi notifications add ho rahi hain
                </p>
                <p style={{ color: '#888', fontSize: '13px', margin: '0 0 20px 0' }}>
                  Check back soon or ask SarkariGPT about {selectedState.name} exams
                </p>
                <a href="/sarkarigpt" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
                  Ask SarkariGPT
                </a>
              </div>
            )}

            {!loading && jobs.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobs.map((job, index) => (
                  <div key={index} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '16px', color: '#1e3a8a', margin: 0 }}>{job.title}</h3>
                          {job.is_new && <span style={{ backgroundColor: '#dc2626', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>NEW</span>}
                        </div>
                        {job.title_local && (
                          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 4px 0' }}>{job.title_local}</p>
                        )}
                        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px 0' }}>{job.org}</p>
                        <p style={{ color: '#444', fontSize: '12px', margin: 0 }}>
                          Vacancies: <strong>{job.vacancies}</strong> | Last Date: <strong style={{ color: '#dc2626' }}>{job.last_date}</strong>
                        </p>
                      </div>
                      <a href={"/state-jobs/" + job.slug} style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', flexShrink: 0 }}>
                        View Details
                      </a>
                    </div>
                    {job.description_local && (
                      <p style={{ color: '#555', fontSize: '13px', margin: '10px 0 0 0', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                        {job.description_local}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mock Test CTA */}
        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', textAlign: 'center', marginTop: '40px' }}>
          <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>State Exam Mock Tests Coming Soon</h3>
          <p style={{ color: '#93c5fd', margin: '0 0 16px 0', fontSize: '14px' }}>
            BPSC, UPPSC, TNPSC, Kerala PSC — state-specific mock tests in local languages
          </p>
          <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
            Practice Central Exams Meanwhile
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
  }