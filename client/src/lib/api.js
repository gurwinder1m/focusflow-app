import axios from 'axios';

export const api = axios.create({
  // 🔥 SURE-SHOT FIX 1: Direct backend URL ka fallback de diya hai yahan
  baseURL: import.meta.env.VITE_API_URL || 'https://focusflow-backend-21t9.onrender.com/api',
  
  // 🔥 SURE-SHOT FIX 2: 'withCredentials: true' ko hata diya kyunki hum LocalStorage + Header use kar rahe hain
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('focusflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('focusflow_token');
      localStorage.removeItem('focusflow_user');
      
      // Agar app window reload maarti hai logout par, toh user auto-redirect ho jayega
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);