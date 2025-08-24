/**
 * Node Modules
 */
import { Schema, model } from 'mongoose';

/**
 * Types
 */
import { IPhoneAccessLog } from '@/modules/phone-access-log/phone-access-log.interface';

/**
 * Phone Access Log Schema
 */
const PhoneAccessLogSchema = new Schema<IPhoneAccessLog>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        requesterId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ip: { type: String, required: true },
    },
    { timestamps: true, versionKey: false },
);

const PhoneAccessLog = model<IPhoneAccessLog>(
    'PhoneAccessLog',
    PhoneAccessLogSchema,
);

export default PhoneAccessLog;
