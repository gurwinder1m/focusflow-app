import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';

export async function protect(req, res, next) {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token');
    }

    // Token verify karo
    const decoded = verifyToken(token);
    
    // 🔥 SURE-SHOT: id aur sub dono check karo
    const userId = decoded.id || decoded.sub;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
}