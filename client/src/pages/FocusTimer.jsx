import { Pause, Play, RotateCcw, Timer } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';

const modes = [
  { key: 'pomodoro', label: 'Pomodoro', minutes: 25 },
  { key: 'deep_work', label: 'Deep Work', minutes: 50 },
  { key: 'quick_sprint', label: 'Sprint', minutes: 10 }
];

export default function FocusTimer() {
  const [mode, setMode] = useState(modes[0]);
  const [seconds, setSeconds] = useState(mode.minutes * 60);
  const [running, setRunning] = useState(false);
  const total = mode.minutes * 60;
  const progress = useMemo(() => Math.round(((total - seconds) / total) * 100), [seconds, total]);

  useEffect(() => {
    if (!running) return undefined;
    const interval = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          clearInterval(interval);
          setRunning(false);
          toast.success(`Focus session complete. +${Math.round(mode.minutes / 2)} XP`);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, mode.minutes]);

  function choose(nextMode) {
    setMode(nextMode);
    setSeconds(nextMode.minutes * 60);
    setRunning(false);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-mint">Focus Timer</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Drop into deliberate work.</h1>
      </div>
      <Card className="mx-auto max-w-3xl overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(66,211,146,.16),transparent_35%)]" />
        <div className="relative">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-mint/15 text-mint">
            <Timer size={26} />
          </div>
          <div className="mb-6 flex justify-center gap-2 overflow-x-auto no-scrollbar">
            {modes.map((item) => (
              <button
                key={item.key}
                onClick={() => choose(item)}
                className={`rounded-2xl px-4 py-3 text-sm font-extrabold transition ${mode.key === item.key ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'border border-slate-900/10 bg-white/60 text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mx-auto w-fit">
            <ProgressRing value={progress} size={250} stroke={16} label={`${mm}:${ss}`} sublabel={mode.label} />
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => setRunning((value) => !value)}>
              {running ? <Pause size={18} /> : <Play size={18} />}
              {running ? 'Pause' : 'Start'}
            </Button>
            <Button variant="secondary" onClick={() => setSeconds(total)}>
              <RotateCcw size={18} />
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </PageTransition>
  );
}
