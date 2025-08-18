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
import { UserService } from './user.service';

/**
 * Register User
 */
const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const { name, email } = await UserService.registerUser(payload);

    sendResponse(res, {
        statusCode: httpCodes.CREATED,
        message: 'User registration successfull',
        data: {
            name,
            email,
        },
    });
});

/**
 * Controller Export
 */
export const UserController = { registerUser };
