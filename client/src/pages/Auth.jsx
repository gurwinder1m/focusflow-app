import { createContext, useContext, useState } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 LOGIN (MAIN FIX HERE)
  const login = async ({ email, password }) => {
    try {
      setLoading(true);

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // 💣 IMPORTANT FIX (TOKEN SAVE)
      const token = res.data.token || res.data.data?.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      setUser(res.data.user || null);

      setLoading(false);

      return res.data;
    } catch (error) {
      setLoading(false);
      console.log("LOGIN ERROR:", error);
      throw error;
    }
  };

  // 🔥 SIGNUP
  const signup = async (form) => {
    try {
      setLoading(true);

      const res = await api.post('/auth/register', form);

      const token = res.data.token || res.data.data?.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      setUser(res.data.user || null);

      setLoading(false);

      return res.data;
    } catch (error) {
      setLoading(false);
      console.log("SIGNUP ERROR:", error);
      throw error;
    }
  };

  // 🔥 DEMO MODE
  const enterDemo = () => {
    const demoToken = "demo-token";
    localStorage.setItem("token", demoToken);
    setUser({ name: "Demo User" });
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        enterDemo,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);