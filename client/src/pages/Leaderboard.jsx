import { Trophy } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import { demoLeaderboard } from '../lib/demoData.js';
import { initials } from '../lib/utils.js';

export default function Leaderboard() {
  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ember">Leaderboard</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Healthy competition, visible momentum.</h1>
      </div>
      <Card>
        <div className="space-y-3">
          {demoLeaderboard.map((user, index) => (
            <div key={user._id} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.05]">
              <div className="flex min-w-0 items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-950 text-sm font-extrabold text-white dark:bg-white dark:text-slate-950">
                  {index === 0 ? <Trophy size={20} className="text-ember" /> : index + 1}
                </div>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-12 w-12 rounded-2xl object-cover" />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyber/15 font-extrabold text-cyber">{initials(user.name)}</div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-extrabold">{user.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.gamification.rank} · {user.gamification.currentStreak}d streak</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-extrabold">{user.gamification.xp}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">XP</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageTransition>
  );
}
