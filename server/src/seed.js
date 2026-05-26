import dayjs from 'dayjs';
import { connectDatabase } from './config/db.js';
import { Achievement } from './models/Achievement.js';
import { AnalyticsSnapshot } from './models/AnalyticsSnapshot.js';
import { Goal } from './models/Goal.js';
import { Habit } from './models/Habit.js';
import { Notification } from './models/Notification.js';
import { Task } from './models/Task.js';
import { User } from './models/User.js';

await connectDatabase();

const achievements = [
  {
    key: 'first-flow',
    title: 'First Flow',
    description: 'Complete your first meaningful action.',
    icon: 'sparkles',
    criteria: 'xp',
    threshold: 20,
    xpReward: 25
  },
  {
    key: 'seven-day-streak',
    title: 'Seven Day Signal',
    description: 'Reach a 7-day streak.',
    icon: 'flame',
    criteria: 'streak',
    threshold: 7,
    xpReward: 80
  },
  {
    key: 'task-closer',
    title: 'Task Closer',
    description: 'Complete 25 tasks.',
    icon: 'check-circle',
    criteria: 'tasks_completed',
    threshold: 25,
    xpReward: 120
  },
  {
    key: 'habit-architect',
    title: 'Habit Architect',
    description: 'Log 50 habit completions.',
    icon: 'calendar-check',
    criteria: 'habits_completed',
    threshold: 50,
    xpReward: 150
  },
  {
    key: 'north-star',
    title: 'North Star',
    description: 'Finish a major goal.',
    icon: 'trophy',
    criteria: 'goals_completed',
    threshold: 1,
    xpReward: 200
  }
];

await Achievement.deleteMany({});
await Achievement.insertMany(achievements);

let user = await User.findOne({ email: 'demo@focusflow.app' }).select('+passwordHash');
if (!user) {
  user = new User({
    name: 'Maya Chen',
    email: 'demo@focusflow.app',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces',
    gamification: {
      xp: 2840,
      level: 6,
      rank: 'Momentum Builder',
      disciplineScore: 86,
      currentStreak: 12,
      longestStreak: 21
    }
  });
  await user.setPassword('FocusFlow123!');
  await user.save();
}

await Promise.all([
  Habit.deleteMany({ user: user._id }),
  Goal.deleteMany({ user: user._id }),
  Task.deleteMany({ user: user._id }),
  AnalyticsSnapshot.deleteMany({ user: user._id }),
  Notification.deleteMany({ user: user._id })
]);

const days = Array.from({ length: 35 }).map((_, index) => dayjs().subtract(34 - index, 'day'));

await Habit.insertMany([
  {
    user: user._id,
    title: 'Deep Work Block',
    description: '90 minutes of focused creation before messages.',
    icon: 'brain',
    color: '#7C3AED',
    xpReward: 35,
    streak: { current: 12, longest: 18, lastCompletedAt: new Date() },
    completions: days.filter((_, index) => index % 5 !== 0).map((date) => ({ date: date.format('YYYY-MM-DD'), xpEarned: 35 }))
  },
  {
    user: user._id,
    title: 'Gym Session',
    description: 'Strength training or zone-two cardio.',
    icon: 'dumbbell',
    color: '#06B6D4',
    xpReward: 25,
    streak: { current: 4, longest: 9, lastCompletedAt: new Date() },
    completions: days.filter((_, index) => index % 2 === 0).map((date) => ({ date: date.format('YYYY-MM-DD'), xpEarned: 25 }))
  },
  {
    user: user._id,
    title: 'Wake Up Early',
    description: 'Out of bed before 6:30 AM.',
    icon: 'sunrise',
    color: '#F59E0B',
    xpReward: 20,
    streak: { current: 8, longest: 21, lastCompletedAt: new Date() },
    completions: days.filter((_, index) => index % 4 !== 1).map((date) => ({ date: date.format('YYYY-MM-DD'), xpEarned: 20 }))
  }
]);

await Task.insertMany([
  {
    user: user._id,
    title: 'Finalize Q2 operating plan',
    category: 'Work',
    priority: 'critical',
    status: 'in_progress',
    dueAt: dayjs().add(1, 'day').toDate(),
    order: 0,
    subtasks: [{ title: 'Revenue model' }, { title: 'Hiring plan', completed: true }, { title: 'Board narrative' }]
  },
  {
    user: user._id,
    title: 'Record product walkthrough',
    category: 'Launch',
    priority: 'high',
    status: 'today',
    dueAt: dayjs().add(2, 'day').toDate(),
    order: 1
  },
  {
    user: user._id,
    title: 'Weekly review and reset',
    category: 'Personal',
    priority: 'medium',
    status: 'today',
    dueAt: dayjs().add(3, 'day').toDate(),
    order: 2
  }
]);

await Goal.insertMany([
  {
    user: user._id,
    title: 'Ship FocusFlow private beta',
    category: 'Product',
    deadline: dayjs().add(28, 'day').toDate(),
    progress: 66,
    tasks: [
      { title: 'Design gamification loop', completed: true },
      { title: 'Build analytics dashboard', completed: true },
      { title: 'Invite 50 beta users' }
    ]
  },
  {
    user: user._id,
    title: 'Run a 10K under 52 minutes',
    category: 'Health',
    deadline: dayjs().add(50, 'day').toDate(),
    progress: 40,
    tasks: [{ title: 'Base mileage' }, { title: 'Tempo sessions', completed: true }, { title: 'Race day' }]
  }
]);

await AnalyticsSnapshot.insertMany(
  days.map((date, index) => ({
    user: user._id,
    date: date.format('YYYY-MM-DD'),
    habitsCompleted: index % 5 === 0 ? 1 : 3,
    tasksCompleted: index % 3 === 0 ? 2 : 1,
    xpEarned: 30 + (index % 4) * 15,
    focusMinutes: 45 + (index % 5) * 20,
    productivityScore: 55 + (index % 6) * 7
  }))
);

await Notification.insertMany([
  {
    user: user._id,
    type: 'streak',
    title: 'Streak window closing',
    message: 'Two core habits are still open. Protect the chain before the day ends.',
    scheduledFor: dayjs().hour(20).minute(0).toDate()
  },
  {
    user: user._id,
    type: 'motivation',
    title: 'Momentum compounder',
    message: 'One focused hour today keeps the weekly score above elite range.'
  }
]);

console.log('Seed complete. Demo login: demo@focusflow.app / FocusFlow123!');
process.exit(0);
