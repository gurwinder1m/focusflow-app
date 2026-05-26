import dayjs from 'dayjs';
import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { FocusSession } from '../models/FocusSession.js';
import { Goal } from '../models/Goal.js';
import { Habit } from '../models/Habit.js';
import { Task } from '../models/Task.js';
import { UserAchievement } from '../models/UserAchievement.js';

export async function buildDashboard(userId) {
  const today = dayjs().format('YYYY-MM-DD');
  const startOfWeek = dayjs().startOf('week');
  const startOfMonth = dayjs().startOf('month');

  const [habits, tasks, goals, focusSessions, snapshots, achievements] = await Promise.all([
    Habit.find({ user: userId, archived: false }).sort({ createdAt: -1 }),
    Task.find({ user: userId }).sort({ order: 1, dueAt: 1 }),
    Goal.find({ user: userId }).sort({ deadline: 1 }),
    FocusSession.find({ user: userId, createdAt: { $gte: startOfWeek.toDate() } }),
    AnalyticsSnapshot.find({
      user: userId,
      date: {
        $gte: startOfMonth.format('YYYY-MM-DD')
      }
    }).sort({ date: 1 }),
    UserAchievement.find({ user: userId }).populate('achievement').sort({ unlockedAt: -1 })
  ]);

  const todayHabits = habits.filter((habit) => habit.completions.some((entry) => entry.date === today));
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const activeGoals = goals.filter((goal) => goal.status !== 'completed');
  const monthlyDays = Math.max(1, dayjs().date());
  const consistency = Math.min(100, Math.round((snapshots.filter((item) => item.productivityScore > 0).length / monthlyDays) * 100));
  const completionPercentage = Math.round(((todayHabits.length + completedTasks.length) / Math.max(1, habits.length + tasks.length)) * 100);
  const productivityScore = Math.min(
    100,
    Math.round(completionPercentage * 0.48 + consistency * 0.32 + Math.min(20, focusSessions.length * 4))
  );

  return {
    stats: {
      dailyProgress: Math.round((todayHabits.length / Math.max(1, habits.length)) * 100),
      weeklyProgress: weekProgress(snapshots, startOfWeek),
      monthlyConsistency: consistency,
      completionPercentage,
      productivityScore,
      focusMinutes: focusSessions.reduce((total, session) => total + session.minutes, 0)
    },
    habits,
    tasks,
    goals: activeGoals,
    achievements,
    heatmap: buildHeatmap(habits),
    weeklyChart: buildWeeklyChart(snapshots),
    radar: buildRadar({ habits, tasks, goals, snapshots, focusSessions }),
    recentActivity: buildRecentActivity({ habits, tasks, goals, achievements })
  };
}

function weekProgress(snapshots, startOfWeek) {
  const week = snapshots.filter((item) => dayjs(item.date).isAfter(startOfWeek.subtract(1, 'day')));
  if (!week.length) return 0;
  return Math.round(week.reduce((total, item) => total + item.productivityScore, 0) / week.length);
}

function buildHeatmap(habits) {
  const start = dayjs().subtract(83, 'day');
  return Array.from({ length: 84 }).map((_, index) => {
    const date = start.add(index, 'day').format('YYYY-MM-DD');
    const count = habits.reduce((total, habit) => total + (habit.completions.some((entry) => entry.date === date) ? 1 : 0), 0);
    return { date, count, intensity: Math.min(4, count) };
  });
}

function buildWeeklyChart(snapshots) {
  const start = dayjs().subtract(6, 'day');
  return Array.from({ length: 7 }).map((_, index) => {
    const date = start.add(index, 'day');
    const snapshot = snapshots.find((item) => item.date === date.format('YYYY-MM-DD'));
    return {
      day: date.format('ddd'),
      score: snapshot?.productivityScore || 0,
      xp: snapshot?.xpEarned || 0,
      habits: snapshot?.habitsCompleted || 0,
      tasks: snapshot?.tasksCompleted || 0
    };
  });
}

function buildRadar({ habits, tasks, goals, snapshots, focusSessions }) {
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const averageGoalProgress = goals.length ? goals.reduce((total, goal) => total + goal.progress, 0) / goals.length : 0;

  return [
    { metric: 'Habits', value: Math.min(100, habits.reduce((total, habit) => total + habit.streak.current, 0) * 8) },
    { metric: 'Tasks', value: Math.round((completedTasks / Math.max(1, tasks.length)) * 100) },
    { metric: 'Goals', value: Math.round(averageGoalProgress) },
    { metric: 'Focus', value: Math.min(100, focusSessions.reduce((total, item) => total + item.minutes, 0) / 4) },
    { metric: 'Consistency', value: Math.min(100, snapshots.length * 8) }
  ];
}

function buildRecentActivity({ habits, tasks, goals, achievements }) {
  const habitActivity = habits.flatMap((habit) =>
    habit.completions.slice(-2).map((entry) => ({
      type: 'habit',
      title: `Completed ${habit.title}`,
      timestamp: entry.date
    }))
  );
  const taskActivity = tasks
    .filter((task) => task.completedAt)
    .slice(0, 3)
    .map((task) => ({ type: 'task', title: `Finished ${task.title}`, timestamp: task.completedAt }));
  const goalActivity = goals
    .filter((goal) => goal.status === 'completed')
    .slice(0, 2)
    .map((goal) => ({ type: 'goal', title: `Reached ${goal.title}`, timestamp: goal.updatedAt }));
  const achievementActivity = achievements.slice(0, 3).map((item) => ({
    type: 'achievement',
    title: `Unlocked ${item.achievement?.title || 'achievement'}`,
    timestamp: item.unlockedAt
  }));

  return [...habitActivity, ...taskActivity, ...goalActivity, ...achievementActivity]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 8);
}
