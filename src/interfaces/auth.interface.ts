/**
 * Auth interfaces - Where we define all the interfaces for Auth
 * @author Yousuf Kalim
 */
export default interface Auth {
  email: string;
  password: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
