import { z } from 'zod';
import { Goal } from '../models/Goal.js';
import { ApiError } from '../utils/ApiError.js';
import { awardXp } from '../services/gamification.service.js';

export const goalSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(140),
    description: z.string().max(1000).optional(),
    category: z.string().optional(),
    deadline: z.string().datetime().optional(),
    status: z.enum(['active', 'paused', 'completed']).optional(),
    xpReward: z.number().min(1).max(1000).optional(),
    tasks: z.array(z.object({ title: z.string(), completed: z.boolean().optional() })).optional()
  })
});

export async function listGoals(req, res) {
  const goals = await Goal.find({ user: req.user._id }).sort({ deadline: 1 });
  res.json({ goals });
}

export async function createGoal(req, res) {
  const goal = new Goal({ ...req.body, user: req.user._id });
  goal.recalculateProgress();
  await goal.save();
  res.status(201).json({ goal });
}

export async function updateGoal(req, res) {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  if (!goal) throw new ApiError(404, 'Goal not found.');

  Object.assign(goal, req.body);
  goal.recalculateProgress();
  await goal.save();
  res.json({ goal });
}

export async function toggleGoalTask(req, res) {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
  if (!goal) throw new ApiError(404, 'Goal not found.');

  const task = goal.tasks.id(req.params.taskId);
  if (!task) throw new ApiError(404, 'Goal task not found.');

  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date() : undefined;
  const before = goal.progress;
  goal.recalculateProgress();
  await goal.save();

  let reward = null;
  if (before < 100 && goal.progress === 100) {
    reward = await awardXp(req.user, goal.xpReward, 'goal_completed');
  }

  res.json({ goal, reward });
}

export async function deleteGoal(req, res) {
  const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!goal) throw new ApiError(404, 'Goal not found.');
  res.status(204).send();
}
