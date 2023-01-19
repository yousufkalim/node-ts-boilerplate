export default interface Admin {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'superadmin';
  active: boolean;
}
