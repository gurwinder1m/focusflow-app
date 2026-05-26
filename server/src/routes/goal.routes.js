import { Router } from 'express';
import {
  createGoal,
  deleteGoal,
  goalSchema,
  listGoals,
  toggleGoalTask,
  updateGoal
} from '../controllers/goal.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const goalRouter = Router();

goalRouter.use(requireAuth);
goalRouter.get('/', asyncHandler(listGoals));
goalRouter.post('/', validate(goalSchema), asyncHandler(createGoal));
goalRouter.patch('/:id', asyncHandler(updateGoal));
goalRouter.patch('/:id/tasks/:taskId/toggle', asyncHandler(toggleGoalTask));
goalRouter.delete('/:id', asyncHandler(deleteGoal));
