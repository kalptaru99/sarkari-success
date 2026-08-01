"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const essayTopics = [
  { title: "Digital India: Transforming Governance and Economy", type: "Essay", words: 250, tag: "Asked in 3 recent exams", color: "#0891b2" },
  { title: "Climate Change and India's Role in Global Action", type: "Essay", words: 250, tag: "Asked in 2 recent exams", color: "#16a34a" },
  { title: "Women Empowerment: Challenges and Solutions", type: "Essay", words: 250, tag: "Highly predicted", color: "#7c3aed" },
  { title: "Letter to Bank Manager: Request for Education Loan", type: "Letter", words: 150, tag: "Banking pattern • Formal", color: "#dc2626" },
  { title: "Unemployment in India: Causes and Solutions", type: "Essay", words: 250, tag: "SSC CGL Tier 3", color: "#ca8a04" },
  { title: "Application for Leave: Formal Letter", type: "Letter", words: 120, tag: "SSC CHSL pattern", color: "#ea580c" },
];

const letterTemplates = [
  { title: "Letter to Bank Manager (Education Loan)", type: "Formal", exam: "Banking/SSC" },
  { title: "Complaint Letter to Municipal Corporation", type: "Formal", exam: "SSC CGL Tier 3" },
  { title: "Letter to Editor (Newspaper)", type: "Formal", exam: "SSC/UPSC" },
  { title: "Application for Job", type: "Formal", exam: "All Exams" },
  { title: "Letter to Friend (Informal)", type: "Informal", exam: "SSC CHSL" },
  { title: "Leave Application to Principal", type: "Formal", exam: "All Exams" },
];

