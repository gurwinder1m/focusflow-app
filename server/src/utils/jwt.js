import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(userId) {
  return jwt.sign(
    { 
      id: userId, 
      sub: userId 
    }, 
    env.jwtSecret || 'development-only-change-me', 
    {
      expiresIn: env.jwtExpiresIn || '7d'
    }
  );
}

export function verifyToken(token) {
  // 🔥 FIXED: Pehle yahan env.env.jwtSecret ho gaya tha, use sahi kar diya hai
  return jwt.verify(token, env.jwtSecret || 'development-only-change-me');
}