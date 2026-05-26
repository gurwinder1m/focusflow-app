import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ['streak', 'task', 'motivation', 'achievement'],
      default: 'motivation'
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    scheduledFor: Date,
    readAt: Date
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);
