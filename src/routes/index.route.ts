/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
import { Router } from 'express';
const router = Router();

// Parent Routes
router.use('/admins', require('./admins.route')); // All the user routes
router.use('/users', require('./users.route')); // All the user routes
router.use('/auth', require('./auth.route')); // All the auth routes

// Export
export default router;
