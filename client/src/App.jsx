import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Analytics from './pages/Analytics.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FocusTimer from './pages/FocusTimer.jsx';
import Goals from './pages/Goals.jsx';
import Habits from './pages/Habits.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Settings from './pages/Settings.jsx';
import Tasks from './pages/Tasks.jsx';

// 🔥 TERI SIR WALI PROBLEM KA SURE-SHOT ILAAL: Ek mast local Auth UI component
function SimpleAuth() {
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    // Demo token set karke seedha dashboard par bhej denge taaki loop toot jaye
    localStorage.setItem('focusflow_token', 'demo-token');
    localStorage.setItem('focusflow_user', JSON.stringify({ name: "Demo User" }));
    window.location.href = '/'; // Refresh karke main app mein entry
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0f172a', color: 'white', fontFamily: 'sans-serif', flexDirection: 'column', padding: '20px', textAlign: 'center' }}>
      <div style={{ background: '#1e293b', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ marginBottom: '10px', fontSize: '28px', fontWeight: 'bold', color: '#38bdf8' }}>FocusFlow</h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '14px' }}>Welcome! System is ready to load your Dashboard.</p>
        
        <button 
          onClick={handleDemoLogin}
          style={{ width: '100%', padding: '12px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseOver={(e) => e.target.style.background = '#7dd3fc'}
          onMouseOut={(e) => e.target.style.background = '#38bdf8'}
        >
          Let's Start / Enter Demo Mode 🚀
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🔥 REDIRECT LOOP BREAK: Ab jab bhi koi unauthenticated banda aayega, use ye screen dikhegi */}
        <Route path="/auth" element={<SimpleAuth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="goals" element={<Goals />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="focus" element={<FocusTimer />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}