/**
 * Node Modules
 */
import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

/**
 * Local Modules
 */
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';

/**
 * Register User
 */
const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const { name, email } = await UserService.registerUser(payload);

    sendResponse(res, {
        statusCode: httpCodes.CREATED,
        message: 'User registration successful',
        data: {
            name,
            email,
        },
    });
});

/**
 * Get Logged In User
 */
const getMe = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;

    const userData = await UserService.getMe(user.userId);

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User retrieved successfully',
        data: {
            ...userData,
        },
    });
});

/**
 * Get All Users/Donors
 */
const getAllDonors = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const allDonors = await UserService.getAllDonors(
        query as Record<string, string>,
    );

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User retrieved successfully',
        data: allDonors.data,
        meta: allDonors.meta,
    });
});

/**
 * Get User Phone Number
 */
const getUserPhoneNumber = catchAsync(async (req: Request, res: Response) => {
    const requesterId = req?.user?.userId;
    const donorId = req.params.id;
    const ip =
        req.ip === '::1' ? '127.0.0.1' : req?.ip?.replace(/^::ffff:/, '');

    const userPhoneNumber = await UserService.getUserPhoneNumber(
        donorId,
        requesterId,
        ip!,
    );

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User phone number retrieved successfully',
        data: userPhoneNumber,
    });
});

/**
 * Update user controller
 */
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req?.user?.userId;

    // update the user
    const updatedNewUser = await UserService.updateUser(userId, req.body);

    // remove sensitive data
    const { password, isDeleted, isBlocked, ...rest } = updatedNewUser as IUser;

    sendResponse(res, {
        statusCode: httpCodes.CREATED,
        message: 'User updated successfully',
        data: {
            ...rest,
        },
    });
});

/**
 * Get Single User
 */
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;

    const user = await UserService.getSingleUser(userId);

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'User retrieved successfully',
        data: user,
    });
});

/**
 * Controller Export
 */
export const UserController = {
    registerUser,
    getMe,
    getAllDonors,
    getUserPhoneNumber,
    updateUser,
    getSingleUser,
};
