export interface ILogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
