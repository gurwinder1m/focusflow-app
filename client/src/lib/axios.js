import axios from 'axios';

const api = axios.create({
  // Tera live Render backend URL jo chal raha hai
  baseURL: 'https://focusflow-backend-21t9.onrender.com/api', 
});

// 🔥 SURE-SHOT FIX: Yeh interceptor har request ke sath token bhejege
api.interceptors.request.use(
  (config) => {
    // LocalStorage se token check karo (apne token key ka naam check kar lena)
    const token = localStorage.getItem('token'); 
    
    if (token) {
      // Backend ko 'Bearer <token>' format mein authorization header milega
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;