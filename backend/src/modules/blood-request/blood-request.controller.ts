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
import { BloodRequestService } from './blood-request.service';

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
const getAllBloodRequestsAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const query = req.query as Record<string, string>;
        const allBloodRequests =
            await BloodRequestService.getAllBloodRequestsAdmin(query);
        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'All blood requests retrieved successfully',
            data: allBloodRequests,
        });
    },
);

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
 * Edit Pending Blood Request (Owner Only)
 */
const editPendingBloodRequest = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const updateData = req.body;
        const userId = req?.user?.userId;

        const updatedBloodRequest =
            await BloodRequestService.editPendingBloodRequest(
                id,
                updateData,
                userId,
            );

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Blood request updated successfully',
            data: updatedBloodRequest,
        });
    },
);

/**
 * Respond to Blood Request (Offer to Donate)
 */
const respondToBloodRequest = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req?.user?.userId;

        const updatedBloodRequest =
            await BloodRequestService.respondToBloodRequest(id, userId);

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Successfully responded to blood request',
            data: updatedBloodRequest,
        });
    },
);

/**
 * Withdraw Blood Request Response (Remove Donation Offer)
 */
const withdrawBloodRequestResponse = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req?.user?.userId;

        const updatedBloodRequest =
            await BloodRequestService.withdrawBloodRequestResponse(id, userId);

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Successfully withdrew donation offer',
            data: updatedBloodRequest,
        });
    },
);

/**
 * Get Blood Request Responders (Owner/Admin Only)
 */
const getBloodRequestResponders = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const userId = req?.user?.userId;
        const userRole = req?.user?.role;

        const responders = await BloodRequestService.getBloodRequestResponders(
            id,
            userId,
            userRole,
        );

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Blood request responders retrieved successfully',
            data: responders,
        });
    },
);

/**
 * Match Blood Request Donor (Owner/Admin Only)
 */
const matchBloodRequestDonor = catchAsync(
    async (req: Request, res: Response) => {
        const { id, userId } = req.params;
        const currentUserId = req?.user?.userId;
        const currentUserRole = req?.user?.role;

        const matchedBloodRequest =
            await BloodRequestService.matchBloodRequestDonor(
                id,
                userId,
                currentUserId,
                currentUserRole,
            );

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Donor matched successfully',
            data: matchedBloodRequest,
        });
    },
);

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

/**
 * Delete Blood Request (Admin Only)
 */
const deleteBloodRequest = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRole = req?.user?.role;

    const deletedRequest = await BloodRequestService.deleteBloodRequest(
        id,
        userRole,
    );

    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Blood request deleted successfully',
        data: deletedRequest,
    });
});

export const BloodRequestController = {
    newBloodRequest,
    getAllBloodRequests,
    getAllBloodRequestsAdmin,
    updateBloodRequestStatus,
    rejectBloodRequest,
    editPendingBloodRequest,
    respondToBloodRequest,
    withdrawBloodRequestResponse,
    getBloodRequestResponders,
    matchBloodRequestDonor,
    getBloodRequestById,
    deleteBloodRequest,
};
