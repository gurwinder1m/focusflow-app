import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      throw new ApiError(401, 'Authentication required.');
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.sub).select('-passwordHash');

    if (!user) {
      throw new ApiError(401, 'User no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(401, 'Invalid or expired token.'));
  }
}
