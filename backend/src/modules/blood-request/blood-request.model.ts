/**
 * Node Modules
 */
import { Schema, model, Types } from 'mongoose';

/**
 * Local Modules
 */
import {
    IBloodRequest,
    URGENCY,
    REQUEST_STATUS,
} from '@/modules/blood-request/blood-request.interface';
import { BLOOD_GROUP } from '@/modules/user/user.interface';

/**
 * Blood Request Schema
 */
const bloodRequestSchema = new Schema<IBloodRequest>(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        patientName: { type: String, trim: true, required: true },

        bloodGroup: {
            type: String,
            enum: Object.values(BLOOD_GROUP),
            required: true,
            index: true,
        },

        unitsNeeded: { type: Number, min: 1, max: 6, default: 1 },

        urgency: {
            type: String,
            enum: Object.values(URGENCY),
            default: URGENCY.NORMAL,
            index: true,
        },

        reasonOfRequest: {
            type: String,
            trim: true,
            maxlength: 1000,
            required: true,
        },

        hospitalName: { type: String, trim: true, required: true },
        hospitalAddress: { type: String, trim: true, default: '' },
        hospitalCity: { type: String, trim: true, index: true, required: true },
        hospitalDistrict: {
            type: String,
            trim: true,
            index: true,
            required: true,
        },

        contactPhone: {
            type: String,
            required: true,
            match: [/^(\+?88)?01[3-9]\d{8}$/, 'Invalid phone number'],
        },
        altContactPhone: {
            type: String,
            match: [/^(\+?88)?01[3-9]\d{8}$/, 'Invalid phone number'],
        },

        neededBy: { type: Date, required: true, index: true },

        expiresAt: { type: Date, index: { expireAfterSeconds: 0 } },

        status: {
            type: String,
            enum: Object.values(REQUEST_STATUS),
            default: REQUEST_STATUS.PENDING,
            index: true,
        },

        reasonOfRejection: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        matchedDonor: { type: Types.ObjectId, ref: 'User' },

        responders: [{ type: Types.ObjectId, ref: 'User', default: [] }],
    },
    { timestamps: true, versionKey: false },
);

/**
 * Helpful indexes for list/search pages
 */
bloodRequestSchema.index({
    bloodGroup: 1,
    urgency: 1,
    status: 1,
    hospitalCity: 1,
    hospitalDistrict: 1,
    neededBy: 1,
});

bloodRequestSchema.index({ hospitalName: 'text', hospitalAddress: 'text' });

/**
 * Auto-fill expiresAt if not set (e.g., 48h after neededBy)
 */
bloodRequestSchema.pre('save', function (next) {
    if (!this.expiresAt && this.neededBy instanceof Date) {
        const twoDays = 48 * 60 * 60 * 1000;
        this.expiresAt = new Date(this.neededBy.getTime() + twoDays);
    }
    next();
});

export const BloodRequest = model<IBloodRequest>(
    'BloodRequest',
    bloodRequestSchema,
);
