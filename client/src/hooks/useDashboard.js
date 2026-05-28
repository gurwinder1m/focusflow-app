import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';
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
sed -i '' "s|../lib/api.js|../lib/axios.js|g" client/src/hooks/useDashboard.js 2>/dev/null || sed -i "s|../lib/api.js|../lib/axios.js|g" client/src/hooks/useDashboard.js