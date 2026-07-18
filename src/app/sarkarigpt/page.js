"use client";
import { useState, useRef, useEffect } from "react";

const suggestedQuestions = [
  "SSC CGL 2026 eligibility criteria kya hai?",
  "RRB NTPC syllabus in Hindi",
  "UPSC preparation strategy for beginners",
  "Banking exam me kaunse subject hote hain?",
  "Railway Group D physical test details",
  "SSC CGL vs IBPS PO which is better?",
];

export default function SarkariGPT() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste! 🙏 Main SarkariGPT hoon — aapka AI career guide for government jobs. SSC, Railway, UPSC, Banking ya kisi bhi sarkari naukri ke baare mein poochein. Main Hindi aur English dono mein help kar sakta hoon!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage) return;

    setInput("");
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const profileRes = await fetch("/api/student-profile");
      const profileData = await profileRes.json();
      const preferredLanguage = profileData?.profile?.preferred_language || "Hindi";

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role, content: m.content })),
          preferredLanguage,
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply || data.error,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, kuch problem aa gayi. Please dobara try karein.",
      }]);
    }

    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari<span style={{ color: '#fca5a5' }}>GPT</span>
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '12px', margin: '2px 0 0 0' }}>
            AI-Powered Govt Job Career Guide
          </p>
        </div>
        <a href="/" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Home</a>
      </div>

      {/* Suggested Questions */}
      <div style={{ backgroundColor: 'white', padding: '12px 20px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px', whiteSpace: 'nowrap' }}>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #1e3a8a',
                backgroundColor: 'white',
                color: '#1e3a8a',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            {msg.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginRight: '10px', flexShrink: 0 }}>
                🤖
              </div>
            )}
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: msg.role === 'user' ? '#1e3a8a' : 'white',
              color: msg.role === 'user' ? 'white' : '#1a1a1a',
              fontSize: '14px',
              lineHeight: '1.6',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginLeft: '10px', flexShrink: 0 }}>
                👤
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
              🤖
            </div>
            <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1e3a8a',
                    animation: `bounce 1s infinite ${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ backgroundColor: 'white', borderTop: '1px solid #e5e7eb', padding: '16px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
            placeholder="SSC, Railway, UPSC ke baare mein poochein..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '25px',
              border: '2px solid #e5e7eb',
              fontSize: '14px',
              outline: 'none',
              color: '#1a1a1a',
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: loading || !input.trim() ? '#93c5fd' : '#1e3a8a',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Send →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </main>
  );
}