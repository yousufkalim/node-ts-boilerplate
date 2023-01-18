/**
 * All the validation
 * @author Yousuf Kalim
 */
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
export const validateUser = [
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
export const validateUserUpdate = [
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
export const validateLogin = [
  check('email', 'Email is required').notEmpty().isEmail().trim().toLowerCase(),
  check('password', 'Password is required.').notEmpty().trim().isLength({ min: 8 }),
];

// Change password validation
export const changePasswordValidate = [
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
export const isValidated = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    return res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
