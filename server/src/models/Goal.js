import mongoose from 'mongoose';

const goalTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  },
  { timestamps: true }
);

const goalSchema = new mongoose.Schema(
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
      maxlength: 140
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: 'Personal'
    },
    deadline: Date,
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active'
    },
    progress: {
      type: Number,
      default: 0
    },
    xpReward: {
      type: Number,
      default: 120
    },
    tasks: {
      type: [goalTaskSchema],
      default: []
    }
  },
  { timestamps: true }
);

goalSchema.methods.recalculateProgress = function recalculateProgress() {
  if (!this.tasks.length) {
    this.progress = this.status === 'completed' ? 100 : 0;
    return this.progress;
  }

  const completed = this.tasks.filter((task) => task.completed).length;
  this.progress = Math.round((completed / this.tasks.length) * 100);
  if (this.progress === 100) this.status = 'completed';
  return this.progress;
};

export const Goal = mongoose.model('Goal', goalSchema);
