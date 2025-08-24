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
 * Export Controller
 */
export const AuthController = { loginUser, getNewAccessToken };
