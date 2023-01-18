/**
 * Check auth middleware
 * @author Yousuf Kalim
 */
import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import IRequest from 'interfaces/request';
import { JWT_SECRET } from 'config';

// Check auth
export default function checkAdminAuth(
  req: IRequest,
  res: Response,
  next: NextFunction,
): Response | void {
  // Get token from Header
  const header = req.get('Authorization');

  // Check if not token
  if (!header?.startsWith('Bearer')) {
    return res.status(403).json({
      success: false,
      message: 'No token found, Authorization denied',
    });
  }

  try {
    // Decrypting token
    const token = header.split(' ')[1];
    const { user } = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this resource',
      });
    }

    req.user = user;
    req.token = token;

    // If user authenticated
    res.set(
      'cache-control',
      'no-cache, no-store, private, must-revalidate, post-check=0, pre-check=0',
    );

    // Done
    next();
  } catch (err) {
    // If not
    res.status(403).json({ success: false, message: 'Your session has been expired' });
  }
}
