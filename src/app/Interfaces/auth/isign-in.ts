import { JwtPayload } from 'jwt-decode';

export interface ISignIn {
  email: string;
  password: string;
}

export interface IPayLoad extends JwtPayload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
