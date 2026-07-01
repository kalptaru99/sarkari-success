"use client";
import { useState } from "react";

const questions = [
  {
    id: 1,
    topic: "General Intelligence",
    question: "Find the odd one out: 3, 5, 7, 9, 11",
    options: ["3", "9", "11", "5"],
    answer: "9",
    explanation: "All others are prime numbers. 9 = 3×3, so it is not prime.",
  },
  {
    id: 2,
    topic: "English Language",
    question: "Choose the correct synonym of 'Abundant':",
    options: ["Scarce", "Plentiful", "Limited", "Rare"],
    answer: "Plentiful",
    explanation: "Abundant means existing in large quantities — same as Plentiful.",
  },
  {
    id: 3,
    topic: "Quantitative Aptitude",
    question: "If 15% of a number is 45, what is the number?",
    options: ["200", "250", "300", "350"],
    answer: "300",
    explanation: "15% of x = 45 → x = 45 × 100/15 = 300",
  },
  {
    id: 4,
    topic: "General Awareness",
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Sardar Patel"],
    answer: "B.R. Ambedkar",
    explanation: "Dr. B.R. Ambedkar was the chairman of the Drafting Committee of the Constitution.",
  },
  {
    id: 5,
    topic: "Quantitative Aptitude",
    question: "A train travels 360 km in 4 hours. What is its speed in km/h?",
    options: ["80", "90", "100", "120"],
    answer: "90",
    explanation: "Speed = Distance/Time = 360/4 = 90 km/h",
  },
  {
    id: 6,
    topic: "General Intelligence",
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    answer: "42",
    explanation: "Differences are 4, 6, 8, 10, 12 — so next is 30+12=42",
  },
  {
    id: 7,
    topic: "English Language",
    question: "Choose the correct antonym of 'Benevolent':",
    options: ["Kind", "Generous", "Malevolent", "Caring"],
    answer: "Malevolent",
    explanation: "Benevolent means well-meaning and kind. Its antonym is Malevolent meaning having evil intentions.",
  },
  {
    id: 8,
    topic: "General Awareness",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
    explanation: "Mars appears red due to iron oxide (rust) on its surface.",
  },
  {
    id: 9,
    topic: "Quantitative Aptitude",
    question: "What is the simple interest on ₹5000 at 8% per annum for 3 years?",
    options: ["₹1000", "₹1200", "₹1500", "₹1800"],
    answer: "₹1200",
    explanation: "SI = P×R×T/100 = 5000×8×3/100 = ₹1200",
  },
  {
    id: 10,
    topic: "General Intelligence",
    question: "Find the odd one out: 3, 5, 7, 9, 11",
    options: ["3", "9", "11", "5"],
    answer: "9",
    explanation: "All others are prime numbers. 9 = 3×3, so it is not prime.",
  },
];

const topics = ["All", "General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"];

export default function QuestionsPage() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const filtered = selectedTopic === "All"
    ? questions
    : questions.filter(q => q.topic === selectedTopic);

  const handleAnswer = (questionId, option) => {
    if (selectedAnswers[questionId]) return; // prevent changing answer
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const getOptionStyle = (question, option) => {
    const selected = selectedAnswers[question.id];
    
    if (!selected) {
      return {
        backgroundColor: '#f9fafb',
        border: '2px solid #e5e7eb',
        color: '#444',
        fontWeight: 'normal',
      };
    }

    if (option === question.answer) {
      return {
        backgroundColor: '#dcfce7',
        border: '2px solid #16a34a',
        color: '#16a34a',
        fontWeight: 'bold',
      };
    }

    if (option === selected && selected !== question.answer) {
      return {
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        color: '#dc2626',
        fontWeight: 'bold',
      };
    }

    return {
      backgroundColor: '#f9fafb',
      border: '2px solid #e5e7eb',
      color: '#444',
      fontWeight: 'normal',
    };
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span>
        </h1>
        <a href="/" style={{ color: 'white', fontSize: '14px', textDecoration: 'none' }}>← Back to Home</a>
      </div>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '8px' }}>
          SSC CGL Question Bank
        </h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          {questions.length} questions — click an option to check your answer
        </p>

        {/* Topic Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => setSelectedTopic(topic)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '2px solid #1e3a8a',
                backgroundColor: selectedTopic === topic ? '#1e3a8a' : 'white',
                color: selectedTopic === topic ? 'white' : '#1e3a8a',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((q) => (
            <div key={q.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                  {q.topic}
                </span>
                <span style={{ color: '#888', fontSize: '12px' }}>Q{q.id}</span>
              </div>

              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '500', marginBottom: '16px' }}>
                {q.question}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {q.options.map((option, i) => (
                  <div
                    key={i}
                    onClick={() => handleAnswer(q.id, option)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: selectedAnswers[q.id] ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      ...getOptionStyle(q, option),
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {selectedAnswers[q.id] && (
                <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fef9c3', borderRadius: '8px', fontSize: '13px', color: '#444' }}>
                  💡 {q.explanation}
                </div>
              )}

              {!selectedAnswers[q.id] && (
                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
                  👆 Click an option to answer
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Mock Test CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '12px' }}>
          <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>
            Ready to test yourself?
          </h3>
          <p style={{ color: '#93c5fd', margin: '0 0 20px 0', fontSize: '14px' }}>
            Take a timed 10-question SSC CGL mock test
          </p>
          <a href="/mocktest" style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
          }}>
            Start Mock Test →
          </a>
        </div>
      </div>
    </main>
  );
}