import { Flame, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatNumber, xpForNextLevel } from '../../lib/utils.js';
import Card from '../ui/Card.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';

export default function XpPanel() {
  const { user } = useAuth();
  const xp = user?.gamification?.xp || 0;
  const level = user?.gamification?.level || 1;
  const next = xpForNextLevel(level);
  const progress = Math.min(100, Math.round((xp / next) * 100));

  return (
    <Card className="overflow-hidden bg-slate-950 text-white dark:bg-white/[0.06]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(88,166,255,.28),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(66,211,146,.18),transparent_26%)]" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-bold text-white/75">
            <Zap size={14} className="text-mint" />
            {user?.gamification?.rank}
          </div>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Level {level} flow state
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
            Keep your daily loops tight. Every completed habit, task, and focus session compounds into XP, streaks, badges, and discipline score.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex">
            <Metric icon={Zap} label="Total XP" value={formatNumber(xp)} />
            <Metric icon={Flame} label="Streak" value={`${user?.gamification?.currentStreak || 0}d`} />
            <Metric icon={Trophy} label="Best" value={`${user?.gamification?.longestStreak || 0}d`} />
          </div>
        </div>
        <div className="mx-auto shrink-0 sm:mx-0">
          <ProgressRing value={progress} label={`${progress}%`} sublabel="next level" size={148} stroke={12} />
        </div>
      </div>
    </Card>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/10 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-bold text-white/58">
        <Icon size={14} />
        {label}
      </div>
      <p className="mt-1 text-xl font-extrabold">{value}</p>
    </div>
  );
}
