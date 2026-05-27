import axios from 'axios';

const api = axios.create({
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api',
  withCredentials: true
});

export default api;