/**
 * User auth routes
 * @author Yousuf Kalim
 */
import { Router } from 'express';
import { login, confirmAuth, changePassword, forgot } from 'controllers/auth';
import checkAuth from 'middleware/checkAuth';
import { validateLogin, isValidated, changePasswordValidate } from 'middleware/validators';
const router = Router();

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user login
 * @method get check auth
 * @method put change password
 * @method post forgot email
 */

// Read
router.post('/login', validateLogin, isValidated, login); // Get all users at once
router.get('/', checkAuth, confirmAuth);
router.put('/password/:userId', checkAuth, changePasswordValidate, isValidated, changePassword); // Change password route
router.put('/forgot/:email', forgot);

// Export
module.exports = router;
