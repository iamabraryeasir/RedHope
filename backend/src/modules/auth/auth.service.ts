/**
 * Node Modules
 */
import httpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';

/**
 * Local Modules
 */
import { AppError } from '@/errorHelpers/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
    createNewAccessTokenWithRefreshToken,
    createUserTokens,
} from '@/utils/userTokens';

/**
 * Login User
 */
const loginUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    // Check if user is blocked
    if (user.isBlocked) {
        throw new AppError(httpCodes.UNAUTHORIZED, 'User is blocked');
    }

    // if user is deleted
    if (user.isDeleted) {
        throw new AppError(httpCodes.UNAUTHORIZED, 'User is deleted');
    }

    // if user is not verified
    if (!user.isVerified) {
        throw new AppError(httpCodes.UNAUTHORIZED, 'User is not verified');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
        password as string,
        user.password,
    );
    if (!isPasswordValid) {
        throw new AppError(httpCodes.UNAUTHORIZED, 'Invalid email or password');
    }

    // Create tokens
    const tokens = createUserTokens(user);

    return { user, tokens };
};

/**
 * Get New Access Token
 */
const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken =
        await createNewAccessTokenWithRefreshToken(refreshToken);

    return { accessToken: newAccessToken };
};

/**
 * Export Service
 */
export const AuthService = { loginUser, getNewAccessToken };
