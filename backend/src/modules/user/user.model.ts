/**
 * Node Modules
 */
import { Schema, model } from 'mongoose';

/**
 * Local Modules
 */
import { IUser, ROLE } from './user.interface';

/**
 * Schema
 */
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            minLength: 5,
            maxLength: 50,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLE),
            default: ROLE.DONOR,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
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
