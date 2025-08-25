/**
 * Node Modules
 */
import { Document, Types } from 'mongoose';

/**
 * Local Modules
 */
import { BLOOD_GROUP } from '@/modules/user/user.interface';

/**
 * Urgency levels for blood requests
 */
export enum URGENCY {
    LOW = 'LOW',
    NORMAL = 'NORMAL',
    HIGH = 'HIGH',
    EMERGENCY = 'EMERGENCY',
}

export enum REQUEST_STATUS {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED',
    MATCHED = 'MATCHED',
    EXPIRED = 'EXPIRED',
}

/**
 * Blood request interface
 */
export interface IBloodRequest extends Document {
    createdBy: Types.ObjectId;
    patientName: string;
    bloodGroup: BLOOD_GROUP;
    unitsNeeded: number;
    urgency: URGENCY;
    reasonOfRequest: string;

    hospitalName: string;
    hospitalAddress: string;
    hospitalCity: string;
    hospitalDistrict: string;

    contactPhone: string;
    altContactPhone?: string;

    neededBy: Date;
    expiresAt?: Date;

    status: REQUEST_STATUS;

    matchedDonor?: Types.ObjectId;
    responders: Types.ObjectId[];
}
