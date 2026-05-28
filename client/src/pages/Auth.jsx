import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth() {
  const { login, signup, enterDemo, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div style={{ width: 360, padding: 32, border: '1px solid #ccc', borderRadius: 12 }}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', marginBottom: 12, padding: 8 }}
            />
          )}
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: 10, marginBottom: 8 }}
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Demo Mode */}
        <button
          onClick={() => { enterDemo(); navigate('/'); }}
          style={{ width: '100%', padding: 10, marginBottom: 8, background: '#f0f0f0' }}
        >
          Try Demo
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
        >
          {isLogin ? 'Account nahi hai? Sign Up' : 'Login karo'}
        </p>
      </div>
    </div>
  );
}