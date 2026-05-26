import dayjs from 'dayjs';
import { Achievement } from '../models/Achievement.js';
import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { Habit } from '../models/Habit.js';
import { Goal } from '../models/Goal.js';
import { Task } from '../models/Task.js';
import { UserAchievement } from '../models/UserAchievement.js';

const ranks = [
  { level: 1, title: 'Initiate' },
  { level: 5, title: 'Momentum Builder' },
  { level: 10, title: 'Flow Architect' },
  { level: 20, title: 'Discipline Elite' },
  { level: 35, title: 'Legendary Operator' }
];

export function levelFromXp(xp) {
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1);
}

export function rankFromLevel(level) {
  return ranks.reduce((rank, current) => (level >= current.level ? current.title : rank), 'Initiate');
}

export async function awardXp(user, amount, reason = 'activity') {
  user.gamification.xp += amount;
  user.gamification.level = levelFromXp(user.gamification.xp);
  user.gamification.rank = rankFromLevel(user.gamification.level);
  await user.save();

  const date = dayjs().format('YYYY-MM-DD');
  await AnalyticsSnapshot.findOneAndUpdate(
    { user: user._id, date },
    {
      $inc: { xpEarned: amount },
      $setOnInsert: { productivityScore: 0 }
    },
    { upsert: true, new: true }
  );

  const unlocked = await evaluateAchievements(user);
  return { xp: user.gamification.xp, level: user.gamification.level, rank: user.gamification.rank, reason, unlocked };
}

export async function evaluateAchievements(user) {
  const achievements = await Achievement.find();
  const unlocked = await UserAchievement.find({ user: user._id }).select('achievement');
  const unlockedIds = new Set(unlocked.map((item) => String(item.achievement)));
  const stats = await getAchievementStats(user._id, user);
  const newUnlocks = [];

  for (const achievement of achievements) {
    if (unlockedIds.has(String(achievement._id))) continue;
    if (stats[achievement.criteria] >= achievement.threshold) {
      await UserAchievement.create({ user: user._id, achievement: achievement._id });
      newUnlocks.push(achievement);
    }
  }

  return newUnlocks;
}

async function getAchievementStats(userId, user) {
  const [habitCompletions, tasksCompleted, goalsCompleted] = await Promise.all([
    Habit.aggregate([
      { $match: { user: userId } },
      { $project: { count: { $size: '$completions' } } },
      { $group: { _id: null, total: { $sum: '$count' } } }
    ]),
    Task.countDocuments({ user: userId, status: 'completed' }),
    Goal.countDocuments({ user: userId, status: 'completed' })
  ]);

  return {
    xp: user.gamification.xp,
    streak: user.gamification.longestStreak,
    habits_completed: habitCompletions[0]?.total || 0,
    tasks_completed: tasksCompleted,
    goals_completed: goalsCompleted
  };
}
