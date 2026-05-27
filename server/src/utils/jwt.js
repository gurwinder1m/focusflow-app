import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Generates a standard secure JSON Web Token
 * @param {string} userId - The MongoDB User ID
 * @returns {string} JWT Token
 */
export function signToken(userId) {
  // 🔥 SURE-SHOT FIX: Payload mein 'id' aur 'sub' dono daal diye hain.
  // Tera middleware ab dono mein se kisi ko bhi check karega toh user authorized ho jayega!
  return jwt.sign(
    { 
      id: userId, 
      sub: userId 
    }, 
    env.jwtSecret || 'development-only-change-me', 
    {
      expiresIn: env.jwtExpiresIn || '7d' // Fallback to 7 days if env is missing
    }
  );
}

/**
 * Verifies a JSON Web Token
 * @param {string} token - The JWT from request headers
 * @returns {object} Decoded payload data
 */
export function verifyToken(token) {
  return jwt.verify(token, env.env.jwtSecret || 'development-only-change-me');
}