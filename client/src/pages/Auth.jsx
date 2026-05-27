import { motion } from 'framer-motion';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: 'demo@focusflow.app',
    password: 'FocusFlow123!'
  });

  const { login, signup, enterDemo, loading } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    if (mode === 'login') {
      await login({ email: form.email, password: form.password });
    } else {
      await signup(form);
    }

    
    navigate('/');
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#09090F] text-white">
      <div className="fixed inset-0 bg-focus-grid bg-[length:44px_44px] opacity-25" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(88,166,255,.30),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(66,211,146,.22),transparent_24%),linear-gradient(135deg,rgba(255,122,89,.10),transparent_35%)]" />

      <section className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-5 py-10 lg:grid-cols-[1.05fr_.95fr] lg:px-8">

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-950">
              <Brain size={24} />
            </div>
            <div>
              <p className="text-xl font-extrabold tracking-tight">FocusFlow</p>
              <p className="text-sm text-white/52">Productivity gamified</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-bold text-white/72 backdrop-blur-xl">
            <Sparkles size={16} className="text-mint" />
            Life gamification for disciplined operators
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Turn daily discipline into a compounding game.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            Habits, goals, tasks, XP, streaks, analytics, achievements, focus sessions, and progress signals in one premium command center.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass-panel mx-auto w-full max-w-md rounded-[32px] p-6"
        >
          <div className="mb-6 flex rounded-2xl bg-white/8 p-1">
            {['login', 'signup'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold capitalize transition ${
                  mode === item ? 'bg-white text-slate-950' : 'text-white/58'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'signup' && (
              <Input
                label="Name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
              />
            )}

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />

            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </div>

          <Button type="submit" disabled={loading} className="mt-6 w-full">
            {mode === 'login' ? 'Enter FocusFlow' : 'Create command center'}
            <ArrowRight size={18} />
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="mt-3 w-full border-white/12 bg-white/10 text-white hover:bg-white/15"
            onClick={() => {
              enterDemo();
              setHabits([]);   // 🔥 important
              fetchHabits?.(); // safety call
              navigate('/');
            }}
          >
            Continue with demo data
          </Button>
        </motion.form>

      </section>
    </main>
  );
}