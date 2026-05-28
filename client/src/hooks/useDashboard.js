import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios.js'; // 🔥 FIXED: Sahi file 'axios.js' kar di aur curly braces '{}' hata diye
import { demoDashboard } from '../lib/demoData.js';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const token = localStorage.getItem('focusflow_token');
      if (!token || token === 'demo-token') return demoDashboard;
      const { data } = await api.get('/analytics/dashboard');
      return data.dashboard;
    },
    placeholderData: demoDashboard
  });
}