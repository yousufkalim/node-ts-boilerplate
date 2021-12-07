/**
 * User auth routes
 * @author Yousuf Kalim
 */
const router = require("express").Router();
const auth = require("../controllers/auth");
const {
  validateLogin,
  isValidated,
  changePasswordValidate,
} = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user login
 */

// Read
router.post("/login", validateLogin, isValidated, auth.login); // Get all users at once
router.put(
  "/password/:userId",
  changePasswordValidate,
  isValidated,
  auth.changePassword
); // Change password route
router.put("/forgot/:email", auth.forgot);

// Export
module.exports = router;
