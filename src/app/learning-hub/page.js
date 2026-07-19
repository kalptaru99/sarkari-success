"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const subjectsByExam = {
  "SSC CGL": [
    { id: "quant", name: "Quantitative Aptitude", icon: "🔢", color: "#1e3a8a", topics: ["Number System", "Percentage", "Profit & Loss", "Time & Work", "Speed & Distance", "Algebra", "Geometry", "Trigonometry", "Data Interpretation"] },
    { id: "reasoning", name: "General Intelligence", icon: "🧠", color: "#7c3aed", topics: ["Analogy", "Series", "Coding-Decoding", "Blood Relations", "Direction", "Syllogism", "Puzzles", "Venn Diagram"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Error Detection", "Fill in Blanks", "Cloze Test", "Para Jumbles", "Vocabulary", "Grammar"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["History", "Geography", "Polity", "Economy", "Science", "Current Affairs", "Static GK"] },
  ],
  "SSC CHSL": [
    { id: "quant", name: "Quantitative Aptitude", icon: "🔢", color: "#1e3a8a", topics: ["Number System", "Percentage", "Profit & Loss", "Time & Work", "Speed & Distance", "Algebra", "Geometry"] },
    { id: "reasoning", name: "General Intelligence", icon: "🧠", color: "#7c3aed", topics: ["Analogy", "Series", "Coding-Decoding", "Blood Relations", "Direction", "Syllogism"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Error Detection", "Fill in Blanks", "Cloze Test", "Vocabulary"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["History", "Geography", "Polity", "Economy", "Science", "Current Affairs"] },
  ],
  "RRB NTPC": [
    { id: "maths", name: "Mathematics", icon: "🔢", color: "#1e3a8a", topics: ["Number System", "Percentage", "Ratio", "Time & Work", "Speed & Distance", "Algebra", "Geometry"] },
    { id: "reasoning", name: "General Intelligence", icon: "🧠", color: "#7c3aed", topics: ["Analogy", "Series", "Coding-Decoding", "Blood Relations", "Syllogism", "Puzzles"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Error Detection", "Vocabulary", "Grammar"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["History", "Geography", "Polity", "Economy", "Science", "Railway GK", "Current Affairs"] },
  ],
  "RRB Group D": [
    { id: "maths", name: "Mathematics", icon: "🔢", color: "#1e3a8a", topics: ["Number System", "Percentage", "Ratio", "Time & Work", "Speed & Distance"] },
    { id: "reasoning", name: "General Intelligence", icon: "🧠", color: "#7c3aed", topics: ["Analogy", "Series", "Coding-Decoding", "Blood Relations", "Direction"] },
    { id: "science", name: "General Science", icon: "🔬", color: "#ca8a04", topics: ["Physics", "Chemistry", "Biology", "Environmental Science"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["History", "Geography", "Polity", "Current Affairs", "Railway GK"] },
  ],
  "IBPS PO": [
    { id: "quant", name: "Quantitative Aptitude", icon: "🔢", color: "#1e3a8a", topics: ["Data Interpretation", "Number Series", "Quadratic Equations", "Percentage", "Ratio", "Time & Work"] },
    { id: "reasoning", name: "Reasoning Ability", icon: "🧠", color: "#7c3aed", topics: ["Puzzles", "Seating Arrangement", "Inequalities", "Syllogism", "Input-Output", "Blood Relations"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Error Detection", "Fill in Blanks", "Para Jumbles", "Cloze Test"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["Banking Awareness", "Current Affairs", "Static GK", "Financial Awareness"] },
    { id: "computer", name: "Computer Knowledge", icon: "💻", color: "#0891b2", topics: ["Basics", "MS Office", "Internet", "Networking", "Security"] },
  ],
  "IBPS Clerk": [
    { id: "quant", name: "Numerical Ability", icon: "🔢", color: "#1e3a8a", topics: ["Number Series", "Simplification", "Percentage", "Ratio", "Time & Work", "Data Interpretation"] },
    { id: "reasoning", name: "Reasoning Ability", icon: "🧠", color: "#7c3aed", topics: ["Puzzles", "Inequalities", "Syllogism", "Coding-Decoding", "Blood Relations"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Error Detection", "Vocabulary", "Cloze Test"] },
    { id: "gk", name: "General Awareness", icon: "🌍", color: "#16a34a", topics: ["Banking Awareness", "Current Affairs", "Static GK"] },
    { id: "computer", name: "Computer Knowledge", icon: "💻", color: "#0891b2", topics: ["Basics", "MS Office", "Internet", "Security"] },
  ],
  "SBI PO": [
    { id: "quant", name: "Data Analysis", icon: "🔢", color: "#1e3a8a", topics: ["Data Interpretation", "Data Sufficiency", "Number Series", "Quadratic Equations", "Arithmetic"] },
    { id: "reasoning", name: "Reasoning", icon: "🧠", color: "#7c3aed", topics: ["Puzzles", "Seating Arrangement", "Logical Reasoning", "Input-Output", "Blood Relations"] },
    { id: "english", name: "English Language", icon: "📖", color: "#dc2626", topics: ["Reading Comprehension", "Vocabulary", "Grammar", "Para Jumbles", "Cloze Test"] },
    { id: "gk", name: "General Economy & Banking", icon: "🌍", color: "#16a34a", topics: ["Banking Awareness", "Economy", "Current Affairs", "Financial Terms"] },
  ],
  "UPSC Civil Services": [
    { id: "gs1", name: "GS Paper 1", icon: "📜", color: "#1e3a8a", topics: ["History", "Geography", "Art & Culture", "World History", "Indian Society"] },
    { id: "gs2", name: "GS Paper 2", icon: "⚖️", color: "#7c3aed", topics: ["Polity", "Governance", "International Relations", "Social Justice"] },
    { id: "gs3", name: "GS Paper 3", icon: "💹", color: "#ca8a04", topics: ["Economy", "Agriculture", "Environment", "Science & Technology", "Security"] },
    { id: "gs4", name: "GS Paper 4 Ethics", icon: "🎯", color: "#dc2626", topics: ["Ethics", "Integrity", "Aptitude", "Case Studies", "Emotional Intelligence"] },
    { id: "csat", name: "CSAT Paper 2", icon: "🔢", color: "#16a34a", topics: ["Reading Comprehension", "Logical Reasoning", "Quantitative Aptitude", "Decision Making"] },
  ],
  "BPSC": [
    { id: "gs1", name: "GS Paper 1", icon: "📜", color: "#1e3a8a", topics: ["General Science", "Bihar History", "Current Affairs", "Geography"] },
    { id: "gs2", name: "GS Paper 2", icon: "⚖️", color: "#7c3aed", topics: ["Indian History", "Geography", "Indian Polity", "Indian Economy", "Bihar GK"] },
    { id: "hindi", name: "Hindi Language", icon: "📖", color: "#dc2626", topics: ["Grammar", "Essay", "Comprehension", "Letter Writing"] },
  ],
  "UPPSC": [
    { id: "gs1", name: "GS Paper 1", icon: "📜", color: "#1e3a8a", topics: ["History", "Geography", "UP GK", "Science & Technology"] },
    { id: "gs2", name: "GS Paper 2", icon: "⚖️", color: "#7c3aed", topics: ["Polity", "Economy", "Social Issues", "UP Current Affairs"] },
    { id: "hindi", name: "Hindi Language", icon: "📖", color: "#dc2626", topics: ["Grammar", "Essay", "Comprehension"] },
    { id: "reasoning", name: "Reasoning", icon: "🧠", color: "#ca8a04", topics: ["Analogy", "Series", "Puzzles", "Logical Reasoning"] },
  ],
  "TNPSC": [
    { id: "gk", name: "General Studies", icon: "🌍", color: "#1e3a8a", topics: ["Tamil History", "Geography", "Polity", "Economy", "Science", "Current Affairs"] },
    { id: "aptitude", name: "Aptitude & Mental Ability", icon: "🔢", color: "#7c3aed", topics: ["Number System", "Ratio", "Time & Work", "Logical Reasoning", "Series"] },
    { id: "tamil", name: "Tamil Language", icon: "📖", color: "#dc2626", topics: ["Grammar", "Literature", "Comprehension", "Essay"] },
  ],
  "Kerala PSC": [
    { id: "gk", name: "General Knowledge", icon: "🌍", color: "#1e3a8a", topics: ["Kerala History", "Geography", "Polity", "Economy", "Science", "Current Affairs"] },
    { id: "aptitude", name: "Quantitative Aptitude", icon: "🔢", color: "#7c3aed", topics: ["Number System", "Percentage", "Ratio", "Time & Work", "Logical Reasoning"] },
    { id: "english", name: "English", icon: "📖", color: "#dc2626", topics: ["Grammar", "Vocabulary", "Comprehension"] },
    { id: "malayalam", name: "Malayalam", icon: "📝", color: "#ca8a04", topics: ["Grammar", "Literature", "Comprehension"] },
  ],
};

export default function LearningHub() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("explain");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/student-profile")
        .then(res => res.json())
        .then(data => setProfile(data.profile));
    }
  }, [status]);

  const targetExam = profile?.preferred_exam || "SSC CGL";
  const language = profile?.preferred_language || "Hindi";
  const subjects = subjectsByExam[targetExam] || subjectsByExam["SSC CGL"];
  const askAI = async (topic, subject, selectedMode) => {
    setLoading(true);
    setAiResponse("");
    setSelectedTopic(topic);
    setMode(selectedMode);

    const prompts = {
      explain: `You are an expert ${targetExam} exam mentor. Explain the topic "${topic}" from ${subject.name} in simple, clear language. 
Student's target exam: ${targetExam}
Language: ${language}

Structure your response as:
1. Simple explanation with example
2. Key formula or rule (if applicable)
3. How this topic appears in ${targetExam} exam
4. One solved example question
5. Common mistakes to avoid

Write in ${language} language. Be encouraging and practical.`,

      practice: `You are an expert ${targetExam} exam mentor. Generate 5 practice questions on "${topic}" from ${subject.name}.
Student's target exam: ${targetExam}
Language: ${language}

For each question:
- Write the question
- Give 4 options (A, B, C, D)
- Mark the correct answer
- Give a brief explanation

Make questions similar to actual ${targetExam} exam pattern. Write in ${language} language.`,

      tricks: `You are an expert ${targetExam} exam mentor. Share the best shortcuts, tricks and mnemonics for "${topic}" from ${subject.name}.
Student's target exam: ${targetExam}
Language: ${language}

Include:
1. Top 3 shortcuts for solving questions fast
2. Memory tricks or mnemonics
3. Time-saving techniques
4. Common patterns in ${targetExam} questions on this topic

Write in ${language} language. Focus on speed and accuracy.`,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompts[selectedMode],
          history: [],
          preferredLanguage: language,
        }),
      });
      const data = await response.json();
      setAiResponse(data.reply || data.error);
    } catch (error) {
      setAiResponse("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (status === "loading" || !profile) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>Loading your Learning Hub...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Learning Hub
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '12px', margin: '2px 0 0 0' }}>
            {targetExam} — Personalized AI Subject Mentors
          </p>
        </div>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 16px', display: 'grid', gridTemplateColumns: selectedSubject ? '280px 1fr' : '1fr', gap: '20px' }}>

        {/* Subject Selection */}
        <div>
          <h2 style={{ fontSize: '16px', color: '#1e3a8a', margin: '0 0 12px 0', fontWeight: '800' }}>
            📚 {targetExam} — Choose Subject
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => { setSelectedSubject(subject); setSelectedTopic(null); setAiResponse(""); }}
                style={{ backgroundColor: selectedSubject?.id === subject.id ? subject.color : 'white', borderRadius: '10px', padding: '14px 16px', cursor: 'pointer', border: `2px solid ${subject.color}`, transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '22px' }}>{subject.icon}</span>
                  <div>
                    <p style={{ color: selectedSubject?.id === subject.id ? 'white' : subject.color, fontWeight: '700', fontSize: '14px', margin: 0 }}>{subject.name}</p>
                    <p style={{ color: selectedSubject?.id === subject.id ? 'rgba(255,255,255,0.8)' : '#666', fontSize: '11px', margin: 0 }}>{subject.topics.length} topics</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!selectedSubject && (
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '16px', marginTop: '16px', border: '1px solid #bfdbfe' }}>
              <p style={{ color: '#1e3a8a', fontSize: '13px', margin: '0 0 8px 0', fontWeight: '700' }}>🎯 How to use AI Learning Hub</p>
              <p style={{ color: '#374151', fontSize: '12px', margin: '0 0 4px 0' }}>1. Select a subject</p>
              <p style={{ color: '#374151', fontSize: '12px', margin: '0 0 4px 0' }}>2. Choose a topic</p>
              <p style={{ color: '#374151', fontSize: '12px', margin: '0 0 4px 0' }}>3. Ask AI to explain, practice or give tricks</p>
              <p style={{ color: '#374151', fontSize: '12px', margin: 0 }}>4. Learn in {language} language</p>
            </div>
          )}
        </div>

        {/* Topic + AI Content */}
        {selectedSubject && (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: selectedSubject.color, fontSize: '18px', margin: '0 0 4px 0', fontWeight: '800' }}>
                {selectedSubject.icon} {selectedSubject.name}
              </h2>
              <p style={{ color: '#666', fontSize: '13px', margin: '0 0 16px 0' }}>Select a topic to study with AI</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedSubject.topics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedTopic(topic); setAiResponse(""); }}
                    style={{ backgroundColor: selectedTopic === topic ? selectedSubject.color : '#f8fafc', color: selectedTopic === topic ? 'white' : '#374151', padding: '8px 16px', borderRadius: '20px', border: `1px solid ${selectedTopic === topic ? selectedSubject.color : '#e2e8f0'}`, fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {selectedTopic && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: '#1e3a8a', margin: '0 0 12px 0', fontSize: '16px' }}>
                  How do you want to learn: <span style={{ color: selectedSubject.color }}>{selectedTopic}</span>?
                </h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { mode: 'explain', label: '📖 Explain to me', desc: 'Simple explanation with examples' },
                    { mode: 'practice', label: '✍️ Practice Questions', desc: '5 exam-style questions with answers' },
                    { mode: 'tricks', label: '⚡ Shortcuts & Tricks', desc: 'Fast solving techniques' },
                  ].map((item) => (
                    <button
                      key={item.mode}
                      onClick={() => askAI(selectedTopic, selectedSubject, item.mode)}
                      disabled={loading}
                      style={{ flex: 1, minWidth: '140px', padding: '12px 16px', backgroundColor: mode === item.mode && aiResponse ? selectedSubject.color : '#1e3a8a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, textAlign: 'left' }}
                    >
                      <div>{item.label}</div>
                      <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>🤖</div>
                <p style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0' }}>AI Mentor is preparing your content...</p>
                <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>Personalizing for {targetExam} in {language}</p>
              </div>
            )}

            {aiResponse && !loading && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ color: selectedSubject.color, margin: 0, fontSize: '16px', fontWeight: '800' }}>
                    🤖 AI Mentor — {selectedTopic}
                  </h3>
                  <button
                    onClick={() => setAiResponse("")}
                    style={{ backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}
                  >
                    Clear ✕
                  </button>
                </div>
                <div style={{ color: '#1a1a1a', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                  {aiResponse}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button onClick={() => askAI(selectedTopic, selectedSubject, 'explain')} style={{ padding: '8px 16px', backgroundColor: '#eff6ff', color: '#1e3a8a', border: '1px solid #bfdbfe', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>📖 Explain Again</button>
                  <button onClick={() => askAI(selectedTopic, selectedSubject, 'practice')} style={{ padding: '8px 16px', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>✍️ Practice Questions</button>
                  <button onClick={() => askAI(selectedTopic, selectedSubject, 'tricks')} style={{ padding: '8px 16px', backgroundColor: '#fef9c3', color: '#ca8a04', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>⚡ Shortcuts</button>
                  <a href="/sarkarigpt" style={{ padding: '8px 16px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>🤖 Ask SarkariGPT</a>
                </div>
              </div>
            )}

            {!selectedTopic && !loading && !aiResponse && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{selectedSubject.icon}</div>
                <p style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0' }}>Select a topic above to start learning</p>
                <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>AI will explain, give practice questions or shortcuts in {language}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}