"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const exams = ["SSC CGL", "SSC CHSL", "RRB NTPC", "RRB Group D", "UPSC Civil Services", "IBPS PO", "IBPS Clerk", "SBI PO"];
const TOTAL_TIME = 10 * 60;

export default function MockTestPage() {
  const { data: session } = useSession();
  const [selectedExam, setSelectedExam] = useState("SSC CGL");
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft === 0) { setSubmitted(true); return; }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startTest = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/questions?exam=${encodeURIComponent(selectedExam)}&limit=10`);
      const data = await response.json();
      setQuestions(data.questions || []);
      setStarted(true);
      setTimeLeft(TOTAL_TIME);
      setSelectedAnswers({});
      setCurrentQ(0);
      setSubmitted(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (option) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ]: option }));
  };

  const getScore = () => {
    return questions.filter((q, i) => selectedAnswers[i] === q.correct_answer).length;
  };

  const saveScore = async (score) => {
    if (!session?.user) return;
    try {
      await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam: selectedExam,
          score,
          total: questions.length,
          timeTaken: TOTAL_TIME - timeLeft,
        }),
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleSubmit = () => {
    const score = getScore();
    setSubmitted(true);
    saveScore(score);
  };

  const getOptionStyle = (index, option) => {
    if (!submitted) {
      return {
        backgroundColor: selectedAnswers[index] === option ? '#dbeafe' : '#f9fafb',
        border: `2px solid ${selectedAnswers[index] === option ? '#1e3a8a' : '#e5e7eb'}`,
        color: selectedAnswers[index] === option ? '#1e3a8a' : '#444',
        fontWeight: selectedAnswers[index] === option ? 'bold' : 'normal',
      };
    }
    if (option === questions[index]?.correct_answer) {
      return { backgroundColor: '#dcfce7', border: '2px solid #16a34a', color: '#16a34a', fontWeight: 'bold' };
    }
    if (selectedAnswers[index] === option && option !== questions[index]?.correct_answer) {
      return { backgroundColor: '#fee2e2', border: '2px solid #dc2626', color: '#dc2626', fontWeight: 'bold' };
    }
    return { backgroundColor: '#f9fafb', border: '2px solid #e5e7eb', color: '#444' };
  };

  const q = questions[currentQ];
  if (!started) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
            Sarkari <span style={{ color: '#dc2626' }}>Success</span>
          </h1>
          <h2 style={{ fontSize: '20px', color: '#444', margin: '0 0 24px 0' }}>Mock Test</h2>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Select Exam</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a' }}
            >
              {exams.map((exam, i) => (
                <option key={i} value={exam}>{exam}</option>
              ))}
            </select>
          </div>

          {[
            { label: 'Questions', value: '10' },
            { label: 'Time Limit', value: '10 Minutes' },
            { label: 'Marking', value: '+1 Correct, 0 Wrong' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
              <span style={{ color: '#666', fontSize: '14px' }}>{item.label}</span>
              <span style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '14px' }}>{item.value}</span>
            </div>
          ))}

          <button
            onClick={startTest}
            disabled={loading}
            style={{ marginTop: '24px', width: '100%', padding: '14px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Loading Questions...' : `Start ${selectedExam} Test →`}
          </button>
        </div>
      </main>
    );
  }

  if (submitted) {
    const score = getScore();
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px' }}>
          <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — Results
          </h1>
        </div>

        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 8px 0' }}>{selectedExam}</p>
            <div style={{ fontSize: '64px', fontWeight: 'bold', color: percentage >= 70 ? '#16a34a' : percentage >= 40 ? '#ca8a04' : '#dc2626' }}>
              {score}/{questions.length}
            </div>
            <div style={{ fontSize: '24px', color: '#666', marginBottom: '16px' }}>{percentage}%</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: percentage >= 70 ? '#16a34a' : percentage >= 40 ? '#ca8a04' : '#dc2626' }}>
              {percentage >= 70 ? '🎉 Excellent! Keep it up!' : percentage >= 40 ? '👍 Good effort! Practice more.' : '📚 Need more practice. Don\'t give up!'}
            </div>
            {session?.user && <p style={{ color: '#888', fontSize: '13px', marginTop: '12px' }}>✅ Score saved to your dashboard</p>}
          </div>

          <h3 style={{ color: '#1e3a8a', marginBottom: '16px' }}>Answer Review</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map((q, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', margin: '0 0 10px 0' }}>
                  Q{i + 1}: {q.question}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {[
                    { letter: 'A', text: q.option_a },
                    { letter: 'B', text: q.option_b },
                    { letter: 'C', text: q.option_c },
                    { letter: 'D', text: q.option_d },
                  ].map((option) => (
                    <div key={option.letter} style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '13px', ...getOptionStyle(i, option.letter) }}>
                      <strong>{option.letter}.</strong> {option.text}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#fef9c3', borderRadius: '6px', fontSize: '12px', color: '#444' }}>
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => { setStarted(false); setSubmitted(false); }}
              style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
            >
              Take Another Test
            </button>
            <a href="/questions" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', border: '2px solid #1e3a8a' }}>
              Practice Questions
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!q) return null;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#1e3a8a', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>{selectedExam} Mock Test</span>
        <span style={{ color: timeLeft <= 60 ? '#fca5a5' : 'white', fontWeight: 'bold', fontSize: '18px' }}>⏱ {formatTime(timeLeft)}</span>
      </div>

      <div style={{ backgroundColor: '#dbeafe', height: '6px' }}>
        <div style={{ backgroundColor: '#1e3a8a', height: '100%', width: `${((currentQ + 1) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>{q.topic}</span>
            <span style={{ color: '#888', fontSize: '13px' }}>Question {currentQ + 1} of {questions.length}</span>
          </div>

          <p style={{ fontSize: '17px', fontWeight: '500', color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.5' }}>{q.question}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { letter: 'A', text: q.option_a },
              { letter: 'B', text: q.option_b },
              { letter: 'C', text: q.option_c },
              { letter: 'D', text: q.option_d },
            ].map((option) => (
              <div
                key={option.letter}
                onClick={() => handleAnswer(option.letter)}
                style={{ padding: '14px 18px', borderRadius: '8px', fontSize: '15px', cursor: submitted ? 'default' : 'pointer', transition: 'all 0.15s', ...getOptionStyle(currentQ, option.letter) }}
              >
                <strong>{option.letter}.</strong> {option.text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            style={{ padding: '10px 20px', borderRadius: '8px', border: '2px solid #1e3a8a', backgroundColor: 'white', color: '#1e3a8a', fontWeight: 'bold', cursor: currentQ === 0 ? 'not-allowed' : 'pointer', opacity: currentQ === 0 ? 0.4 : 1 }}
          >
            ← Previous
          </button>

          <div style={{ display: 'flex', gap: '6px' }}>
            {questions.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentQ(i)}
                style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: i === currentQ ? '#1e3a8a' : selectedAnswers[i] !== undefined ? '#16a34a' : '#e5e7eb', color: i === currentQ || selectedAnswers[i] !== undefined ? 'white' : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(q => q + 1)}
              style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#1e3a8a', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#dc2626', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </main>
  );
}