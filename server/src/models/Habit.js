import mongoose from 'mongoose';

const completionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },
    xpEarned: {
      type: Number,
      default: 0
    },
    note: {
      type: String,
      default: ''
    }
  },
  { _id: false }
);

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'target'
    },
    color: {
      type: String,
      default: '#7C3AED'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekdays', 'weekends', 'weekly', 'custom'],
      default: 'daily'
    },
    customDays: {
      type: [Number],
      default: []
    },
    xpReward: {
      type: Number,
      default: 20
    },
    streak: {
      current: {
        type: Number,
        default: 0
      },
      longest: {
        type: Number,
        default: 0
      },
      lastCompletedAt: {
        type: Date
      }
    },
    completions: {
      type: [completionSchema],
      default: []
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

habitSchema.index({ user: 1, title: 1 });

export const Habit = mongoose.model('Habit', habitSchema);
