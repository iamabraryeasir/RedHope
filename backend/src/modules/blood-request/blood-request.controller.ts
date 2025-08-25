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

export const BloodRequestController = {
    newBloodRequest,
};
