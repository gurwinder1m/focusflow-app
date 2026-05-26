import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../ui/Card.jsx';

export function WeeklyProductivityChart({ data }) {
  return (
    <Card className="min-h-[340px]">
      <div className="mb-5">
        <p className="text-lg font-extrabold tracking-tight">Weekly Productivity</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Score, XP, and execution velocity</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="score" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.42} />
                <stop offset="95%" stopColor="#58A6FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.22)" />
            <XAxis dataKey="day" stroke="currentColor" className="text-xs text-slate-400" />
            <YAxis stroke="currentColor" className="text-xs text-slate-400" />
            <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(148,163,184,.22)', background: 'rgba(15,23,42,.92)', color: 'white' }} />
            <Area type="monotone" dataKey="score" stroke="#58A6FF" strokeWidth={3} fill="url(#score)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function DisciplineRadar({ data }) {
  return (
    <Card className="min-h-[340px]">
      <div className="mb-5">
        <p className="text-lg font-extrabold tracking-tight">Discipline Profile</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Balanced execution across life systems</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(148,163,184,.28)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 700 }} />
            <Radar dataKey="value" stroke="#42D392" fill="#42D392" fillOpacity={0.28} strokeWidth={3} />
            <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(148,163,184,.22)', background: 'rgba(15,23,42,.92)', color: 'white' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
