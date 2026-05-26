import { Achievement } from '../models/Achievement.js';
import { UserAchievement } from '../models/UserAchievement.js';

export async function listAchievements(req, res) {
  const [achievements, unlocked] = await Promise.all([
    Achievement.find().sort({ threshold: 1 }),
    UserAchievement.find({ user: req.user._id }).populate('achievement')
  ]);

  const unlockedIds = new Set(unlocked.map((item) => String(item.achievement?._id)));
  res.json({
    achievements: achievements.map((achievement) => ({
      ...achievement.toObject(),
      unlocked: unlockedIds.has(String(achievement._id)),
      unlockedAt: unlocked.find((item) => String(item.achievement?._id) === String(achievement._id))?.unlockedAt
    }))
  });
}
