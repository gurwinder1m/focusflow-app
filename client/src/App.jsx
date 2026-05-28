import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Analytics from './pages/Analytics.jsx';
import Auth from './pages/Auth.jsx'; // ✅ Asli Auth page import karo
import Dashboard from './pages/Dashboard.jsx';
import FocusTimer from './pages/FocusTimer.jsx';
import Goals from './pages/Goals.jsx';
import Habits from './pages/Habits.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Settings from './pages/Settings.jsx';
import Tasks from './pages/Tasks.jsx';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ✅ Auth page — PUBLIC route, protected nahi */}
        <Route path="/auth" element={<Auth />} />

        {/* ✅ Protected routes */}
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