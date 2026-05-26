import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { FocusSession } from '../models/FocusSession.js';
import { User } from '../models/User.js';
import { buildDashboard } from '../services/analytics.service.js';
import { awardXp } from '../services/gamification.service.js';

export async function dashboard(req, res) {
  const data = await buildDashboard(req.user._id);
  res.json({ dashboard: data });
}

export async function analytics(req, res) {
  const snapshots = await AnalyticsSnapshot.find({ user: req.user._id }).sort({ date: 1 }).limit(180);
  res.json({ snapshots });
}

export async function leaderboard(_req, res) {
  const users = await User.find()
    .select('name avatarUrl gamification.xp gamification.level gamification.rank gamification.currentStreak')
    .sort({ 'gamification.xp': -1 })
    .limit(20);
  res.json({ users });
}

export async function createFocusSession(req, res) {
  const minutes = Number(req.body.minutes || 25);
  const mode = req.body.mode || 'pomodoro';
  const xp = Math.max(5, Math.round(minutes / 2));

  const session = await FocusSession.create({
    user: req.user._id,
    minutes,
    mode,
    completed: true,
    xpEarned: xp,
    startedAt: req.body.startedAt || new Date(Date.now() - minutes * 60 * 1000),
    endedAt: req.body.endedAt || new Date()
  });

  const reward = await awardXp(req.user, xp, 'focus_session');
  res.status(201).json({ session, reward });
}
