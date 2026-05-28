import axios from 'axios';

// Ek single clean instance poorie app ke liye
export const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api'
});

// Request Interceptor: Taaza token uthakar header mein lagana
api.interceptors.request.use(
  (config) => {
    // 🔥 SURE-SHOT: Dono keys ka check laga diya taaki agar kahin se bhi save ho, token mil jaye!
    const token = localStorage.getItem('focusflow_token') || localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar sachi mein token invalid ho aur user auth page par na ho, tabhi hatao
    if (error.response?.status === 401 && window.location.pathname !== '/auth') {
      localStorage.removeItem('focusflow_token');
      localStorage.removeItem('token');
      localStorage.removeItem('focusflow_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);