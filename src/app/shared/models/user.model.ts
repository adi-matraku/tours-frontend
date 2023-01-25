export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
  token?: string;
  imageUrl?: string;
}
