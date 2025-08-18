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

/**
 * Login User
 */
const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User login successfull',
        data: payload,
    });
});

/**
 * Export Controller
 */
export const AuthController = { loginUser };
