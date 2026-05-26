import { BarChart3, CalendarCheck, Flame, Gauge, Target, Trophy } from 'lucide-react';
import HabitHeatmap from '../components/dashboard/HabitHeatmap.jsx';
import { DisciplineRadar, WeeklyProductivityChart } from '../components/dashboard/Charts.jsx';
import XpPanel from '../components/dashboard/XpPanel.jsx';
import Card from '../components/ui/Card.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import { useDashboard } from '../hooks/useDashboard.js';

export default function Dashboard() {
  const { data } = useDashboard();
  const stats = data?.stats || {};

  return (
    <PageTransition>
      <div className="space-y-6">
        <XpPanel />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Gauge} label="Productivity Score" value={`${stats.productivityScore || 0}`} helper="Weighted from today, week, focus" tone="cyber" />
          <StatCard icon={CalendarCheck} label="Daily Progress" value={`${stats.dailyProgress || 0}%`} helper="Core habits completed" tone="mint" delay={0.04} />
          <StatCard icon={Flame} label="Weekly Flow" value={`${stats.weeklyProgress || 0}%`} helper="7-day consistency pulse" tone="ember" delay={0.08} />
          <StatCard icon={Target} label="Monthly Consistency" value={`${stats.monthlyConsistency || 0}%`} helper="Active days this month" tone="violet" delay={0.12} />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <WeeklyProductivityChart data={data?.weeklyChart || []} />
          <DisciplineRadar data={data?.radar || []} />
        </div>
        <HabitHeatmap data={data?.heatmap || []} />
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-lg font-extrabold tracking-tight">Today’s Priority Stack</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tasks and goals that move the score</p>
              </div>
              <BarChart3 className="text-cyber" />
            </div>
            <div className="space-y-3">
              {(data?.tasks || []).slice(0, 4).map((task) => (
                <div key={task._id} className="flex flex-col gap-3 rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-extrabold">{task.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{task.category} · {task.priority}</p>
                  </div>
                  <span className="w-fit rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">{task.status?.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <Trophy className="text-ember" />
              <div>
                <p className="text-lg font-extrabold tracking-tight">Latest Badges</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Unlocks and milestones</p>
              </div>
            </div>
            <div className="space-y-3">
              {(data?.achievements || []).slice(0, 4).map((item, index) => {
                const achievement = item.achievement || item;
                return (
                  <div key={achievement._id || index} className="rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.05]">
                    <p className="font-extrabold">{achievement.title}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
