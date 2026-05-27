import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    preferences: {
      theme: {
        type: String,
        enum: ['system', 'dark', 'light'],
        default: 'dark'
      },
      reminderHour: {
        type: Number,
        default: 20
      },
      notificationOptIn: {
        type: Boolean,
        default: true
      }
    },
    gamification: {
      xp: {
        type: Number,
        default: 0
      },
      level: {
        type: Number,
        default: 1
      },
      rank: {
        type: String,
        default: 'Initiate'
      },
      disciplineScore: {
        type: Number,
        default: 0
      },
      longestStreak: {
        type: Number,
        default: 0
      },
      currentStreak: {
        type: Number,
        default: 0
      }
    },
    resetTokenVersion: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function setPassword(password) {
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const user = this.toObject();
  delete user.passwordHash;
  delete user.resetTokenVersion;
  return user;
};

export const User = mongoose.model('User', userSchema);