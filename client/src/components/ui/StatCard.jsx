import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Card from './Card.jsx';

export default function StatCard({ icon: Icon, label, value, helper, tone = 'cyber', delay }) {
  const tones = {
    cyber: 'from-cyber/25 to-cyber/5 text-cyber',
    mint: 'from-mint/25 to-mint/5 text-mint',
    ember: 'from-ember/25 to-ember/5 text-ember',
    violet: 'from-violet/25 to-violet/5 text-violet'
  };

  return (
    <Card delay={delay} className="relative overflow-hidden">
      <div className={`absolute right-0 top-0 h-28 w-28 rounded-full bg-gradient-to-br blur-2xl ${tones[tone]}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-3xl font-extrabold tracking-tight"
          >
            {value}
          </motion.p>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">{helper}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
          <Icon size={21} />
        </div>
      </div>
      <div className="relative mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-mint">
        <ArrowUpRight size={14} />
        Live
      </div>
    </Card>
  );
}
