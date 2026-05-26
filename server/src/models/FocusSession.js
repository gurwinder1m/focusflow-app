import mongoose from 'mongoose';

const focusSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    mode: {
      type: String,
      enum: ['pomodoro', 'deep_work', 'quick_sprint'],
      default: 'pomodoro'
    },
    minutes: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      default: true
    },
    xpEarned: {
      type: Number,
      default: 0
    },
    startedAt: Date,
    endedAt: Date
  },
  { timestamps: true }
);

export const FocusSession = mongoose.model('FocusSession', focusSessionSchema);
