import { z } from 'zod';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { signToken } from '../utils/jwt.js';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    password: z.string().min(8).max(120)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

export async function register(req, res) {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) throw new ApiError(409, 'An account already exists for this email.');

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  await user.setPassword(req.body.password);
  await user.save();

  res.status(201).json({
    user: user.toSafeJSON(),
    token: signToken(user._id)
  });
}

export async function login(req, res) {
  const user = await User.findOne({ email: req.body.email }).select('+passwordHash');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  res.json({
    user: user.toSafeJSON(),
    token: signToken(user._id)
  });
}

export async function me(req, res) {
  res.json({ user: req.user });
}

export async function updateProfile(req, res) {
  const allowed = ['name', 'avatarUrl', 'bio', 'timezone', 'preferences'];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });
  await req.user.save();
  res.json({ user: req.user });
}
