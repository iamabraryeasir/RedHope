/**
 * Node Modules
 */
import httpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';

/**
 * Local Modules
 */
import { IUser, ROLE } from '@/modules/user/user.interface';
import { AppError } from '@/errorHelpers/AppError';
import { User } from '@/modules/user/user.model';
import config from '@/config';
import { QueryBuilder } from '@/utils/QueryBuilder';
import { userSearchableFields } from './user.constant';
import PhoneAccessLog from '../phone-access-log/phone-access-log.model';
import { Types } from 'mongoose';

/**
 * Register User
 */
const registerUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    // check if is user already registered
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User already exists');
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(
        password as string,
        config.BCRYPT_SALT_ROUND,
    );

    // saving the data to database
    const newUser = await User.create({
        email,
        password: hashedPassword,
        ...rest,
    });

    return newUser;
};

/**
 * Get User By Id
 */
const getMe = async (userId: string) => {
    const user = await User.findById(userId).select(
        '-password -isBlocked -isDeleted',
    );
    if (!user) {
        throw new AppError(httpCodes.NOT_FOUND, 'User not found');
    }
    return user?.toObject();
};

/**
 * Get All Donors
 */
const getAllDonors = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(
        User.find({ role: ROLE.DONOR }),
        query,
    );

    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields('', ['password', 'phoneNumber', 'isBlocked', 'isDeleted'])
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

/**
 * Get User Phone Number
 */
const getUserPhoneNumber = async (
    userId: string,
    requesterId: string,
    ip: string,
) => {
    const requester = await User.findById(requesterId).lean();
    if (!requester) {
        throw new AppError(httpCodes.NOT_FOUND, 'Requester not found');
    }

    const user = await User.findById(userId).select('phoneNumber');
    if (!user) {
        throw new AppError(httpCodes.NOT_FOUND, 'User not found');
    }

    const isAdmin = requester.role === ROLE.ADMIN;
    const isSelf =
        typeof requester._id !== 'undefined' &&
        new Types.ObjectId(userId).equals(requester._id?.toString());
    if (!isAdmin && !isSelf) {
        await PhoneAccessLog.create({
            userId,
            requesterId,
            ip,
        });
    }

    return user?.toObject().phoneNumber;
};

/**
 * Export Service
 */
export const UserService = {
    registerUser,
    getMe,
    getAllDonors,
    getUserPhoneNumber,
};
