import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(userId) {
  // Safe default agar env na mile
  const secret = env.jwtSecret || 'super-secret-key-123';
  return jwt.sign(
    { 
      id: userId, 
      sub: userId 
    }, 
    secret, 
    {
      expiresIn: env.jwtExpiresIn || '7d'
    }
  );
}

export function verifyToken(token) {
  // 🔥 SURE-SHOT FIX: env.env.jwtSecret ko hatakar ekdum sahi key check lagaya hai
  const secret = env.jwtSecret || 'super-secret-key-123';
  return jwt.verify(token, secret);
}