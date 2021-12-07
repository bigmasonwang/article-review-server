import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwtService';

/**
 * Middleware to verify JWT in request header
 */
const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(401).json({ error: 'Please provide token.' });
  }

  const decoded = jwtVerify(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token, permission denied.' });
  }
  req.userId = decoded.id;
  next();
};

export default authGuard;
