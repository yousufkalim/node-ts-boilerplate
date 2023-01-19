import { Request } from 'express';
import User from './users.interface';
import Admin from './admins.interface';

export default interface IRequest extends Request {
  user?: User | Admin;
  token?: string;
}
