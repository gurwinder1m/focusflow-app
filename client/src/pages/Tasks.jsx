import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, CheckCircle2, GripVertical, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import { demoTasks } from '../lib/demoData.js';

const filters = ['all', 'today', 'in_progress', 'completed'];

export default function Tasks() {
  const [tasks, setTasks] = useState(demoTasks);
  const [filter, setFilter] = useState('all');
  const [title, setTitle] = useState('');
  const sensors = useSensors(useSensor(PointerSensor));
  const visible = useMemo(() => (filter === 'all' ? tasks : tasks.filter((task) => task.status === filter)), [filter, tasks]);

  function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((items) => [{ _id: crypto.randomUUID(), title, category: 'Core', priority: 'medium', status: 'today', subtasks: [] }, ...items]);
    setTitle('');
    toast.success('Task added to today.');
  }

  function onDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((items) => {
      const oldIndex = items.findIndex((task) => task._id === active.id);
      const newIndex = items.findIndex((task) => task._id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  function complete(id) {
    setTasks((items) => items.map((task) => (task._id === id ? { ...task, status: 'completed' } : task)));
    toast.success('+15 XP task closed');
  }

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-mint">Task Manager</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Plan, prioritize, execute.</h1>
        </div>
        <form onSubmit={addTask} className="flex flex-col gap-2 sm:flex-row">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add high-leverage task" />
          <Button type="submit">
            <Plus size={18} />
            Add
          </Button>
        </form>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-extrabold capitalize transition ${filter === item ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'border border-slate-900/10 bg-white/60 text-slate-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300'}`}
          >
            {item.replace('_', ' ')}
          </button>
        ))}
      </div>

      <Card>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={visible.map((task) => task._id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {visible.map((task) => (
                <TaskRow key={task._id} task={task} onComplete={complete} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </Card>
    </PageTransition>
  );
}

function TaskRow({ task, onComplete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-4 rounded-2xl border border-slate-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.05] md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <button className="mt-1 text-slate-400" {...attributes} {...listeners}>
          <GripVertical size={18} />
        </button>
        <div className="min-w-0">
          <p className="truncate font-extrabold">{task.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-slate-900/5 px-3 py-1 dark:bg-white/10">{task.priority}</span>
            <span className="rounded-full bg-slate-900/5 px-3 py-1 dark:bg-white/10">{task.category}</span>
            {task.dueAt && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-3 py-1 dark:bg-white/10">
                <Calendar size={13} />
                {new Date(task.dueAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      <Button variant={task.status === 'completed' ? 'secondary' : 'primary'} onClick={() => onComplete(task._id)} disabled={task.status === 'completed'}>
        <CheckCircle2 size={17} />
        {task.status === 'completed' ? 'Completed' : 'Complete'}
      </Button>
    </div>
  );
}
