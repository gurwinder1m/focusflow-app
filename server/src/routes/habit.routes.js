import { Router } from 'express';
import {
  archiveHabit,
  completeHabit,
  createHabit,
  habitSchema,
  listHabits,
  updateHabit
} from '../controllers/habit.controller.js';

import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { deleteHabit } from '../controllers/habit.controller.js';

export const habitRouter = Router();

habitRouter.use(requireAuth);

// 🔥 GET all habits
habitRouter.get('/', asyncHandler(listHabits));

// 🔥 CREATE habit
habitRouter.post('/', validate(habitSchema), asyncHandler(createHabit));

// 🔥 UPDATE habit
habitRouter.patch('/:id', asyncHandler(updateHabit));

// 🔥 ARCHIVE habit (soft delete)
habitRouter.delete('/archive/:id', asyncHandler(archiveHabit));

// 🔥 HARD DELETE habit (NEW FIX)
habitRouter.delete('/:id', asyncHandler(deleteHabit));

// 🔥 COMPLETE habit
habitRouter.post('/:id/complete', asyncHandler(completeHabit));