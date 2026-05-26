import { CheckCircle2, Plus, Target } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import { demoGoals } from '../lib/demoData.js';

export default function Goals() {
  const [goals, setGoals] = useState(demoGoals);
  const [title, setTitle] = useState('');

  function addGoal(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setGoals((items) => [{ _id: crypto.randomUUID(), title, category: 'Personal', progress: 0, tasks: [] }, ...items]);
    setTitle('');
    toast.success('Goal created. Break it into milestones next.');
  }

  function toggleTask(goalId, taskIndex) {
    setGoals((items) =>
      items.map((goal) => {
        if (goal._id !== goalId) return goal;
        const tasks = goal.tasks.map((task, index) => (index === taskIndex ? { ...task, completed: !task.completed } : task));
        const progress = tasks.length ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : goal.progress;
        return { ...goal, tasks, progress };
      })
    );
    toast.success('Goal progress updated.');
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-ember">Goals System</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Turn ambition into visible progress.</h1>
        </div>
        <form onSubmit={addGoal} className="flex flex-col gap-2 sm:flex-row">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="New goal" />
          <Button type="submit">
            <Plus size={18} />
            Add
          </Button>
        </form>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {goals.map((goal, index) => (
          <Card key={goal._id} delay={index * 0.05}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-ember/15 text-ember">
                  <Target size={22} />
                </div>
                <p className="text-2xl font-extrabold tracking-tight">{goal.title}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {goal.category} {goal.deadline ? `· Due ${new Date(goal.deadline).toLocaleDateString()}` : ''}
                </p>
              </div>
              <ProgressRing value={goal.progress} size={108} stroke={9} />
            </div>
            <div className="mt-6 space-y-3">
              {goal.tasks.map((task, taskIndex) => (
                <button
                  key={task._id || task.title}
                  onClick={() => toggleTask(goal._id, taskIndex)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-slate-900/10 bg-white/60 p-3 text-left transition hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:bg-white/10"
                >
                  <CheckCircle2 className={task.completed ? 'text-mint' : 'text-slate-400'} size={19} />
                  <span className={`font-bold ${task.completed ? 'text-slate-400 line-through' : ''}`}>{task.title}</span>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
}
