"use client";
import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    topic: "General Intelligence",
    question: "Find the odd one out: 3, 5, 7, 9, 11",
    options: ["3", "9", "11", "5"],
    answer: "9",
  },
  {
    id: 2,
    topic: "English Language",
    question: "Choose the correct synonym of 'Abundant':",
    options: ["Scarce", "Plentiful", "Limited", "Rare"],
    answer: "Plentiful",
  },
  {
    id: 3,
    topic: "Quantitative Aptitude",
    question: "If 15% of a number is 45, what is the number?",
    options: ["200", "250", "300", "350"],
    answer: "300",
  },
  {
    id: 4,
    topic: "General Awareness",
    question: "Who is known as the Father of the Indian Constitution?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Sardar Patel"],
    answer: "B.R. Ambedkar",
  },
  {
    id: 5,
    topic: "Quantitative Aptitude",
    question: "A train travels 360 km in 4 hours. What is its speed in km/h?",
    options: ["80", "90", "100", "120"],
    answer: "90",
  },
  {
    id: 6,
    topic: "General Intelligence",
    question: "Complete the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    answer: "42",
  },
  {
    id: 7,
    topic: "English Language",
    question: "Choose the correct antonym of 'Benevolent':",
    options: ["Kind", "Generous", "Malevolent", "Caring"],
    answer: "Malevolent",
  },
  {
    id: 8,
    topic: "General Awareness",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    answer: "Mars",
  },
  {
    id: 9,
    topic: "Quantitative Aptitude",
    question: "What is the simple interest on ₹5000 at 8% per annum for 3 years?",
    options: ["₹1000", "₹1200", "₹1500", "₹1800"],
    answer: "₹1200",
  },
  {
    id: 10,
    topic: "General Intelligence",
    question: "If A=1, B=2, C=3... what is the value of CAT?",
    options: ["24", "26", "27", "28"],
    answer: "24",
  },
];

const TOTAL_TIME = 10 * 60; // 10 minutes in seconds

export default function MockTestPage() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft === 0) {
      setSubmitted(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAnswer = (option) => {
    if (selectedAnswers[currentQ] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ]: option }));
  };

  const getScore = () => {
    return questions.filter((q, i) => selectedAnswers[i] === q.answer).length;
  };

  const getOptionStyle = (index, option) => {
    if (!submitted) {
      return {
        backgroundColor: selectedAnswers[currentQ] === option ? '#dbeafe' : '#f9fafb',
        border: `2px solid ${selectedAnswers[currentQ] === option ? '#1e3a8a' : '#e5e7eb'}`,
        color: '#444',
      };
    }
    if (option === questions[index].answer) {
      return { backgroundColor: '#dcfce7', border: '2px solid #16a34a', color: '#16a34a', fontWeight: 'bold' };
    }
    if (selectedAnswers[index] === option && option !== questions[index].answer) {
      return { backgroundColor: '#fee2e2', border: '2px solid #dc2626', color: '#dc2626', fontWeight: 'bold' };
    }
    return { backgroundColor: '#f9fafb', border: '2px solid #e5e7eb', color: '#444' };
  };

  // Start Screen
  if (!started) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
            SSC CGL Mock Test
          </h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>Test your preparation with this timed mock test</p>

          {[
            { label: 'Questions', value: '10' },
            { label: 'Time Limit', value: '10 Minutes' },
            { label: 'Topics', value: '4 Subjects' },
            { label: 'Marking', value: '+1 Correct, 0 Wrong' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>{item.label}</span>
              <span style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '14px' }}>{item.value}</span>
            </div>
          ))}

          <button
            onClick={() => setStarted(true)}
            style={{
              marginTop: '30px',
              width: '100%',
              padding: '14px',
              backgroundColor: '#1e3a8a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Start Test →
          </button>
        </div>
      </main>
    );
  }

  // Results Screen
  if (submitted) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — Test Results
          </h1>
        </div>

        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
          {/* Score Card */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <div style={{ fontSize: '64px', fontWeight: 'bold', color: percentage >= 70 ? '#16a34a' : percentage >= 40 ? '#ca8a04' : '#dc2626' }}>
              {score}/{questions.length}
            </div>
            <div style={{ fontSize: '24px', color: '#666', marginBottom: '16px' }}>{percentage}%</div>
            <div style={{ fontSize: '18px', color: percentage >= 70 ? '#16a34a' : percentage >= 40 ? '#ca8a04' : '#dc2626', fontWeight: 'bold' }}>
              {percentage >= 70 ? '🎉 Excellent! Keep it up!' : percentage >= 40 ? '👍 Good effort! Practice more.' : '📚 Need more practice. Don\'t give up!'}
            </div>
          </div>

          {/* Answer Review */}
          <h3 style={{ color: '#1e3a8a', marginBottom: '16px' }}>Answer Review</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Q{i + 1}: {q.question}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {q.options.map((option, j) => (
                    <div key={j} style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '13px', ...getOptionStyle(i, option) }}>
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
              Retake Test
            </a>
            <a href="/questions" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid #1e3a8a' }}>
              Practice Questions
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Test Screen
  const q = questions[currentQ];
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      {/* Test Header */}
      <div style={{ backgroundColor: '#1e3a8a', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
          SSC CGL Mock Test
        </span>
        <span style={{
          color: timeLeft <= 60 ? '#fca5a5' : 'white',
          fontWeight: 'bold',
          fontSize: '18px',
        }}>
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ backgroundColor: '#dbeafe', height: '6px' }}>
        <div style={{ backgroundColor: '#1e3a8a', height: '100%', width: `${((currentQ + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>

        {/* Question */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
              {q.topic}
            </span>
            <span style={{ color: '#888', fontSize: '13px' }}>
              Question {currentQ + 1} of {questions.length}
            </span>
          </div>

          <p style={{ fontSize: '17px', fontWeight: '500', color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.5' }}>
            {q.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((option, i) => (
              <div
                key={i}
                onClick={() => handleAnswer(option)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: selectedAnswers[currentQ] ? 'default' : 'pointer',
                  transition: 'all 0.15s',
                  ...getOptionStyle(currentQ, option),
                }}
              >
                {String.fromCharCode(65 + i)}. {option}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '2px solid #1e3a8a',
              backgroundColor: 'white',
              color: '#1e3a8a',
              fontWeight: 'bold',
              cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQ === 0 ? 0.4 : 1,
            }}
          >
            ← Previous
          </button>

          {/* Question dots */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {questions.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentQ(i)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: i === currentQ ? '#1e3a8a' : selectedAnswers[i] !== undefined ? '#16a34a' : '#e5e7eb',
                  color: i === currentQ || selectedAnswers[i] !== undefined ? 'white' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(q => q + 1)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#1e3a8a',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#dc2626',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </main>
  );
}