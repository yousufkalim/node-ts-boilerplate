/**
 * Admin interfaces - Where we define all the interfaces for Admins
 * @author Yousuf Kalim
 */
export default interface Admin {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  active: boolean;
}
