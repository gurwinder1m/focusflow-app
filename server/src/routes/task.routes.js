import { Router } from 'express';
import {
  completeTask,
  createTask,
  deleteTask,
  listTasks,
  reorderTasks,
  taskSchema,
  updateTask
} from '../controllers/task.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const taskRouter = Router();

taskRouter.use(requireAuth);
taskRouter.get('/', asyncHandler(listTasks));
taskRouter.post('/', validate(taskSchema), asyncHandler(createTask));
taskRouter.patch('/reorder', asyncHandler(reorderTasks));
taskRouter.patch('/:id', asyncHandler(updateTask));
taskRouter.post('/:id/complete', asyncHandler(completeTask));
taskRouter.delete('/:id', asyncHandler(deleteTask));
