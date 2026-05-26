import { Outlet } from 'react-router-dom';
import MobileNav from './MobileNav.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppShell() {
  return (
    <main className="min-h-screen overflow-hidden bg-frost text-slate-950 dark:bg-[#09090F] dark:text-white">
      <div className="fixed inset-0 bg-light-grid bg-[length:40px_40px] opacity-60 dark:bg-focus-grid dark:opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(88,166,255,.22),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(66,211,146,.18),transparent_24%),linear-gradient(135deg,rgba(255,122,89,.10),transparent_34%)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(88,166,255,.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,.22),transparent_24%),linear-gradient(135deg,rgba(255,122,89,.12),transparent_34%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <div className="mx-auto w-full max-w-7xl flex-1 px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-8">
            <Outlet />
          </div>
        </section>
      </div>
      <MobileNav />
    </main>
  );
}
