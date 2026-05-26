import { cn } from '../../lib/utils.js';

const variants = {
  primary: 'bg-slate-950 text-white shadow-soft hover:-translate-y-0.5 hover:shadow-glow dark:bg-white dark:text-slate-950',
  secondary:
    'border border-slate-900/10 bg-white/70 text-slate-700 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
  ghost: 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10',
  danger: 'bg-ember text-white hover:-translate-y-0.5'
};

export default function Button({ children, className, variant = 'primary', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
