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
 * Get All Blood Requests (Admin Only - Full Access)
 */
const getAllBloodRequestsAdmin = catchAsync(async (req: Request, res: Response) => {
    const query = req.query as Record<string, string>;
    const allBloodRequests = await BloodRequestService.getAllBloodRequestsAdmin(query);
    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'All blood requests retrieved successfully',
        data: allBloodRequests,
    });
});

/**
 * Update Blood Request Status
 */
const updateBloodRequestStatus = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const statusData = req.body;
        const userId = req?.user?.userId;
        const userRole = req?.user?.role;

        const updatedBloodRequest =
            await BloodRequestService.updateBloodRequestStatus(
                id,
                statusData,
                userId,
                userRole,
            );

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Blood request status updated successfully',
            data: updatedBloodRequest,
        });
    },
);

/**
 * Reject Blood Request (Admin Only)
 */
const rejectBloodRequest = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const rejectionData = req.body;
    const userRole = req?.user?.role;

    const rejectedBloodRequest = await BloodRequestService.rejectBloodRequest(
        id,
        rejectionData,
        userRole,
    );

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Blood request rejected successfully',
        data: rejectedBloodRequest,
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
    getAllBloodRequestsAdmin,
    updateBloodRequestStatus,
    rejectBloodRequest,
    getBloodRequestById,
};
