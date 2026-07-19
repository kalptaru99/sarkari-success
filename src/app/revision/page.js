"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RevisionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchRevisionPlan();
    }
  }, [status]);

  const fetchRevisionPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/revision-plan");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching revision plan:", error);
    }
    setLoading(false);
  };

  const priorityColor = {
    high: { bg: '#fee2e2', color: '#dc2626', label: 'High Priority' },
    medium: { bg: '#fef9c3', color: '#ca8a04', label: 'Medium Priority' },
    low: { bg: '#dcfce7', color: '#16a34a', label: 'Low Priority' },
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>AI is creating your 7-day revision plan...</p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Analyzing your weak topics and exam date</p>
        </div>
      </main>
    );
  }

  if (!data?.revisionPlan) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 12px 0' }}>Take a Mock Test First</h2>
          <p style={{ color: '#666', margin: '0 0 24px 0' }}>AI needs your performance data to create a personalized revision plan.</p>
          <a href="/mocktest" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Take Mock Test →
          </a>
        </div>
      </main>
    );
  }

  const { revisionPlan, studentData, daysUntilExam } = data;
  const selectedDayData = revisionPlan[selectedDay];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Revision Planner
        </h1>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px' }}>

        {/* Header Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e3a8a' }}>{studentData.targetExam}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Target Exam</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: daysUntilExam && daysUntilExam < 30 ? '#dc2626' : '#1e3a8a' }}>
              {daysUntilExam ? daysUntilExam + ' days' : 'Set exam date'}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>Until Exam</div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a' }}>{studentData.studyHours}h/day</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Study Hours</div>
          </div>
        </div>

        {/* 7 Day Plan Overview */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1e3a8a', margin: '0 0 16px 0', fontSize: '18px' }}>📅 Your 7-Day Revision Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {revisionPlan.map((day, index) => {
              const priority = priorityColor[day.priority] || priorityColor.medium;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  style={{
                    backgroundColor: selectedDay === index ? '#1e3a8a' : priority.bg,
                    borderRadius: '10px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: selectedDay === index ? '2px solid #1e3a8a' : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: '700', color: selectedDay === index ? 'white' : priority.color, marginBottom: '4px' }}>
                    Day {day.day}
                  </div>
                  <div style={{ fontSize: '10px', color: selectedDay === index ? '#93c5fd' : '#666', lineHeight: '1.3' }}>
                    {day.focus?.split(' ')[0]}
                  </div>
                  <div style={{ marginTop: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: priority.color, margin: '6px auto 0' }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Detail */}
        {selectedDayData && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ color: '#1e3a8a', margin: '0 0 4px 0', fontSize: '22px' }}>
                  Day {selectedDayData.day} — {selectedDayData.focus}
                </h2>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{selectedDayData.day_name}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ backgroundColor: (priorityColor[selectedDayData.priority] || priorityColor.medium).bg, color: (priorityColor[selectedDayData.priority] || priorityColor.medium).color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {(priorityColor[selectedDayData.priority] || priorityColor.medium).label}
                </span>
                <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                  {selectedDayData.duration}
                </span>
              </div>
            </div>

            {/* Topics */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '15px', margin: '0 0 10px 0' }}>📖 Topics to Cover Today</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedDayData.topics?.map((topic, i) => (
                  <span key={i} style={{ backgroundColor: '#eff6ff', color: '#1e3a8a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', border: '1px solid #bfdbfe' }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Reason */}
            {selectedDayData.reason && (
              <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '14px', marginBottom: '16px', borderLeft: '4px solid #16a34a' }}>
                <p style={{ color: '#166534', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                  💡 {selectedDayData.reason}
                </p>
              </div>
            )}

            {/* Skip */}
            {selectedDayData.skip && (
              <div style={{ backgroundColor: '#fef9c3', borderRadius: '8px', padding: '14px', borderLeft: '4px solid #ca8a04' }}>
                <p style={{ color: '#854d0e', fontSize: '13px', margin: 0 }}>
                  ⏭️ <strong>Skip today:</strong> {selectedDayData.skip}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Subject Performance */}
        {studentData.subjectPerformance.length > 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ color: '#1e3a8a', margin: '0 0 16px 0', fontSize: '18px' }}>📊 Your Subject Accuracy</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {studentData.subjectPerformance.map((subject, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{subject.subject}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: parseFloat(subject.accuracy) >= 70 ? '#16a34a' : parseFloat(subject.accuracy) >= 40 ? '#ca8a04' : '#dc2626' }}>
                      {subject.accuracy}%
                    </span>