import { BarChart3, CalendarCheck, Gauge, Target, Timer } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils.js';

const items = [
  { to: '/', icon: Gauge, label: 'Home' },
  { to: '/habits', icon: CalendarCheck, label: 'Habits' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/analytics', icon: BarChart3, label: 'Stats' },
  { to: '/focus', icon: Timer, label: 'Focus' }
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-5 rounded-3xl border border-white/18 bg-slate-950/82 p-2 text-white shadow-2xl backdrop-blur-2xl lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition',
              isActive ? 'bg-white text-slate-950' : 'text-white/65'
            )
          }
        >
          <item.icon size={18} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
