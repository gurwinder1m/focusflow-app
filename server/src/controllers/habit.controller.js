import dayjs from 'dayjs';
import { z } from 'zod';
import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { Habit } from '../models/Habit.js';
import { ApiError } from '../utils/ApiError.js';
import { awardXp } from '../services/gamification.service.js';

export const habitSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120),
    description: z.string().max(500).optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    frequency: z.enum(['daily', 'weekdays', 'weekends', 'weekly', 'custom']).optional(),
    customDays: z.array(z.number().min(0).max(6)).optional(),
    xpReward: z.number().min(1).max(500).optional()
  })
});

export async function listHabits(req, res) {
  const habits = await Habit.find({ user: req.user._id, archived: false }).sort({ createdAt: -1 });
  res.json({ habits });
}

export async function createHabit(req, res) {
  const habit = await Habit.create({ ...req.body, user: req.user._id });
  res.status(201).json({ habit });
}

export async function updateHabit(req, res) {
  const habit = await Habit.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, {
    new: true,
    runValidators: true
  });
  if (!habit) throw new ApiError(404, 'Habit not found.');
  res.json({ habit });
}

export async function archiveHabit(req, res) {
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { archived: true },
    { new: true }
  );
  if (!habit) throw new ApiError(404, 'Habit not found.');
  res.json({ habit });
}

export async function completeHabit(req, res) {
  const date = req.body.date || dayjs().format('YYYY-MM-DD');
  const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
  if (!habit) throw new ApiError(404, 'Habit not found.');

  if (habit.completions.some((entry) => entry.date === date)) {
    throw new ApiError(409, 'Habit already completed for this date.');
  }

  const yesterday = dayjs(date).subtract(1, 'day');
  const lastCompleted = habit.streak.lastCompletedAt ? dayjs(habit.streak.lastCompletedAt) : null;
  const continues = lastCompleted && lastCompleted.isSame(yesterday, 'day');
  const streakBonus = continues && (habit.streak.current + 1) % 7 === 0 ? 30 : 0;
  const xpEarned = habit.xpReward + streakBonus;

  habit.completions.push({ date, xpEarned, note: req.body.note || '' });
  habit.streak.current = continues ? habit.streak.current + 1 : 1;
  habit.streak.longest = Math.max(habit.streak.longest, habit.streak.current);
  habit.streak.lastCompletedAt = dayjs(date).toDate();
  await habit.save();

  req.user.gamification.currentStreak = Math.max(req.user.gamification.currentStreak, habit.streak.current);
  req.user.gamification.longestStreak = Math.max(req.user.gamification.longestStreak, habit.streak.longest);
  await req.user.save();

  await AnalyticsSnapshot.findOneAndUpdate(
    { user: req.user._id, date },
    {
      $inc: { habitsCompleted: 1 },
      $set: { productivityScore: Math.min(100, 20 + habit.streak.current * 4) }
    },
    { upsert: true }
  );

  const reward = await awardXp(req.user, xpEarned, 'habit_completed');
  res.json({ habit, reward });
}
