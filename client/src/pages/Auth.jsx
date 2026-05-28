import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth() {
  const { login, signup, enterDemo, loading, token } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (token) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0c0c0e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: '24px'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: 860,
        background: '#0c0c0e',
        border: '1px solid #1e1e24',
        borderRadius: 20,
        overflow: 'hidden',
        minHeight: 560
      }}>

        {/* LEFT PANEL */}
        <div style={{
          flex: 1,
          padding: '48px 40px',
          borderRight: '1px solid #1e1e24',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
              <div style={{
                width: 32, height: 32, background: '#7c6ff7',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span style={{ color: '#e8e8f0', fontSize: 15, fontWeight: 600 }}>FocusFlow</span>
            </div>

            {/* Tagline */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#16161f', border: '1px solid #23232e',
                borderRadius: 20, padding: '5px 12px',
                fontSize: 12, color: '#666', marginBottom: 20
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                2,400+ users building better habits
              </div>
              <h1 style={{ color: '#e8e8f0', fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>
                Your life,<br />
                <span style={{ color: '#7c6ff7' }}>systematized.</span>
              </h1>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>
                Track habits, crush goals, stay focused.<br />Everything in one place.
              </p>
            </div>

            {/* Features */}
            {[
              { icon: 'M3 4h18v18H3V4zm13-2v4M8 2v4M3 10h18', label: 'Habit streaks & daily check-ins' },
              { icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 4v6l4 2', label: 'Focus timer with deep work sessions' },
              { icon: 'M22 12h-4l-3 9L9 3l-3 9H2', label: 'Analytics to track your progress' },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32, background: '#16161f',
                  border: '1px solid #23232e', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c6ff7" strokeWidth="2">
                    <path d={icon} />
                  </svg>
                </div>
                <span style={{ color: '#555', fontSize: 13 }}>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ color: '#333', fontSize: 12 }}>© 2025 FocusFlow · Life OS</div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 360, padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ color: '#e8e8f0', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{ color: '#444', fontSize: 13 }}>
              {isLogin ? 'Sign in to continue your streak' : 'Start your journey today'}
            </p>
          </div>

          {error && (
            <div style={{
              background: '#1a1010', border: '1px solid #5a2020',
              borderRadius: 8, padding: '10px 14px',
              color: '#f87171', fontSize: 13, marginBottom: 16
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#555', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Name</div>
                <input
                  type="text" placeholder="Your name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <div style={{ color: '#555', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</div>
              <input
                type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ color: '#555', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Password</div>
              <input
                type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <span style={{ color: '#7c6ff7', fontSize: 12, cursor: 'pointer' }}>Forgot password?</span>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: 12,
              background: loading ? '#3d3780' : '#7c6ff7',
              color: '#fff', border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: 12
            }}>
              {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 12px' }}>
            <div style={{ flex: 1, height: 1, background: '#1e1e24' }} />
            <span style={{ color: '#333', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1e1e24' }} />
          </div>

          <button
            onClick={() => { enterDemo(); navigate('/'); }}
            style={{
              width: '100%', padding: 11,
              background: 'transparent', color: '#888',
              border: '1px solid #23232e', borderRadius: 10,
              fontSize: 13, cursor: 'pointer', marginBottom: 24
            }}>
            Try Demo — no signup needed
          </button>

          <p style={{ textAlign: 'center', color: '#444', fontSize: 13 }}>
            {isLogin ? "No account? " : "Already have one? "}
            <span
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{ color: '#7c6ff7', cursor: 'pointer' }}
            >
              {isLogin ? 'Create one free' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#13131a',
  border: '1px solid #23232e',
  borderRadius: 10,
  padding: '11px 14px',
  color: '#e8e8f0',
  fontSize: 13,
  outline: 'none',
};