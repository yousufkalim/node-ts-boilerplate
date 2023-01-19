import { Request } from 'express';
import User from 'interfaces/users.interface';
import Admin from 'interfaces/admins.interface';

export default interface IRequest extends Request {
  user?: User | Admin;
  token?: string;
}
