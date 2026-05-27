import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { env } from '../config/env.js';

export async function requireAuth(req, res, next) {
  try {
    let token = null;

    // 🔥 Read Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 🔥 No token
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    // 🔥 Verify token
    const decoded = jwt.verify(
      token,
      env.jwtSecret
    );

    // 🔥 Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: 'Invalid token'
    });
  }
}