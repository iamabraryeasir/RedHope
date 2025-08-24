/**
 * Node Modules
 */
import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

/**
 * Local Modules
 */
import { catchAsync } from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { AuthService } from './auth.service';
import { setAuthCookie } from '@/utils/setCookie';
import { AppError } from '@/errorHelpers/AppError';

/**
 * Login User
 */
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const { user, tokens } = await AuthService.loginUser(payload);

    setAuthCookie(res, {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    });

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User login successful',
        data: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                isVerified: user.isVerified,
            },
        },
    });
});

/**
 * Refresh Token
 */
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'No refresh token received from cookies',
        );
    }

    const { accessToken } = await AuthService.getNewAccessToken(refreshToken);

    setAuthCookie(res, { accessToken });

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Successfully fetched the new access token',
        data: {
            accessToken,
        },
    });
});

/**
 * Log Out User
 */
const logOutUser = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
    });

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User logout successful',
        data: null,
    });
});

/**
 * Change Password
 */
const changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = req?.user?.userId;

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    await AuthService.changePassword(userId, oldPassword, newPassword);

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Password reset successful',
        data: null,
    });
});

/**
 * Forget Password
 */
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body;

    await AuthService.forgotPassword(email);

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Password reset email sent successfully',
        data: null,
    });
});

/**
 * Reset Password
 */
const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const { passwordResetToken, newPassword } = req.body;

    await AuthService.resetPassword(passwordResetToken, newPassword);

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Password reset successfully',
        data: null,
    });
});

/**
 * Export Controller
 */
export const AuthController = {
    loginUser,
    getNewAccessToken,
    logOutUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
