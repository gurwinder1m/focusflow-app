import { Check, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';

const palette = ['#8B5CF6', '#06B6D4', '#42D392', '#FF7A59', '#F59E0B'];

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    try {
      const res = await api.get('/habits');

      setHabits(res.data.habits || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load habits');
    }
  }

  async function addHabit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await api.post('/habits', {
        title,
        frequency: 'daily',
        xpReward: 20,
        color: palette[habits.length % palette.length]
      });

      setHabits((prev) => [res.data.habit, ...prev]);

      setTitle('');

      toast.success('Habit created');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create habit');
    }
  }

  async function completeHabit(id) {
    try {
      const res = await api.post(`/habits/${id}/complete`);

      setHabits((prev) =>
        prev.map((habit) =>
          habit._id === id ? res.data.habit : habit
        )
      );

      toast.success('Habit completed');
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || 'Already completed today'
      );
    }
  }

  async function deleteHabit(id) {
    try {
      await api.delete(`/habits/${id}`);

      setHabits((prev) =>
        prev.filter((habit) => habit._id !== id)
      );

      toast.success('Habit deleted');
    } catch (error) {
      console.error(error);
      toast.error('Delete failed');
    }
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyber">
            Habit Tracker
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            Build systems that pull you forward.
          </h1>
        </div>

        <form onSubmit={addHabit} className="flex gap-2">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New habit"
            className="min-w-0"
          />

          <Button type="submit" className="shrink-0">
            <Plus size={18} />
            Add
          </Button>
        </form>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {habits.map((habit, index) => {
          const monthly = Math.min(
            100,
            Math.round(((habit.completions?.length || 0) / 30) * 100)
          );

          return (
            <Card
              key={habit._id}
              delay={index * 0.04}
              className="relative overflow-hidden"
            >
              <div
                className="absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl"
                style={{
                  backgroundColor: `${habit.color || '#8B5CF6'}33`
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div
                    className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white"
                    style={{
                      backgroundColor:
                        habit.color || '#8B5CF6'
                    }}
                  >
                    <Sparkles size={20} />
                  </div>

                  <p className="text-xl font-extrabold tracking-tight">
                    {habit.title}
                  </p>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {habit.frequency} · +{habit.xpReward} XP
                  </p>
                </div>

                <ProgressRing
                  value={monthly}
                  size={92}
                  stroke={8}
                  label={`${habit.streak?.current || 0}d`}
                  sublabel="streak"
                />
              </div>

              <div className="relative mt-6 rounded-2xl border border-slate-900/10 bg-white/60 p-3 dark:border-white/10 dark:bg-white/[0.05]">
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Best streak
                  </p>

                  <p className="text-lg font-extrabold">
                    {habit.streak?.longest || 0} days
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => completeHabit(habit._id)}
                    className="flex-1"
                  >
                    <Check size={17} />
                    Done
                  </Button>

                  <Button
                    onClick={() => deleteHabit(habit._id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 size={17} />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageTransition>
  );
}