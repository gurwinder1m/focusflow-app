import axios from 'axios';

// 🔥 FIXED: Isko normal const banaya aur neeche default export kar diya
const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api'
});

api.interceptors.request.use(
  (config) => {
    // SURE-SHOT: Dono mein se koi bhi token ho, utha lo
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar login page ke bahar 401 aaye tabhi logout maaro
    if (error.response?.status === 401 && window.location.pathname !== '/auth') {
      localStorage.removeItem('focusflow_token');
      localStorage.removeItem('token');
      localStorage.removeItem('focusflow_user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api; // 🔥 MASTER FIX: Ab default export hai, poori app mein kahi bhi import api chalega!