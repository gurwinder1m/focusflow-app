import { addDays, format, subDays } from 'date-fns';

const today = new Date();

export const demoUser = {
  _id: 'demo-user',
  name: 'Maya Chen',
  email: 'demo@focusflow.app',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces',
  preferences: { theme: 'dark', notificationOptIn: true, reminderHour: 20 },
  gamification: {
    xp: 2840,
    level: 6,
    rank: 'Momentum Builder',
    disciplineScore: 86,
    currentStreak: 12,
    longestStreak: 21
  }
};

export const demoHabits = [
  {
    _id: 'habit-1',
    title: 'Deep Work Block',
    icon: 'brain',
    color: '#8B5CF6',
    frequency: 'daily',
    xpReward: 35,
    streak: { current: 12, longest: 18 },
    completions: buildCompletions(70, [1, 2, 3, 5, 6])
  },
  {
    _id: 'habit-2',
    title: 'Gym Session',
    icon: 'dumbbell',
    color: '#06B6D4',
    frequency: 'weekdays',
    xpReward: 25,
    streak: { current: 4, longest: 9 },
    completions: buildCompletions(70, [0, 2, 4])
  },
  {
    _id: 'habit-3',
    title: 'Wake Up Early',
    icon: 'sunrise',
    color: '#F59E0B',
    frequency: 'daily',
    xpReward: 20,
    streak: { current: 8, longest: 21 },
    completions: buildCompletions(70, [0, 1, 3, 4, 5, 6])
  },
  {
    _id: 'habit-4',
    title: 'Evening Review',
    icon: 'clipboard-check',
    color: '#42D392',
    frequency: 'daily',
    xpReward: 15,
    streak: { current: 6, longest: 16 },
    completions: buildCompletions(70, [1, 3, 4, 6])
  }
];

export const demoTasks = [
  {
    _id: 'task-1',
    title: 'Finalize Q2 operating plan',
    category: 'Work',
    priority: 'critical',
    status: 'in_progress',
    dueAt: addDays(today, 1).toISOString(),
    subtasks: [{ title: 'Revenue model', completed: true }, { title: 'Hiring plan', completed: true }, { title: 'Board narrative' }]
  },
  {
    _id: 'task-2',
    title: 'Record product walkthrough',
    category: 'Launch',
    priority: 'high',
    status: 'today',
    dueAt: addDays(today, 2).toISOString(),
    subtasks: []
  },
  {
    _id: 'task-3',
    title: 'Weekly review and reset',
    category: 'Personal',
    priority: 'medium',
    status: 'today',
    dueAt: addDays(today, 3).toISOString(),
    subtasks: []
  },
  {
    _id: 'task-4',
    title: 'Update investor metrics',
    category: 'Work',
    priority: 'medium',
    status: 'completed',
    dueAt: subDays(today, 1).toISOString(),
    subtasks: []
  }
];

export const demoGoals = [
  {
    _id: 'goal-1',
    title: 'Ship FocusFlow private beta',
    category: 'Product',
    deadline: addDays(today, 28).toISOString(),
    progress: 66,
    tasks: [
      { _id: 'g1t1', title: 'Design gamification loop', completed: true },
      { _id: 'g1t2', title: 'Build analytics dashboard', completed: true },
      { _id: 'g1t3', title: 'Invite 50 beta users', completed: false }
    ]
  },
  {
    _id: 'goal-2',
    title: 'Run a 10K under 52 minutes',
    category: 'Health',
    deadline: addDays(today, 50).toISOString(),
    progress: 40,
    tasks: [
      { _id: 'g2t1', title: 'Base mileage', completed: false },
      { _id: 'g2t2', title: 'Tempo sessions', completed: true },
      { _id: 'g2t3', title: 'Race day', completed: false }
    ]
  }
];

export const demoAchievements = [
  { _id: 'a1', title: 'First Flow', icon: 'sparkles', description: 'Complete your first action.', unlocked: true },
  { _id: 'a2', title: 'Seven Day Signal', icon: 'flame', description: 'Reach a 7-day streak.', unlocked: true },
  { _id: 'a3', title: 'Habit Architect', icon: 'calendar-check', description: 'Log 50 habit completions.', unlocked: false },
  { _id: 'a4', title: 'North Star', icon: 'trophy', description: 'Finish a major goal.', unlocked: false }
];

export const demoWeeklyChart = Array.from({ length: 7 }).map((_, index) => {
  const date = subDays(today, 6 - index);
  return {
    day: format(date, 'EEE'),
    score: 58 + ((index * 9) % 35),
    xp: 60 + index * 18,
    habits: 2 + (index % 3),
    tasks: 1 + (index % 4)
  };
});

export const demoHeatmap = Array.from({ length: 84 }).map((_, index) => {
  const date = subDays(today, 83 - index);
  const count = (index * 7) % 5;
  return {
    date: format(date, 'yyyy-MM-dd'),
    count,
    intensity: count
  };
});

export const demoRadar = [
  { metric: 'Habits', value: 88 },
  { metric: 'Tasks', value: 74 },
  { metric: 'Goals', value: 63 },
  { metric: 'Focus', value: 81 },
  { metric: 'Consistency', value: 79 }
];

export const demoDashboard = {
  stats: {
    dailyProgress: 76,
    weeklyProgress: 82,
    monthlyConsistency: 88,
    completionPercentage: 72,
    productivityScore: 86,
    focusMinutes: 315
  },
  habits: demoHabits,
  tasks: demoTasks,
  goals: demoGoals,
  achievements: demoAchievements.map((achievement) => ({ achievement, unlockedAt: new Date().toISOString() })),
  heatmap: demoHeatmap,
  weeklyChart: demoWeeklyChart,
  radar: demoRadar,
  recentActivity: [
    { type: 'habit', title: 'Completed Deep Work Block', timestamp: new Date().toISOString() },
    { type: 'task', title: 'Finished investor metrics', timestamp: subDays(today, 1).toISOString() },
    { type: 'achievement', title: 'Unlocked Seven Day Signal', timestamp: subDays(today, 2).toISOString() }
  ]
};

export const demoLeaderboard = [
  demoUser,
  { _id: 'u2', name: 'Ari Novak', avatarUrl: '', gamification: { xp: 2410, level: 5, rank: 'Flow Architect', currentStreak: 10 } },
  { _id: 'u3', name: 'Sam Rivera', avatarUrl: '', gamification: { xp: 1980, level: 4, rank: 'Momentum Builder', currentStreak: 7 } },
  { _id: 'u4', name: 'Noor Patel', avatarUrl: '', gamification: { xp: 1740, level: 4, rank: 'Momentum Builder', currentStreak: 5 } }
];

function buildCompletions(length, activeWeekDays) {
  return Array.from({ length })
    .map((_, index) => subDays(today, length - index - 1))
    .filter((date, index) => activeWeekDays.includes(date.getDay()) && index % 9 !== 0)
    .map((date) => ({ date: format(date, 'yyyy-MM-dd'), xpEarned: 20 }));
}
