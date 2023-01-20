/**
 * User interfaces - Where we define all the interfaces for Users
 * @author Yousuf Kalim
 */
export default interface User {
  name: string;
  email: string;
  password: string;
  number: string;
  gender?: 'male' | 'female' | 'other';
  role: 'user';
  address?: string;
  city?: string;
  country?: string;
  photo?: string;
}
