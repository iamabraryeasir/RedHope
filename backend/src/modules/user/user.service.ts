/**
 * Node Modules
 */
import httpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';

/**
 * Local Modules
 */
import { IUser } from '@/modules/user/user.interface';
import { AppError } from '@/errorHelpers/AppError';
import { User } from '@/modules/user/user.model';
import config from '@/config';

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
 * Export Service
 */
export const UserService = { registerUser, getMe };
