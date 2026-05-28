import axios from 'axios';

const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api'
});

// Request Interceptor: Token ko sahi format mein bhejna
api.interceptors.request.use(
  (config) => {
    // Dono mein se koi bhi token key local storage mein ho, use uthao
    const token = localStorage.getItem('focusflow_token') || localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    return Promise.reject(error);
  }
);

export default api;