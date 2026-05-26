import { BarChart3, Brain, CalendarCheck, CheckSquare, Flame, Gauge, Settings, Target, Trophy, Timer } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils.js';

const nav = [
  { to: '/', label: 'Dashboard', icon: Gauge },
  { to: '/habits', label: 'Habits', icon: CalendarCheck },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/goals', label: 'Goals', icon: Target },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/focus', label: 'Focus', icon: Timer },
  { to: '/leaderboard', label: 'Ranks', icon: Trophy },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-900/10 bg-white/60 p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] lg:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-white shadow-glow dark:bg-white dark:text-slate-950">
          <Brain size={22} />
        </div>
        <div>
          <p className="text-lg font-extrabold tracking-tight">FocusFlow</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Life OS</p>
        </div>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition',
                isActive
                  ? 'bg-slate-950 text-white shadow-soft dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
              )
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-slate-900/10 bg-slate-950 p-4 text-white shadow-soft dark:border-white/10 dark:bg-white/10">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold">
          <Flame className="text-ember" size={18} />
          Mission Pulse
        </div>
        <p className="text-sm text-white/72">Complete two more core actions to keep your streak shield active.</p>
      </div>
    </aside>
  );
}
