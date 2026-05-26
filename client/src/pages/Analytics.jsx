import HabitHeatmap from '../components/dashboard/HabitHeatmap.jsx';
import { DisciplineRadar, WeeklyProductivityChart } from '../components/dashboard/Charts.jsx';
import Card from '../components/ui/Card.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import { useDashboard } from '../hooks/useDashboard.js';

export default function Analytics() {
  const { data } = useDashboard();
  const stats = data?.stats || {};

  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyber">Analytics</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">A clear signal on your operating system.</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <Card className="flex flex-col items-center justify-center gap-5">
          <ProgressRing value={stats.productivityScore || 0} size={190} stroke={14} label={stats.productivityScore || 0} sublabel="score" />
          <div className="grid w-full grid-cols-3 gap-3 text-center">
            <Mini label="Daily" value={`${stats.dailyProgress || 0}%`} />
            <Mini label="Weekly" value={`${stats.weeklyProgress || 0}%`} />
            <Mini label="Monthly" value={`${stats.monthlyConsistency || 0}%`} />
          </div>
        </Card>
        <WeeklyProductivityChart data={data?.weeklyChart || []} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <HabitHeatmap data={data?.heatmap || []} />
        <DisciplineRadar data={data?.radar || []} />
      </div>
    </PageTransition>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.05]">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-extrabold">{value}</p>
    </div>
  );
}
