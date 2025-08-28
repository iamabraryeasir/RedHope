/**
 * Node Modules
 */
import crypto from 'node:crypto';
import httpStatusCodes from 'http-status-codes';

/**
 * Local Modules
 */
import { redisClient } from '../../config/redis.config';
import { sendEmail } from '../../utils/sendEmail';
import { AppError } from '../../errorHelpers/AppError';
import { User } from '../user/user.model';

/**
 * Local Utils
 */
const OTP_EXPIRATION = 3 * 60; // 3 minutes

const generateOtp = (length = 6) => {
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);
    return otp.toString();
};

/**
 * Send OTP Service
 */
const sendOtp = async (email: string, name: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            'No user found with this mail',
        );
    }

    if (user.isVerified) {
        throw new AppError(
            httpStatusCodes.BAD_REQUEST,
            'User is already verified',
        );
    }

    const otp = generateOtp();

    const redisKey = `otp:${email}`;

    await redisClient.set(redisKey, otp, {
        expiration: { type: 'EX', value: OTP_EXPIRATION },
    });

    await sendEmail({
        to: email,
        subject: 'PH Tour Verification OTP',
        templateName: 'otp',
        templateData: { name, otp },
    });
};

const verifyOtp = async (email: string, otp: string) => {
    const redisKey = `otp:${email}`;

    const savedOtp = await redisClient.get(redisKey);

    if (!savedOtp) {
        throw new AppError(401, 'Invalid OTP');
    }

    if (savedOtp !== otp) {
        throw new AppError(401, 'Invalid OTP');
    }

    Promise.all([
        User.updateOne(
            { email },
            { isVerified: true },
            { runValidators: true },
        ),
        redisClient.del([redisKey]),
    ]);
};

export const OtpService = { sendOtp, verifyOtp };
