import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'; // Fixed: Added curly braces for Named Export
import { env } from '../config/env.js';

export async function requireAuth(req, res, next) {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, env.jwtSecret || process.env.JWT_SECRET);

        // Find user by ID
        const user = await User.findById(decoded.id || decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("JWT Auth Error:", error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
}