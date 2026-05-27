import { Router } from 'express';

import {
  archiveHabit,
  completeHabit,
  createHabit,
  deleteHabit,
  habitSchema,
  listHabits,
  updateHabit
} from '../controllers/habit.controller.js';

import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const habitRouter = Router();

habitRouter.use(requireAuth);

habitRouter.get('/', asyncHandler(listHabits));

habitRouter.post(
  '/',
  validate(habitSchema),
  asyncHandler(createHabit)
);

habitRouter.patch('/:id', asyncHandler(updateHabit));

habitRouter.delete('/archive/:id', asyncHandler(archiveHabit));

habitRouter.delete('/:id', asyncHandler(deleteHabit));

habitRouter.post('/:id/complete', asyncHandler(completeHabit));