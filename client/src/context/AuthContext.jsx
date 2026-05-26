import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../lib/api.js';
import { demoUser } from '../lib/demoData.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('focusflow_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('focusflow_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token || token === 'demo-token') return;
    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('focusflow_user', JSON.stringify(data.user));
      })
      .catch(() => {
        setToken(null);
        setUser(null);
      });
  }, [token]);

  async function login(payload) {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('focusflow_token', data.token);
      localStorage.setItem('focusflow_user', JSON.stringify(data.user));
      toast.success('Welcome back to flow.');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Demo mode is still available.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signup(payload) {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('focusflow_token', data.token);
      localStorage.setItem('focusflow_user', JSON.stringify(data.user));
      toast.success('Your FocusFlow command center is ready.');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function enterDemo() {
    setToken('demo-token');
    setUser(demoUser);
    localStorage.setItem('focusflow_token', 'demo-token');
    localStorage.setItem('focusflow_user', JSON.stringify(demoUser));
  }

  function logout() {
    localStorage.removeItem('focusflow_token');
    localStorage.removeItem('focusflow_user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, setUser, token, loading, isDemo: token === 'demo-token', login, signup, logout, enterDemo }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
