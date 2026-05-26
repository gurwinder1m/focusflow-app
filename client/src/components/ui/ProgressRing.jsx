import { motion } from 'framer-motion';

export default function ProgressRing({ value = 0, size = 116, stroke = 10, label, sublabel }) {
  const radius = (size - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, value) / 100) * circumference;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={stroke} fill="transparent" className="text-slate-900/10 dark:text-white/10" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#58A6FF" />
            <stop offset="55%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#42D392" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-extrabold tracking-tight">{label ?? `${value}%`}</p>
        {sublabel && <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{sublabel}</p>}
      </div>
    </div>
  );
}
