import { cn } from '../../lib/utils.js';

export default function Input({ label, className, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">{label}</span>}
      <input
        className={cn(
          'w-full rounded-2xl border border-slate-900/10 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyber focus:ring-4 focus:ring-cyber/15 dark:border-white/10 dark:bg-white/[0.06] dark:text-white',
          className
        )}
        {...props}
      />
    </label>
  );
}
