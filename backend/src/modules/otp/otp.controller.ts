/**
 * Node Modules
 */
import { Request, Response } from 'express';

/**
 * Local Modules
 */
import { catchAsync } from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { OtpService } from '@/modules/otp/otp.service';

/**
 * Send Otp for Verification
 */
const sendOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, name } = req.body;

    await OtpService.sendOtp(email, name);

    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully send OTP',
        data: null,
    });
});

/**
 * Verify the OTP
 */
const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    await OtpService.verifyOtp(email, otp);

    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully verified OTP',
        data: null,
    });
});

export const OtpController = { sendOtp, verifyOtp };
