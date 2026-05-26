import { Download, RotateCcw, Save } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import PageTransition from '../components/ui/PageTransition.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Settings() {
  const { user, setUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({ name: user?.name || '', avatarUrl: user?.avatarUrl || '', bio: user?.bio || '' });

  function save() {
    setUser({ ...user, ...profile, preferences: { ...user.preferences, theme } });
    localStorage.setItem('focusflow_user', JSON.stringify({ ...user, ...profile, preferences: { ...user.preferences, theme } }));
    toast.success('Profile settings saved.');
  }

  function exportData() {
    const payload = { user, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'focusflow-export.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageTransition>
      <div className="mb-6">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-violet">Settings</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Tune your operating environment.</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_.75fr]">
        <Card>
          <div className="mb-5">
            <p className="text-lg font-extrabold tracking-tight">Profile</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Identity, avatar, and theme preferences</p>
          </div>
          <div className="space-y-4">
            <Input label="Name" value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
            <Input label="Avatar URL" value={profile.avatarUrl} onChange={(event) => setProfile({ ...profile, avatarUrl: event.target.value })} />
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Theme</span>
              <select
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
                className="w-full rounded-2xl border border-slate-900/10 bg-white/75 px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-white/[0.06]"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </label>
            <Button onClick={save}>
              <Save size={18} />
              Save settings
            </Button>
          </div>
        </Card>
        <Card>
          <div className="mb-5">
            <p className="text-lg font-extrabold tracking-tight">Data Controls</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Export, reset, and future cloud sync controls</p>
          </div>
          <div className="space-y-3">
            <Button variant="secondary" className="w-full justify-start" onClick={exportData}>
              <Download size={18} />
              Export data
            </Button>
            <Button
              variant="danger"
              className="w-full justify-start"
              onClick={() => toast('Reset is connected to the API in production mode.')}
            >
              <RotateCcw size={18} />
              Reset progress
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
