import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth() {
  const { login, signup, enterDemo, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

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
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        padding: '0 24px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 48, height: 48,
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 22
          }}>⚡</div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 600, margin: 0 }}>FocusFlow</h1>
          <p style={{ color: '#666', fontSize: 14, margin: '6px 0 0' }}>Life OS</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#111',
          border: '1px solid #222',
          borderRadius: 16,
          padding: '32px 28px'
        }}>
          <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 600, margin: '0 0 24px' }}>
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>

          {error && (
            <div style={{
              background: '#2a1010', border: '1px solid #5a2020',
              borderRadius: 8, padding: '10px 14px',
              color: '#f87171', fontSize: 13, marginBottom: 16
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#1a1a1a', border: '1px solid #2a2a2a',
                    borderRadius: 8, padding: '10px 14px',
                    color: '#fff', fontSize: 14, outline: 'none'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 8, padding: '10px 14px',
                  color: '#fff', fontSize: 14, outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#888', fontSize: 13, display: 'block', marginBottom: 6 }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 8, padding: '10px 14px',
                  color: '#fff', fontSize: 14, outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: loading ? '#333' : '#fff',
                color: loading ? '#666' : '#000',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: 12
              }}
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 12px' }}>
            <div style={{ flex: 1, height: 1, background: '#222' }} />
            <span style={{ color: '#555', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#222' }} />
          </div>

          {/* Demo Button */}
          <button
            onClick={() => { enterDemo(); navigate('/'); }}
            style={{
              width: '100%', padding: '11px',
              background: 'transparent',
              color: '#aaa',
              border: '1px solid #2a2a2a',
              borderRadius: 8, fontSize: 14,
              cursor: 'pointer', marginBottom: 20
            }}
          >
            Try Demo
          </button>

          {/* Toggle */}
          <p style={{ textAlign: 'center', color: '#555', fontSize: 13, margin: 0 }}>
            {isLogin ? "Account nahi hai? " : "Pehle se account hai? "}
            <span
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{ color: '#818cf8', cursor: 'pointer' }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}