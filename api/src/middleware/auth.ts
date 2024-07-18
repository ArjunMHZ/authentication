// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any; // Customize 'user' type based on your User model
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const access_Token: any = process.env.ACCESS_TOKEN_SECRET;


    if (!token) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decoded = jwt.verify(token, access_Token) as { userId: string };
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Invalid access token' });
    }
};
