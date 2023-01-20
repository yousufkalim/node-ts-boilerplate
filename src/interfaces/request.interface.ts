/**
 * Request interfaces - Where we define all the custom interfaces for the Request
 * @author Yousuf Kalim
 */
import { Request } from 'express';
import User from './users.interface';
import Admin from './admins.interface';

export default interface IRequest extends Request {
  user?: User | Admin;
  token?: string;
}
