import mongoose from 'mongoose';

const analyticsSnapshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    date: {
      type: String,
      required: true
    },
    habitsCompleted: {
      type: Number,
      default: 0
    },
    tasksCompleted: {
      type: Number,
      default: 0
    },
    goalsCompleted: {
      type: Number,
      default: 0
    },
    xpEarned: {
      type: Number,
      default: 0
    },
    focusMinutes: {
      type: Number,
      default: 0
    },
    productivityScore: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

analyticsSnapshotSchema.index({ user: 1, date: 1 }, { unique: true });

export const AnalyticsSnapshot = mongoose.model('AnalyticsSnapshot', analyticsSnapshotSchema);
