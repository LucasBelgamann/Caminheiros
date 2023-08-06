export interface IUser {
  id?: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  created_at?: Date;
  updated_at?: Date;
}
