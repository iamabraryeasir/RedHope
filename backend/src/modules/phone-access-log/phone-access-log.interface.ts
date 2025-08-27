/**
 * Node Modules
 */
import { Types } from 'mongoose';

/**
 * Interface for Phone Access Log
 */
export interface IPhoneAccessLog extends Document {
    userId: Types.ObjectId;
    requesterId: Types.ObjectId;
    ip: string;
}
