/**
 * All api routes handles here
 * @author Yousuf Kalim
 */
import { Router } from 'express';
const router = Router();

// Parent Routes
router.use('/admins', require('./admins')); // All the user routes
router.use('/users', require('./users')); // All the user routes
router.use('/auth', require('./auth')); // All the auth routes

// Export
module.exports = router;
