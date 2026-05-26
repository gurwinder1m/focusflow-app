import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'sparkles'
    },
    xpReward: {
      type: Number,
      default: 50
    },
    criteria: {
      type: String,
      enum: ['xp', 'streak', 'habits_completed', 'tasks_completed', 'goals_completed'],
      required: true
    },
    threshold: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const Achievement = mongoose.model('Achievement', achievementSchema);
