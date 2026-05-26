import { Router } from 'express';
import { exportData, resetProgress } from '../controllers/settings.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const settingsRouter = Router();

settingsRouter.use(requireAuth);
settingsRouter.get('/export', asyncHandler(exportData));
settingsRouter.post('/reset-progress', asyncHandler(resetProgress));
