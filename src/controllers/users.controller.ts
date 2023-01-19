/**
 * User CRUD controllers
 * @author Yousuf Kalim
 */
import { Request, Response } from 'express';
import Users from '@models/users.model';
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT } from '@config';

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body; // Getting required fields from body
    const existingUser = await Users.findOne({ email }); // Finding already existing user

    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }

    // Creating User
    req.body.password = bcrypt.hashSync(password, BCRYPT_SALT); // Hashing the password with salt 8
    const user = await Users.create(req.body); // Adding user in db

    // Done
    return res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get all users
 * @param {object} _req
 * @param {object} res
 */
export const getAll = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await Users.find(); // Finding all the users from db
    return res.json({ success: true, users }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get user by id
 * @param {object} req
 * @param {object} res
 */
export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await Users.findById(userId); // Finding user by id
    return res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Update user
 * @param {object} req
 * @param {object} res
 */
export const update = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter

    // If user want to update it's password
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, BCRYPT_SALT);
    }

    const user = await Users.findByIdAndUpdate(userId, req.body, { new: true }); // Updating the user
    return res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Delete user
 * @param {object} req
 * @param {object} res
 */
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await Users.findByIdAndDelete(userId); // Deleting the user
    return res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    // eslint-disable-next-line no-console
    console.log('Error ----> ', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
