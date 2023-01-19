/**
 * User auth routes
 * @author Yousuf Kalim
 */
import { Router } from 'express';
import { login, confirmAuth, changePassword, forgot } from 'controllers/auth.controller';
import { checkUserAuth } from 'middleware/auth.middleware';
import {
  validateLogin,
  isValidated,
  changePasswordValidate,
} from 'middleware/validations.middleware';
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
router.get('/', checkUserAuth, confirmAuth);
router.put('/password/:userId', checkUserAuth, changePasswordValidate, isValidated, changePassword); // Change password route
router.put('/forgot/:email', forgot);

// Export
module.exports = router;
