/**
 * All the validation
 * @author Yousuf Kalim
 */
const { check, validationResult } = require('express-validator');

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateUser = [
  check('name', 'Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('number', 'Number is required.').notEmpty().isNumeric().trim(),
  check('gender').trim(),
  check('role').trim(),
  check('address').trim(),
  check('city').trim(),
  check('country').trim(),
];

// User Signup Validation
exports.validateUserUpdate = [
  check('name', 'Name is required.').notEmpty().trim(),
  check('email', 'Email is required.').notEmpty().isEmail().trim(),
  check('number', 'Number is required.').notEmpty().isNumeric().trim(),
  check('gender').trim(),
  check('role').trim(),
  check('address').trim(),
  check('city').trim(),
  check('country').trim(),
];

// Login validation
exports.validateLogin = [
  check('email', 'Email is required').notEmpty().isEmail().trim().toLowerCase(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
];

// Change password validation
exports.changePasswordValidate = [
  check('oldPassword', 'Old Password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('newPassword', 'New password is required.').notEmpty().trim().isLength({ min: 8 }),
  check('confirmPassword', 'Confirm password is required.').notEmpty().trim().isLength({ min: 8 }),
];

/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
