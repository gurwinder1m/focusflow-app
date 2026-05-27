import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(userId) {
  return jwt.sign(
    { 
      sub: userId, // Purana backup
      id: userId   // 🔥 Naya standard backup (Taki middleware crash na ho)
    }, 
    env.jwtSecret, 
    { expiresIn: env.jwtExpiresIn || '7d' }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}