import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
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
      maxlength: 160
    },
    notes: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'Core'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    status: {
      type: String,
      enum: ['backlog', 'today', 'in_progress', 'completed'],
      default: 'today'
    },
    dueAt: Date,
    order: {
      type: Number,
      default: 0
    },
    xpReward: {
      type: Number,
      default: 15
    },
    completedAt: Date,
    subtasks: {
      type: [subtaskSchema],
      default: []
    }
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, status: 1, order: 1 });

export const Task = mongoose.model('Task', taskSchema);
