"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    // Temporary — will connect to real database in Week 4
    setTimeout(() => {
      router.push("/login?registered=true");
    }, 1000);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'Arial, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        {/* Header */}
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center', margin: '0 0 8px 0' }}>
          Sarkari <span style={{ color: '#dc2626' }}>Success</span>
        </h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
          Create your free account
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '12px',
            boxSizing: 'border-box',
            color: '#1a1a1a',
          }}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '12px',
            boxSizing: 'border-box',
            color: '#1a1a1a',
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '16px',
            boxSizing: 'border-box',
            color: '#1a1a1a',
          }}
        />

        {error && (
          <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
            {error}
          </p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1e3a8a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            marginBottom: '16px',
          }}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', margin: 0 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#1e3a8a', fontWeight: 'bold', textDecoration: 'none' }}>
            Login
          </a>
        </p>
      </div>
    </main>
  );
}