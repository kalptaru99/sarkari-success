"use client";
import { useState, useEffect } from "react";

const exams = ["SSC CGL", "SSC CHSL", "RRB NTPC", "RRB Group D", "UPSC Civil Services", "IBPS PO", "IBPS Clerk", "SBI PO"];

const topicsByExam = {
  "SSC CGL": ["All", "General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "SSC CHSL": ["All", "General Intelligence", "English Language", "Quantitative Aptitude", "General Awareness"],
  "RRB NTPC": ["All", "Mathematics", "General Intelligence", "General Awareness", "English Language"],
  "RRB Group D": ["All", "Mathematics", "General Intelligence", "General Science", "General Awareness"],
  "UPSC Civil Services": ["All", "History", "Geography", "Polity", "Economy", "Science & Technology", "Environment", "Current Affairs"],
  "IBPS PO": ["All", "Reasoning", "English Language", "Quantitative Aptitude", "General Awareness", "Computer Knowledge"],
  "IBPS Clerk": ["All", "Reasoning", "English Language", "Numerical Ability", "General Awareness", "Computer Knowledge"],
  "SBI PO": ["All", "Reasoning", "English Language", "Data Analysis", "General Awareness", "Computer Knowledge"],
};

export default function QuestionsPage() {
  const [selectedExam, setSelectedExam] = useState("SSC CGL");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [selectedExam, selectedTopic]);

  const fetchQuestions = async () => {
    setLoading(true);
    setSelectedAnswers({});
    try {
      let url = `/api/questions?exam=${encodeURIComponent(selectedExam)}&limit=20`;
      if (selectedTopic !== "All") {
        url += `&topic=${encodeURIComponent(selectedTopic)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (questionId, option) => {
    if (selectedAnswers[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const getOptionStyle = (question, option) => {
    const selected = selectedAnswers[question.id];
    const optionLetter = option.split('.')[0];

    if (!selected) {
      return { backgroundColor: '#f9fafb', border: '2px solid #e5e7eb', color: '#444', fontWeight: 'normal' };
    }
    if (optionLetter === question.correct_answer) {
      return { backgroundColor: '#dcfce7', border: '2px solid #16a34a', color: '#16a34a', fontWeight: 'bold' };
    }
    if (optionLetter === selected && selected !== question.correct_answer) {
      return { backgroundColor: '#fee2e2', border: '2px solid #dc2626', color: '#dc2626', fontWeight: 'bold' };
    }
    return { backgroundColor: '#f9fafb', border: '2px solid #e5e7eb', color: '#444', fontWeight: 'normal' };
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
        <h2 style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '8px' }}>Question Bank</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Practice questions for all government exams — random order every time</p>

        {/* Exam Selector */}
        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Select Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => { setSelectedExam(e.target.value); setSelectedTopic("All"); }}
                style={{ width: '100%', padding: '10px', border: '2px solid #1e3a8a', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {exams.map((exam, i) => (
                  <option key={i} value={exam}>{exam}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Select Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '2px solid #1e3a8a', borderRadius: '6px', fontSize: '14px', color: '#1a1a1a' }}
              >
                {topicsByExam[selectedExam].map((topic, i) => (
                  <option key={i} value={topic}>{topic}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={fetchQuestions}
            style={{ marginTop: '16px', width: '100%', padding: '10px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            🔄 Load New Random Questions
          </button>
        </div>

        {/* Questions */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#1e3a8a', fontSize: '16px' }}>
            Loading questions...
          </div>
        ) : questions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            No questions found for this selection.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((q, index) => (
              <div key={q.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                    {q.topic}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ backgroundColor: q.difficulty === 'easy' ? '#dcfce7' : q.difficulty === 'hard' ? '#fee2e2' : '#fef9c3', color: q.difficulty === 'easy' ? '#16a34a' : q.difficulty === 'hard' ? '#dc2626' : '#ca8a04', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>
                      {q.difficulty}
                    </span>
                    <span style={{ color: '#888', fontSize: '12px' }}>Q{index + 1}</span>
                  </div>
                </div>

                <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '500', marginBottom: '16px', lineHeight: '1.5' }}>
                  {q.question}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  {[
                    { letter: 'A', text: q.option_a },
                    { letter: 'B', text: q.option_b },
                    { letter: 'C', text: q.option_c },
                    { letter: 'D', text: q.option_d },
                  ].map((option) => (
                    <div
                      key={option.letter}
                      onClick={() => handleAnswer(q.id, option.letter)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: selectedAnswers[q.id] ? 'default' : 'pointer',
                        ...getOptionStyle(q, `${option.letter}.${option.text}`),
                      }}
                    >
                      <strong>{option.letter}.</strong> {option.text}
                    </div>
                  ))}
                </div>

                {selectedAnswers[q.id] && (
                  <div style={{ padding: '12px', backgroundColor: '#fef9c3', borderRadius: '8px', fontSize: '13px', color: '#444' }}>
                    💡 {q.explanation}
                  </div>
                )}

                {!selectedAnswers[q.id] && (
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>👆 Click an option to answer</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mock Test CTA */}
        {!loading && questions.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '12px' }}>
            <h3 style={{ color: 'white', fontSize: '20px', margin: '0 0 8px 0' }}>Ready to test yourself?</h3>
            <p style={{ color: '#93c5fd', margin: '0 0 20px 0', fontSize: '14px' }}>Take a timed mock test for {selectedExam}</p>
            <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
              Start Mock Test →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}