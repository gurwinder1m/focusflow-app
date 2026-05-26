import { Notification } from '../models/Notification.js';

export async function listNotifications(req, res) {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ notifications });
}

export async function createNotification(req, res) {
  const notification = await Notification.create({ ...req.body, user: req.user._id });
  res.status(201).json({ notification });
}

export async function markNotificationRead(req, res) {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { readAt: new Date() },
    { new: true }
  );
  res.json({ notification });
}
