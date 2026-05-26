import { Router } from 'express';
import { analytics, createFocusSession, dashboard, leaderboard } from '../controllers/analytics.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const analyticsRouter = Router();

analyticsRouter.use(requireAuth);
analyticsRouter.get('/dashboard', asyncHandler(dashboard));
analyticsRouter.get('/history', asyncHandler(analytics));
analyticsRouter.get('/leaderboard', asyncHandler(leaderboard));
analyticsRouter.post('/focus-sessions', asyncHandler(createFocusSession));
