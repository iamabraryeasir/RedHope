/**
 * Node Modules
 */
import httpCodes from 'http-status-codes';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Local Modules
 */
import { IUser, ROLE } from './user.interface';
import { AppError } from '../../errorHelpers/AppError';
import { User } from './user.model';
import config from '../../config';
import { QueryBuilder } from '../../utils/QueryBuilder';
import { userSearchableFields } from './user.constant';
import PhoneAccessLog from '../phone-access-log/phone-access-log.model';

/**
 * Register User
 */
const registerUser = async (payload: Partial<IUser>) => {
    const { email, password, dateOfBirth, ...rest } = payload;

    // Check if the user already exists
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User already exists');
    }

    // Calculate age from date of birth
    const age = dateOfBirth
        ? new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
        : 0;

    // Set availabilityStatus based on age
    const availabilityStatus = age < 18 ? 'NOT_AVAILABLE' : 'AVAILABLE';

    // Hashing the password
    const hashedPassword = await bcrypt.hash(
        password as string,
        config.BCRYPT_SALT_ROUND,
    );

    // Saving the data to the database
    const newUser = await User.create({
        email,
        password: hashedPassword,
        dateOfBirth,
        availabilityStatus,
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
 * Update User
 */
const updateUser = async (userId: string, payload: Partial<IUser>) => {
    const user = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new AppError(httpCodes.NOT_FOUND, 'User not found');
    }
    return user.toObject();
};

/**
 * Get Single User
 */
const getSingleUser = async (userId: string) => {
    const user = await User.findById(userId).select(
        '-password -isBlocked -isDeleted -phoneNumber',
    );
    if (!user) {
        throw new AppError(httpCodes.NOT_FOUND, 'User not found');
    }
    return user?.toObject();
};

/**
 * Export Service
 */
export const UserService = {
    registerUser,
    getMe,
    getAllDonors,
    getUserPhoneNumber,
    updateUser,
    getSingleUser,
};
