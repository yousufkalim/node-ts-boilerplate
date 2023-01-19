/**
 * Admin controllers
 * @author Yousuf Kalim
 */
import { Request, Response } from 'express';
import Admins from 'models/admins.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IRequest from 'interfaces/request.interface';
import { JWT_SECRET, BCRYPT_SALT } from 'config';

/**
 * Create Admin - Signup
 * @param {object} req
 * @param {object} res
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, confirmPassword } = req.body; // Getting required fields from body
    const existingAdmin = await Admins.findOne({ email }); // Finding already existing user

    // Extra Validations
    if (existingAdmin) {
      // If we found existing user in db
      return res.status(409).json({ success: false, message: 'Admin already exists.' });
    } else if (password !== confirmPassword) {
      // Passwords not same
      return res.status(400).json({
        success: false,
        message: 'Password and Confirm Password are not same.',
      });
    }

    // Creating User
    req.body.password = bcrypt.hashSync(password, BCRYPT_SALT); // Hashing the password with salt 8
    const admin = await Admins.create(req.body); // Adding user in db

    // Done
    return res.json({ success: true, admin }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Login
 * @param {object} req
 * @param {object} res
 */
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Getting email and password
    const { email, password } = req.body;

    // Getting user from db
    const admin = await Admins.findOne({ email });

    if (!admin) {
      // If admin not found
      return res.status(404).json({ success: false, message: 'Admin not found' });
    } else if (!admin.active) {
      // If admin not found
      return res.status(400).json({ success: false, message: 'Your account is not activated' });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, admin.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with admin object
    // @ts-expect-error
    delete admin.password; // Removing password from admin object
    const payload = { user: admin };

    // Generating token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    // done
    return res.json({ success: true, admin, token });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
export const confirmAuth = (req: IRequest, res: Response): Response => {
  // If user authenticated
  return res.json({ success: true, admin: req.user, token: req.token });
};
