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
import { BloodRequestService } from '@/modules/blood-request/blood-request.service';

/**
 * Create Blood Request
 */
const newBloodRequest = catchAsync(async (req: Request, res: Response) => {
    const bloodRequestData = req.body;
    bloodRequestData.createdBy = req?.user?.userId;

    const newBloodRequest =
        await BloodRequestService.createBloodRequest(bloodRequestData);

    sendResponse(res, {
        statusCode: httpCodes.CREATED,
        message: 'Blood request created successfully',
        data: newBloodRequest,
    });
});

/**
 * Get All Blood Requests
 */
const getAllBloodRequests = catchAsync(async (req: Request, res: Response) => {
    const bloodRequests = await BloodRequestService.getAllBloodRequests();
    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Blood requests retrieved successfully',
        data: bloodRequests,
    });
});

/**
 * Get Blood Request by ID
 */
const getBloodRequestById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const bloodRequest = await BloodRequestService.getBloodRequestById(id);
    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Blood request retrieved successfully',
        data: bloodRequest,
    });
});

export const BloodRequestController = {
    newBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
};
