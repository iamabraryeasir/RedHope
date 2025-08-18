/**
 * Node Modules
 */
import { Document } from 'mongoose';

/**
 * Important Enums
 */
export enum ROLE {
    ADMIN = 'ADMIN',
    DONOR = 'DONOR',
}

export enum AVAILABLE_STATUS {
    AVAILABLE = 'AVAILABLE',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    RECOVERING = 'RECOVERING',
    PERMANENTLY_UNFIT = 'PERMANENTLY_UNFIT',
}

export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum BLOOD_GROUP {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
}

/**
 * User
 */
export interface IUser extends Document {
    name: string;
    role: ROLE;
    email: string;
    profileImageUrl?: string;
    phoneNumber: string;
    password: string;
    bloodGroup: BLOOD_GROUP;
    gender: GENDER;
    dateOfBirth: Date;
    district: string;
    city: string;
    thana?: string;
    lastDonatedAt?: Date;
    donationHistory?: {
        date: Date;
        location: string;
        recipientId?: string;
    }[];
    availabilityStatus: AVAILABLE_STATUS;
    isVerified: boolean;
    isDeleted: boolean;
    isBlocked: boolean;
}
