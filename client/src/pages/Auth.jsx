import { createContext, useContext, useState } from 'react';
// 🔥 FIXED: Teri custom api file ka import (naam check kar lena api.js hai ya axios.js)
import api from '../lib/axios.js'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 LOGIN
  const login = async ({ email, password }) => {
    try {
      setLoading(true);

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token || res.data.data?.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      // 💣 🔥 SURE-SHOT FIX: Ab exact 'focusflow_token' naam se hi save hoga!
      localStorage.setItem("focusflow_token", token);
      localStorage.setItem("focusflow_user", JSON.stringify(res.data.user || null));

      console.log("TOKEN SAVED:", localStorage.getItem("focusflow_token"));

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
        // 💣 🔥 SURE-SHOT FIX: Signup mein bhi key name sahi kar diya
        localStorage.setItem("focusflow_token", token);
        localStorage.setItem("focusflow_user", JSON.stringify(res.data.user || null));
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
    localStorage.setItem("focusflow_token", demoToken);
    setUser({ name: "Demo User" });
  };

  // 🔥 LOGOUT
  const logout = () => {
    // 💣 🔥 SURE-SHOT FIX: Logout par sahi keys remove hongi
    localStorage.removeItem("focusflow_token");
    localStorage.removeItem("focusflow_user");
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