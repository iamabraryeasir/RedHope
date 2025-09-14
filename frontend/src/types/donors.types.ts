export interface IDonor {
  _id: string;
  name: string;
  role: string;
  email: string;
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
