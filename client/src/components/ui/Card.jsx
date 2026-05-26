import { motion } from 'framer-motion';
import { cn } from '../../lib/utils.js';

export default function Card({ children, className, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn('glass-panel rounded-[28px] p-5 text-slate-950 dark:text-white', className)}
    >
      {children}
    </motion.section>
  );
}
