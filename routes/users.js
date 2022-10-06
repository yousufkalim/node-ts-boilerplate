/**
 * User CRUD routes
 * @author Yousuf Kalim
 */
const router = require('express').Router();
const users = require('../controllers/users');
const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/multer');
const { validateUser, validateUserUpdate, isValidated } = require('../middleware/validators');

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user signup
 * @method get get all users
 * @method get get user by id
 * @method put update user
 * @method delete delete user
 */

// Create - User Signup
router.post('/', upload.single('image'), validateUser, isValidated, users.create);

// Read
router.get('/', checkAuth, users.getAll); // Get all users at once
router.get('/:userId', checkAuth, users.getById); // Get one user by it's id

// Update
router.put('/:userId', checkAuth, validateUserUpdate, isValidated, users.update); // Update a specific user by it's id

// Delete
router.delete('/:userId', checkAuth, users.delete); // delete a specific user by it's id

// Export
module.exports = router;
