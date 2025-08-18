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
 * Export Controller
 */
export const AuthController = { loginUser };
