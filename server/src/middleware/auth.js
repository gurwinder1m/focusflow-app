import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

export async function requireAuth(req, res, next) {
  try {
    let token;
    
    // Check headers for Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    // Verify token safely
    const decoded = verifyToken(token);
    
    // Get user id from either id or sub
    const userId = decoded.id || decoded.sub;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized, invalid token payload' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token verification failed', error: error.message });
  }
}

// 🔥 BACKUP: Agar kisi file mein 'protect' naam se import kiya ho toh crash na ho
export { requireAuth as protect };export default Auth;