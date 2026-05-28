import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import toast from 'react-hot-toast';
import api from '../utilities/axios.js'; // 🔥 FIXED: 'api' folder ki jagah 'utilities' kar diya!
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

  useEffect(() => {
    if (!token || token === 'demo-token') return;

    api
      .get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);

        localStorage.setItem(
          'focusflow_user',
          JSON.stringify(data.user)
        );
      })
      .catch(() => {
        logout();
      });
  }, [token]);

  async function login(payload) {
    setLoading(true);

    try {
      const { data } = await api.post(
        '/auth/login',
        payload
      );

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem(
        'focusflow_token',
        data.token
      );

      localStorage.setItem(
        'focusflow_user',
        JSON.stringify(data.user)
      );

      toast.success('Login successful');

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Login failed'
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signup(payload) {
    setLoading(true);

    try {
      const { data } = await api.post(
        '/auth/register',
        payload
      );

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem(
        'focusflow_token',
        data.token
      );

      localStorage.setItem(
        'focusflow_user',
        JSON.stringify(data.user)
      );

      toast.success('Signup successful');

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Signup failed'
      );

      throw error;
    } finally {
      setLoading(false);
    }
  }

  function enterDemo() {
    setToken('demo-token');

    setUser(demoUser);

    localStorage.setItem(
      'focusflow_token',
      'demo-token'
    );

    localStorage.setItem(
      'focusflow_user',
      JSON.stringify(demoUser)
    );
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
      isDemo: token === 'demo-token',
      login,
      signup,
      logout,
      enterDemo
    }),
    [user, token, loading]
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