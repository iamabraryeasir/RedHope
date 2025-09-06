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

export interface IUserInfoResponse {
  _id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  bloodGroup: string;
  gender: string;
  dateOfBirth: string;
  district: string;
  city: string;
  thana: string;
  availabilityStatus: string;
  isVerified: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  donationHistory: any[];
  createdAt: string;
  updatedAt: string;
}
