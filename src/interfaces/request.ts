import { Request } from 'express';
import User from 'interfaces/user';
import Admin from 'interfaces/admin';

export default interface IRequest extends Request {
  user?: User | Admin;
  token?: string;
}
