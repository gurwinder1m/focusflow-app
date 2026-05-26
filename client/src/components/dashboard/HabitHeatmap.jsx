import Card from '../ui/Card.jsx';

const colors = [
  'bg-slate-900/5 dark:bg-white/10',
  'bg-mint/25',
  'bg-mint/45',
  'bg-cyber/60',
  'bg-violet/80'
];

export default function HabitHeatmap({ data = [] }) {
  return (
    <Card className="overflow-hidden">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-lg font-extrabold tracking-tight">Consistency Heatmap</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last 12 weeks of habit and task execution</p>
        </div>
        <div className="hidden items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 sm:flex">
          Low <span className="h-3 w-3 rounded bg-slate-900/10 dark:bg-white/10" /> <span className="h-3 w-3 rounded bg-mint/45" /> <span className="h-3 w-3 rounded bg-violet/80" /> High
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2 no-scrollbar">
        {data.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.count} completions`}
            className={`h-4 w-4 shrink-0 rounded ${colors[day.intensity] || colors[0]}`}
          />
        ))}
      </div>
    </Card>
  );
}