export default function DescriptiveAI() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userText, setUserText] = useState("");
  const [aiEvaluation, setAiEvaluation] = useState("");
  const [aiEssay, setAiEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [score] = useState({ essays: 12, letters: 8, bestScore: 68, avgScore: 52 });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  useEffect(() => {
    setWordCount(userText.trim().split(/\s+/).filter(w => w).length);
  }, [userText]);

  const generateAIEssay = async (topic, type) => {
    setLoading(true);
    setAiEssay("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are an expert English writing teacher for SSC CGL Tier 3 and Banking Mains descriptive exam.

Write a model ${type} on: "${topic}"

Requirements:
- Word limit: 250 words for essay, 150 words for letter
- SSC CGL Tier 3 pattern
- Clear structure: Introduction, Body (2-3 paragraphs), Conclusion
- Formal academic English
- After the ${type.toLowerCase()}, provide:
  1. Structure explanation in Hindi
  2. Key phrases used and why
  3. How to write similar ${type.toLowerCase()}s
  4. Common mistakes to avoid

Write in a way that helps Hindi-medium students understand the structure.`,
          history: [],
          preferredLanguage: "English",
        }),
      });
      const data = await response.json();
      const fullText = data.reply || "";
      let displayed = "";
      for (let i = 0; i < fullText.length; i++) {
        displayed += fullText[i];
        setAiEssay(displayed);
        await new Promise(r => setTimeout(r, 8));
      }
    } catch (e) {
      setAiEssay("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const evaluateWriting = async () => {
    if (!userText.trim() || wordCount < 50) {
      setAiEvaluation("कम से कम 50 words लिखें evaluation के लिए।");
      return;
    }
    setLoading(true);
    setAiEvaluation("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are an SSC CGL Tier 3 examiner. Evaluate this student's writing:

"${userText}"

Topic: ${selectedTopic?.title || "General Essay"}

Evaluate on SSC CGL pattern (out of 100):
1. Content & Relevance (30 marks): क्या essay topic से related है?
2. Language & Grammar (30 marks): Grammar errors कितने हैं?
3. Structure & Organization (20 marks): Introduction, Body, Conclusion है?
4. Vocabulary (20 marks): Words variety है?

Give:
- Total Score: X/100
- Detailed feedback in Hindi for each parameter
- 3 specific corrections with examples
- What to improve next time
- Model sentence rewrite for the weakest part

Be honest and constructive. Response in Hindi/Hinglish.`,
          history: [],
          preferredLanguage: "Hindi",
        }),
      });
      const data = await response.json();
      const fullText = data.reply || "";
      let displayed = "";
      for (let i = 0; i < fullText.length; i++) {
        displayed += fullText[i];
        setAiEvaluation(displayed);
        await new Promise(r => setTimeout(r, 8));
      }
    } catch (e) {
      setAiEvaluation("Evaluation failed. Please try again.");
    }
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdfa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✍️</div>
          <p style={{ color: '#0f766e', fontSize: '18px', fontWeight: 'bold' }}>Loading Descriptive AI...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f0fdfa', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #0e7490, #06b6d4)', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '900', margin: 0 }}>✍️ Sarkari Descriptive English AI</h1>
            <p style={{ color: '#a5f3fc', fontSize: '12px', margin: '2px 0 0 0' }}>SSC CGL Tier 3 • Banking Mains • Essay Writing • Letter Writing • AI Evaluation</p>
          </div>
          <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 16px', display: 'flex', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: '🏠 Dashboard' },
          { id: 'essay', label: '✍️ Essay Writing' },
          { id: 'letter', label: '📝 Letter Writing' },
          { id: 'templates', label: '📋 Templates' },
          { id: 'evaluate', label: '🤖 AI Evaluation' },
          { id: 'progress', label: '📊 My Progress' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '12px 16px', border: 'none', backgroundColor: 'transparent', fontSize: '13px', fontWeight: activeTab === tab.id ? '700' : '500', color: activeTab === tab.id ? '#0e7490' : '#666', borderBottom: activeTab === tab.id ? '3px solid #0e7490' : '3px solid transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 16px' }}>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📊 Descriptive English — SSC CGL Tier 3 Pattern</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { value: '100', label: 'Total Marks', color: '#0e7490' },
                  { value: '60', label: 'Essay Marks', color: '#7c3aed' },
                  { value: '40', label: 'Letter Marks', color: '#dc2626' },
                  { value: '60', label: 'Minutes Time', color: '#ca8a04' },
                ].map((stat, i) => (
                  <div key={i} style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '16px', textAlign: 'center', border: `1px solid ${stat.color}30` }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>🔥 Trending Essay Topics (Last 6 Months)</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {essayTopics.map((topic, i) => (
                  <div key={i} onClick={() => { setSelectedTopic(topic); setActiveTab(topic.type === 'Essay' ? 'essay' : 'letter'); setAiEssay(""); setUserText(""); }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                    <div>
                      <p style={{ color: '#1e293b', fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>{topic.title}</p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ backgroundColor: topic.type === 'Essay' ? '#dbeafe' : '#fce7f3', color: topic.type === 'Essay' ? '#1e3a8a' : '#db2777', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{topic.type}</span>
                        <span style={{ color: '#64748b', fontSize: '11px' }}>{topic.tag}</span>
                      </div>
                    </div>
                    <span style={{ color: '#0e7490', fontSize: '20px' }}>→</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📊 Your Descriptive Writing Stats</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { value: score.essays, label: 'Essays Written', color: '#0e7490' },
                  { value: score.letters, label: 'Letters Written', color: '#7c3aed' },
                  { value: score.bestScore + '/100', label: 'Best Score', color: '#16a34a' },
                  { value: score.avgScore + '/100', label: 'Average Score', color: '#ca8a04' },
                ].map((stat, i) => (
                  <div key={i} style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'essay' || activeTab === 'letter') && (
          <div>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>
                {activeTab === 'essay' ? '✍️ Essay Writing Practice' : '📝 Letter Writing Practice'}
              </h2>

              {!selectedTopic ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {essayTopics.filter(t => activeTab === 'essay' ? t.type === 'Essay' : t.type === 'Letter').map((topic, i) => (
                    <div key={i} onClick={() => { setSelectedTopic(topic); setAiEssay(""); setUserText(""); setAiEvaluation(""); }}
                      style={{ padding: '14px 16px', backgroundColor: '#f0fdfa', borderRadius: '10px', border: '1px solid #a5f3fc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ color: '#0e7490', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{topic.title}</p>
                        <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>{topic.words} words • {topic.tag}</p>
                      </div>
                      <span style={{ color: '#0e7490' }}>→</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <button onClick={() => { setSelectedTopic(null); setAiEssay(""); setUserText(""); setAiEvaluation(""); }}
                    style={{ backgroundColor: 'white', border: '2px solid #0e7490', color: '#0e7490', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px' }}>
                    ← Choose Different Topic
                  </button>

                  <div style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '14px', marginBottom: '16px', border: '1px solid #a5f3fc' }}>
                    <p style={{ color: '#0e7490', fontWeight: '800', fontSize: '14px', margin: '0 0 4px 0' }}>{selectedTopic.title}</p>
                    <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Word limit: {selectedTopic.words} words • {selectedTopic.type}</p>
                  </div>

                  <button onClick={() => generateAIEssay(selectedTopic.title, selectedTopic.type)}
                    disabled={loading}
                    style={{ backgroundColor: '#0e7490', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginBottom: '16px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? '🤖 AI लिख रहा है...' : '🤖 AI Model ' + selectedTopic.type + ' देखो'}
                  </button>

                  {aiEssay && (
                    <div style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '20px', marginBottom: '16px', border: '1px solid #a5f3fc' }}>
                      <p style={{ color: '#0e7490', fontWeight: '700', fontSize: '13px', margin: '0 0 12px 0' }}>🤖 AI Model {selectedTopic.type}</p>
                      <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{aiEssay}</div>
                    </div>
                  )}

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <p style={{ color: '#1e293b', fontWeight: '700', fontSize: '14px', margin: 0 }}>अब खुद लिखो — AI Evaluate करेगा</p>
                      <span style={{ color: wordCount >= selectedTopic.words ? '#16a34a' : '#dc2626', fontSize: '13px', fontWeight: '700' }}>{wordCount}/{selectedTopic.words} words</span>
                    </div>
                    <textarea
                      value={userText}
                      onChange={(e) => setUserText(e.target.value)}
                      placeholder={`यहाँ अपना ${selectedTopic.type} लिखो... (${selectedTopic.words} words)`}
                      rows={10}
                      style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1e293b', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}
                    />
                  </div>

                  <button onClick={evaluateWriting}
                    disabled={loading || wordCount < 50}
                    style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: '700', cursor: loading || wordCount < 50 ? 'not-allowed' : 'pointer', opacity: loading || wordCount < 50 ? 0.7 : 1, marginBottom: '16px' }}>
                    {loading ? '🤖 AI Evaluate कर रहा है...' : '🤖 AI से Evaluate करवाओ (Score + Feedback)'}
                  </button>

                  {aiEvaluation && (
                    <div style={{ backgroundColor: '#f5f3ff', borderRadius: '10px', padding: '20px', border: '1px solid #ddd6fe' }}>
                      <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '14px', margin: '0 0 12px 0' }}>🤖 AI Evaluation Result</p>
                      <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{aiEvaluation}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '800' }}>📋 Letter Writing Templates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {letterTemplates.map((template, i) => (
                <div key={i} onClick={() => { setSelectedTopic({ title: template.title, type: 'Letter', words: 150, tag: template.exam }); setActiveTab('letter'); setAiEssay(""); setUserText(""); }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: '#f0fdfa', borderRadius: '10px', border: '1px solid #a5f3fc', cursor: 'pointer' }}>
                  <div>
                    <p style={{ color: '#0e7490', fontWeight: '700', fontSize: '14px', margin: '0 0 4px 0' }}>{template.title}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ backgroundColor: template.type === 'Formal' ? '#dbeafe' : '#fce7f3', color: template.type === 'Formal' ? '#1e3a8a' : '#db2777', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{template.type}</span>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>{template.exam}</span>
                    </div>
                  </div>
                  <button style={{ backgroundColor: '#0e7490', color: 'white', padding: '6px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                    Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evaluate' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0e7490', fontSize: '16px', margin: '0 0 8px 0', fontWeight: '800' }}>🤖 AI Evaluation — अपनी Writing Score करो</h2>
            <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 16px 0' }}>SSC CGL Tier 3 pattern पर AI score देगा — Content, Grammar, Structure, Vocabulary</p>
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="यहाँ अपना essay या letter paste करो — AI SSC CGL Tier 3 examiner की तरह evaluate करेगा..."
              rows={12}
              style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', color: '#1e293b', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#64748b', fontSize: '13px' }}>{wordCount} words</span>
              <span style={{ color: wordCount >= 100 ? '#16a34a' : '#dc2626', fontSize: '13px', fontWeight: '600' }}>{wordCount >= 100 ? '✅ Ready to evaluate' : '⚠️ कम से कम 100 words लिखो'}</span>
            </div>
            <button onClick={evaluateWriting}
              disabled={loading || wordCount < 50}
              style={{ width: '100%', backgroundColor: '#7c3aed', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: '700', cursor: loading || wordCount < 50 ? 'not-allowed' : 'pointer', opacity: loading || wordCount < 50 ? 0.7 : 1, marginBottom: '16px' }}>
              {loading ? '🤖 Evaluating...' : '🤖 Get AI Score + Detailed Feedback'}
            </button>
            {aiEvaluation && (
              <div style={{ backgroundColor: '#f5f3ff', borderRadius: '10px', padding: '20px', border: '1px solid #ddd6fe' }}>
                <p style={{ color: '#7c3aed', fontWeight: '700', fontSize: '14px', margin: '0 0 12px 0' }}>🤖 AI Evaluation Result</p>
                <div style={{ color: '#1e293b', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{aiEvaluation}</div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#0e7490', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '800' }}>📊 My Descriptive Writing Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Essays Written', value: score.essays, color: '#0e7490' },
                { label: 'Letters Written', value: score.letters, color: '#7c3aed' },
                { label: 'Best Score', value: score.bestScore + '/100', color: '#16a34a' },
                { label: 'Avg Score', value: score.avgScore + '/100', color: '#ca8a04' },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#f0fdfa', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <p style={{ color: '#0e7490', fontWeight: '700', margin: '0 0 8px 0' }}>Target: 75+/100 in SSC CGL Tier 3</p>
              <button onClick={() => setActiveTab('essay')}
                style={{ backgroundColor: '#0e7490', color: 'white', padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Practice Essay Now →
              </button>
            </div>
          </div>
        )}

      </div>

      <footer style={{ backgroundColor: '#0e7490', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px', marginTop: '40px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}