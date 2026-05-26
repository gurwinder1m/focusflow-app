import { Bell, LogOut, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../lib/utils.js';
import ThemeToggle from '../ui/ThemeToggle.jsx';

export default function Topbar() {
  const { user, logout, isDemo } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-900/10 bg-white/55 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-[#09090F]/55 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/[0.06] md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search habits, goals, tasks, achievements..."
          />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 md:hidden">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="font-extrabold tracking-tight">FocusFlow</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Stay in flow</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDemo && (
            <span className="hidden rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1 text-xs font-bold text-cyber sm:inline-flex">
              Demo
            </span>
          )}
          <ThemeToggle />
          <button className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-900/10 bg-white/70 text-slate-600 transition hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white">
            <Bell size={18} />
          </button>
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/70 py-1.5 pl-1.5 pr-3 dark:border-white/10 dark:bg-white/[0.06] sm:flex">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-xl object-cover" />
            ) : (
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                {initials(user?.name)}
              </div>
            )}
            <div className="max-w-32 truncate">
              <p className="truncate text-sm font-bold">{user?.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.gamification?.rank}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-900/10 bg-white/70 text-slate-600 transition hover:text-ember dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
