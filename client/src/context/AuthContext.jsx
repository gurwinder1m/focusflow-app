import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import { demoUser } from '../lib/demoData.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('focusflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('focusflow_token')
  );

  const [loading, setLoading] = useState(false);

  // ✅ NEW: Jab tak /auth/me verify na ho, kuch render mat karo
  const [initializing, setInitializing] = useState(
    () => !!localStorage.getItem('focusflow_token')
  );

  useEffect(() => {
    // Demo token hai toh verify karne ki zaroorat nahi
    if (!token || token === 'demo-token') {
      setInitializing(false);
      return;
    }

    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('focusflow_user', JSON.stringify(data.user));
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setInitializing(false); // ✅ Verification complete
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
      toast.success('Login successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
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
      toast.success('Signup successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
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
    localStorage.clear();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      loading,
      initializing, // ✅ Export karo
      isDemo: token === 'demo-token',
      login,
      signup,
      logout,
      enterDemo
    }),
    [user, token, loading, initializing]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}