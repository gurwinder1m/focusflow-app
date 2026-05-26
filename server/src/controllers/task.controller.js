import dayjs from 'dayjs';
import { z } from 'zod';
import { AnalyticsSnapshot } from '../models/AnalyticsSnapshot.js';
import { Task } from '../models/Task.js';
import { ApiError } from '../utils/ApiError.js';
import { awardXp } from '../services/gamification.service.js';

export const taskSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(160),
    notes: z.string().max(1000).optional(),
    category: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    status: z.enum(['backlog', 'today', 'in_progress', 'completed']).optional(),
    dueAt: z.string().datetime().optional(),
    order: z.number().optional(),
    xpReward: z.number().min(1).max(500).optional(),
    subtasks: z.array(z.object({ title: z.string(), completed: z.boolean().optional() })).optional()
  })
});

export async function listTasks(req, res) {
  const tasks = await Task.find({ user: req.user._id }).sort({ order: 1, dueAt: 1 });
  res.json({ tasks });
}

export async function createTask(req, res) {
  const task = await Task.create({ ...req.body, user: req.user._id });
  res.status(201).json({ task });
}

export async function updateTask(req, res) {
  const updates = { ...req.body };
  if (updates.status === 'completed') updates.completedAt = new Date();
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, updates, {
    new: true,
    runValidators: true
  });
  if (!task) throw new ApiError(404, 'Task not found.');
  res.json({ task });
}

export async function completeTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) throw new ApiError(404, 'Task not found.');
  if (task.status === 'completed') throw new ApiError(409, 'Task already completed.');

  task.status = 'completed';
  task.completedAt = new Date();
  await task.save();

  const date = dayjs().format('YYYY-MM-DD');
  await AnalyticsSnapshot.findOneAndUpdate(
    { user: req.user._id, date },
    { $inc: { tasksCompleted: 1 }, $set: { productivityScore: 70 } },
    { upsert: true }
  );

  const reward = await awardXp(req.user, task.xpReward, 'task_completed');
  res.json({ task, reward });
}

export async function reorderTasks(req, res) {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) throw new ApiError(422, 'orderedIds must be an array.');

  await Promise.all(
    orderedIds.map((id, index) =>
      Task.updateOne({ _id: id, user: req.user._id }, { $set: { order: index } })
    )
  );

  const tasks = await Task.find({ user: req.user._id }).sort({ order: 1 });
  res.json({ tasks });
}

export async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) throw new ApiError(404, 'Task not found.');
  res.status(204).send();
}
