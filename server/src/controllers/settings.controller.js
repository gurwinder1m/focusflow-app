import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { FocusSession } from '../models/FocusSession.js';
import { Goal } from '../models/Goal.js';
import { Habit } from '../models/Habit.js';
import { Task } from '../models/Task.js';
import { UserAchievement } from '../models/UserAchievement.js';

export async function exportData(req, res) {
  const [habits, goals, tasks, analytics, focusSessions, achievements] = await Promise.all([
    Habit.find({ user: req.user._id }),
    Goal.find({ user: req.user._id }),
    Task.find({ user: req.user._id }),
    AnalyticsSnapshot.find({ user: req.user._id }),
    FocusSession.find({ user: req.user._id }),
    UserAchievement.find({ user: req.user._id }).populate('achievement')
  ]);

  res.json({
    exportedAt: new Date().toISOString(),
    user: req.user,
    habits,
    goals,
    tasks,
    analytics,
    focusSessions,
    achievements
  });
}

export async function resetProgress(req, res) {
  await Promise.all([
    Habit.updateMany({ user: req.user._id }, { $set: { completions: [], streak: { current: 0, longest: 0 } } }),
    Task.updateMany({ user: req.user._id }, { $set: { status: 'backlog', completedAt: null } }),
    Goal.updateMany({ user: req.user._id }, { $set: { status: 'active', progress: 0 } }),
    AnalyticsSnapshot.deleteMany({ user: req.user._id }),
    FocusSession.deleteMany({ user: req.user._id }),
    UserAchievement.deleteMany({ user: req.user._id })
  ]);

  req.user.gamification = {
    xp: 0,
    level: 1,
    rank: 'Initiate',
    disciplineScore: 0,
    longestStreak: 0,
    currentStreak: 0
  };
  await req.user.save();

  res.json({ message: 'Progress reset successfully.', user: req.user });
}
