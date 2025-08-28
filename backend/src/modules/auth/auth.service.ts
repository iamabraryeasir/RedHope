/**
 * Node Modules
 */
import httpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Local Modules
 */
import { AppError } from '../../errorHelpers/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
    createNewAccessTokenWithRefreshToken,
    createUserTokens,
} from '../../utils/userTokens';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';
import { redisClient } from '../../config/redis.config';

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
 * Reset password service logic
 */
const changePassword = async (
    userId: string,
    oldPassword: string,
    newPassword: string,
) => {
    const userFromDB = await User.findById(userId);

    const verifyOldPassword = await bcrypt.compare(
        oldPassword,
        userFromDB?.password as string,
    );

    if (!verifyOldPassword) {
        throw new AppError(
            httpCodes.UNAUTHORIZED,
            "Previous password doesn't match",
        );
    }

    const newPasswordHash = await bcrypt.hash(
        newPassword,
        config.BCRYPT_SALT_ROUND,
    );

    await User.findByIdAndUpdate(
        userId,
        { password: newPasswordHash },
        { new: true },
    );
};

/**
 * Forgot Password
 */
const forgotPassword = async (email: string) => {
    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User does not exist');
    }

    if (isUserExists.isBlocked) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'User is blocked. Contact with the admins.',
        );
    }

    if (isUserExists.isDeleted) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'User is deleted. Contact the admins',
        );
    }

    if (!isUserExists.isVerified) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User is not verified');
    }

    const payload = {
        userId: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role,
    };

    const resetPasswordToken = jwt.sign(
        payload,
        config.JWT.RESET_PASSWORD_SECRET,
        {
            expiresIn: '10m',
        },
    );

    const redisKey = `pwdreset:${email}`;
    await redisClient.set(redisKey, resetPasswordToken, {
        expiration: { type: 'EX', value: 10 * 60 }, // 10 minutes
    });

    const resetUILink = `${config.FRONTEND_URL}/reset-password?token=${resetPasswordToken}`;

    sendEmail({
        to: isUserExists.email,
        subject: 'Password reset email.',
        templateName: 'forgotPassword',
        templateData: {
            name: isUserExists.name,
            resetUILink,
        },
    });
};

/**
 * Reset password service logic
 */
const resetPassword = async (
    passwordResetToken: string,
    newPassword: string,
) => {
    let payload: any;
    try {
        payload = jwt.verify(
            passwordResetToken,
            config.JWT.RESET_PASSWORD_SECRET,
        );
    } catch (err) {
        throw new AppError(httpCodes.BAD_REQUEST, 'Invalid or expired token');
    }

    // Ensure token is in Redis (single use)
    const redisKey = `pwdreset:${payload.email}`;
    const savedToken = await redisClient.get(redisKey);
    if (!savedToken || savedToken !== passwordResetToken) {
        throw new AppError(httpCodes.BAD_REQUEST, 'Invalid or expired token');
    }

    // Hash new password & update user
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await Promise.all([
        User.updateOne({ _id: payload.userId }, { password: hashedPassword }),
        redisClient.del([redisKey]),
    ]);

    return { ok: true };
};

/**
 * Export Service
 */
export const AuthService = {
    loginUser,
    getNewAccessToken,
    changePassword,
    forgotPassword,
    resetPassword,
};
