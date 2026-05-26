import { Router } from 'express';
import { listAchievements } from '../controllers/achievement.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const achievementRouter = Router();

achievementRouter.use(requireAuth);
achievementRouter.get('/', asyncHandler(listAchievements));
