import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

// 🔥 FIXED: Agar Auth file sirf context hai, toh humne temporary yahan ek simple saaf login component bana diya taaki page crash na ho
function SimpleAuth() {
  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#0f172a', color: 'white', fontFamily: 'sans-serif', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '10px' }}>Welcome to FocusFlow</h2>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Please use the app controls or sign in.</p>
      {/* Agar tera purana login page kisi aur naam se hai, toh use yahan render kar sakte hain */}
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🔥 FIXED: Jugaad hata kar seedha component de diya */}
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