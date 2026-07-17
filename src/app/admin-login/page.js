"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/manage-ss-2026-xk9");
      } else {
        setError("Wrong password. Try again.");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0' }}>
          Sarkari <span style={{ color: '#dc2626' }}>Success</span>
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Admin Access — Restricted</p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleLogin()}
          style={{ width: '100%', padding: '12px', border: '2px solid #1e3a8a', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', boxSizing: 'border-box', marginBottom: '12px' }}
        />

        {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Verifying...' : 'Login to Admin'}
        </button>
      </div>
    </main>
  );
}