/**
 * User auth controllers
 * @author Yousuf Kalim
 */
import { Request, Response } from 'express';
import IRequest from '@interfaces/request.interface';
import Users from '@models/users.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@utils/sendEmail';
import { JWT_SECRET, BCRYPT_SALT } from '@config';

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
    const user = await Users.findOne({ email });

    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with user object
    // @ts-expect-error
    delete user.password; // Removing password from user object
    const payload = { user };

    // Generating token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    return res.json({ success: true, user, token });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Change Password
 * @param {object} req
 * @param {object} res
 */
export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password are not same',
      });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatched = bcrypt.compareSync(oldPassword, user.password);

    if (!isMatched) {
      return res.status(400).json({ success: false, message: 'Invalid old Password' });
    }

    // Generate token
    user.password = bcrypt.hashSync(newPassword, BCRYPT_SALT);

    await user.save();

    return res.json({ success: true, user });
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
export const forgot = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generating random password
    const randomPassword = Math.random().toString(36).slice(-8);

    // Sending email to user
    await sendEmail(email, randomPassword);

    // If email is sent then we have to update the password in db
    user.password = await bcrypt.hash(randomPassword, BCRYPT_SALT);
    await user.save();

    // Done
    return res.json({ success: true, message: 'Email sent successfully' });
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
  return res.json({ success: true, user: req.user });
};
