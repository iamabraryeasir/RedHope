/**
 * Node Modules
 */
import { Schema, model } from 'mongoose';

/**
 * Local Modules
 */
import {
    IUser,
    ROLE,
    AVAILABLE_STATUS,
    GENDER,
    BLOOD_GROUP,
} from './user.interface';

/**
 * User Schema
 */
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE.DONOR,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String },
        bloodGroup: {
            type: String,
            enum: Object.values(BLOOD_GROUP),
            required: true,
        },
        gender: { type: String, enum: Object.values(GENDER), required: true },
        dateOfBirth: { type: Date, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        thana: { type: String },
        lastDonatedAt: { type: Date },
        donationHistory: [
            {
                date: { type: Date, required: true },
                location: { type: String, required: true },
                recipientId: { type: Schema.Types.ObjectId, ref: 'User' },
            },
        ],
        availabilityStatus: {
            type: String,
            enum: Object.values(AVAILABLE_STATUS),
            default: AVAILABLE_STATUS.AVAILABLE,
            required: true,
        },
        isVerified: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

/**
 * Model
 */
export const User = model<IUser>('User', userSchema);
