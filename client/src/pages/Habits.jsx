import { Check, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import { demoHabits } from '../lib/demoData.js';

const palette = ['#8B5CF6', '#06B6D4', '#42D392', '#FF7A59', '#F59E0B'];

export default function Habits() {
  const [habits, setHabits] = useState(demoHabits);
  const [title, setTitle] = useState('');

  function addHabit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setHabits((items) => [
      {
        _id: crypto.randomUUID(),
        title,
        icon: 'sparkles',
        color: palette[items.length % palette.length],
        frequency: 'daily',
        xpReward: 20,
        streak: { current: 0, longest: 0 },
        completions: []
      },
      ...items
    ]);
    setTitle('');
    toast.success('+20 XP habit loop created');
  }

  function completeHabit(id) {
    setHabits((items) =>
      items.map((habit) =>
        habit._id === id
          ? { ...habit, streak: { ...habit.streak, current: habit.streak.current + 1, longest: Math.max(habit.streak.longest, habit.streak.current + 1) } }
          : habit
      )
    );
    toast.success('Habit completed. Streak protected.');
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyber">Habit Tracker</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Build systems that pull you forward.</h1>
        </div>
        <form onSubmit={addHabit} className="flex gap-2">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="New habit" className="min-w-0" />
          <Button type="submit" className="shrink-0">
            <Plus size={18} />
            Add
          </Button>
        </form>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {habits.map((habit, index) => {
          const monthly = Math.min(100, Math.round((habit.completions.length / 30) * 100));
          return (
            <Card key={habit._id} delay={index * 0.04} className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl" style={{ backgroundColor: `${habit.color}33` }} />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundColor: habit.color }}>
                    <Sparkles size={20} />
                  </div>
                  <p className="text-xl font-extrabold tracking-tight">{habit.title}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{habit.frequency} · +{habit.xpReward} XP</p>
                </div>
                <ProgressRing value={monthly} size={92} stroke={8} label={`${habit.streak.current}d`} sublabel="streak" />
              </div>
              <div className="relative mt-6 flex items-center justify-between rounded-2xl border border-slate-900/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/[0.05]">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Best streak</p>
                  <p className="text-lg font-extrabold">{habit.streak.longest} days</p>
                </div>
                <Button onClick={() => completeHabit(habit._id)}>
                  <Check size={17} />
                  Done
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </PageTransition>
  );
}
<button onClick={() => deleteHabit(habit._id)}>
  Delete
</button>
const deleteHabit = async (id) => {
  await axios.delete(`/api/habits/${id}`);
  setHabits(prev => prev.filter(h => h._id !== id));
};