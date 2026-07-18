"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DailyMissionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      fetchMission();
    }
  }, [status]);

  const fetchMission = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/daily-mission");
      const data = await response.json();
      setMission(data.mission);
    } catch (error) {
      console.error("Error fetching mission:", error);
    }
    setLoading(false);
  };

  const completeTask = async (taskIndex) => {
    setCompleting(taskIndex);
    try {
      const response = await fetch("/api/daily-mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskIndex }),
      });
      const data = await response.json();
      if (data.success) {
        setMission(prev => ({
          ...prev,
          completed_tasks: data.completedTasks,
          is_completed: data.isCompleted,
        }));
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
    setCompleting(null);
  };

  const tasks = mission?.tasks || [];
  const completedTasks = mission?.completed_tasks || [];
  const completedCount = completedTasks.length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const priorityColor = {
    high: { bg: '#fee2e2', color: '#dc2626', label: 'High Priority' },
    medium: { bg: '#fef9c3', color: '#ca8a04', label: 'Medium Priority' },
    low: { bg: '#dcfce7', color: '#16a34a', label: 'Low Priority' },
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
          <p style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: 'bold' }}>AI is generating your Daily Mission...</p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Personalizing based on your performance</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif' }}>

      <div style={{ backgroundColor: '#1e3a8a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
          Sarkari <span style={{ color: '#fca5a5' }}>Success</span> — AI Daily Mission
        </h1>
        <a href="/dashboard" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>← Dashboard</a>
      </div>

      <div style={{ maxWidth: '700px', margin: '30px auto', padding: '0 20px' }}>

        <div style={{ backgroundColor: '#1e3a8a', borderRadius: '12px', padding: '24px', marginBottom: '24px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                🎯 Today's Mission
              </h2>
              <p style={{ margin: 0, color: '#93c5fd', fontSize: '13px' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{completedCount}/{totalTasks}</div>
              <div style={{ fontSize: '12px', color: '#93c5fd' }}>tasks done</div>
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
            <div style={{ backgroundColor: progressPercent === 100 ? '#4ade80' : '#fbbf24', height: '100%', width: progressPercent + '%', borderRadius: '6px', transition: 'width 0.5s' }} />
          </div>
          <p style={{ margin: '8px 0 0 0', color: '#93c5fd', fontSize: '13px' }}>
            {progressPercent === 100 ? '🎉 Mission Complete! Excellent work today!' : progressPercent + '% complete — keep going!'}
          </p>
        </div>

        {mission?.is_completed && (
          <div style={{ backgroundColor: '#dcfce7', borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '24px', border: '2px solid #16a34a' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏆</div>
            <h3 style={{ color: '#16a34a', margin: '0 0 8px 0' }}>Mission Accomplished!</h3>
            <p style={{ color: '#444', fontSize: '14px', margin: '0 0 16px 0' }}>You completed all tasks for today. Come back tomorrow for a new mission!</p>
            <a href="/mocktest" style={{ backgroundColor: '#16a34a', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              Take a Mock Test Now
            </a>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {tasks.map((task, index) => {
            const isCompleted = completedTasks.includes(index);
            const priority = priorityColor[task.priority] || priorityColor.medium;

            return (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: isCompleted ? '2px solid #16a34a' : '1px solid #e5e7eb',
                opacity: isCompleted ? 0.8 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '20px' }}>
                        {isCompleted ? '✅' : index === 0 ? '🔥' : index === 1 ? '📚' : index === 2 ? '✍️' : index === 3 ? '🧠' : '⭐'}
                      </span>
                      <span style={{ backgroundColor: priority.bg, color: priority.color, fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                        {priority.label}
                      </span>
                      <span style={{ backgroundColor: '#dbeafe', color: '#1e3a8a', fontSize: '11px', padding: '2px 8px', borderRadius: '10px' }}>
                        {task.duration}
                      </span>
                    </div>
                    <p style={{ color: isCompleted ? '#16a34a' : '#1a1a1a', fontSize: '15px', fontWeight: '600', margin: '0 0 6px 0', textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {task.task}
                    </p>
                    <p style={{ color: '#666', fontSize: '13px', margin: '0 0 4px 0' }}>
                      Subject: <strong>{task.subject}</strong>
                    </p>
                    {task.reason && (
                      <p style={{ color: '#888', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>
                        {task.reason}
                      </p>
                    )}
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => completeTask(index)}
                      disabled={completing === index}
                      style={{
                        marginLeft: '12px',
                        padding: '8px 16px',
                        backgroundColor: '#1e3a8a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: completing === index ? 'not-allowed' : 'pointer',
                        opacity: completing === index ? 0.7 : 1,
                        flexShrink: 0,
                      }}
                    >
                      {completing === index ? '...' : 'Done ✓'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '30px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <a href="/mocktest" style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
            Take Mock Test
          </a>
          <a href="/coach" style={{ backgroundColor: '#1e3a8a', color: 'white', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
            AI Coach Analysis
          </a>
          <a href="/sarkarigpt" style={{ backgroundColor: 'white', color: '#1e3a8a', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', border: '2px solid #1e3a8a' }}>
            Ask SarkariGPT
          </a>
        </div>

      </div>

      <footer style={{ backgroundColor: '#1e3a8a', color: 'white', textAlign: 'center', padding: '16px', fontSize: '13px' }}>
        2026 Sarkari Success. All rights reserved. sarkarisuccess.com
      </footer>
    </main>
  );
}