import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      onClick={toggleTheme}
      className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-900/10 bg-white/70 text-slate-600 transition hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
      aria-label="Toggle theme"
    >
      <Icon size={18} />
    </button>
  );
}
