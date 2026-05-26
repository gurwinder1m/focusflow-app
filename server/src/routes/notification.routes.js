import { Router } from 'express';
import {
  createNotification,
  listNotifications,
  markNotificationRead
} from '../controllers/notification.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const notificationRouter = Router();

notificationRouter.use(requireAuth);
notificationRouter.get('/', asyncHandler(listNotifications));
notificationRouter.post('/', asyncHandler(createNotification));
notificationRouter.patch('/:id/read', asyncHandler(markNotificationRead));
