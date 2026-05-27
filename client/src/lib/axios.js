import axios from 'axios';

const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('focusflow-token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;