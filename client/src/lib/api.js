import axios from 'axios';

// 🔥 SURE-SHOT FIX: Kisi environment variable par depend mat raho. 
// Seedha apna asli live backend URL yahan hardcode kar do!
export const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api'
});

// Request Interceptor: Token ko har request ke sath bhejna
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('focusflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Agar sachi mein token expire ho tabhi logout karna
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar 401 Unauthorized aaye aur user login page par NA ho, tabhi clear karo
    if (error.response?.status === 401 && window.location.pathname !== '/auth') {
      localStorage.removeItem('focusflow_token');
      localStorage.removeItem('focusflow_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);