/**
 * Node Modules
 */

/**
 * Local Modules
 */
import {
    IBloodRequest,
    REQUEST_STATUS,
} from '@/modules/blood-request/blood-request.interface';
import { BloodRequest } from '@/modules/blood-request/blood-request.model';
import { QueryBuilder } from '@/utils/QueryBuilder';
import { AppError } from '@/errorHelpers/AppError';
import httpCodes from 'http-status-codes';

/**
 * Create Blood Request
 */
const createBloodRequest = async (bloodRequestData: Partial<IBloodRequest>) => {
    const newBloodRequest = await BloodRequest.create(bloodRequestData);
    return newBloodRequest;
};

/**
 * Get All Blood Requests
 */

const getAllBloodRequests = async (query: Record<string, string> = {}) => {
    const queryBuilder = new QueryBuilder(
        BloodRequest.find({ status: REQUEST_STATUS.APPROVED }),
        query,
    );

    const bloodRequestsData = queryBuilder.filter().sort().fields().paginate();

    const [data, meta] = await Promise.all([
        bloodRequestsData.build().populate('createdBy', 'name'),
        queryBuilder.getMeta(),
    ]);

    return { data, meta };
};

/**
 * Get All Blood Requests (Admin Only - No Status Filter)
 */
const getAllBloodRequestsAdmin = async (query: Record<string, string> = {}) => {
    // Admin can query ALL blood requests regardless of status
    const queryBuilder = new QueryBuilder(
        BloodRequest.find(), // No status filter - admin sees everything
        query,
    );

    const bloodRequestsData = queryBuilder.filter().sort().fields().paginate();

    const [data, meta] = await Promise.all([
        bloodRequestsData
            .build()
            .populate('createdBy', 'name email phoneNumber district city')
            .populate('matchedDonor', 'name email phoneNumber bloodGroup')
            .populate('responders', 'name email phoneNumber bloodGroup'),
        queryBuilder.getMeta(),
    ]);

    return { data, meta };
};

/**
 * Update Blood Request Status
 */
const updateBloodRequestStatus = async (
    requestId: string,
    statusData: { status: REQUEST_STATUS; note?: string },
    userId: string,
    userRole: string,
) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    if (userRole !== 'ADMIN' && bloodRequest.createdBy.toString() !== userId) {
        throw new AppError(
            httpCodes.FORBIDDEN,
            'You are not authorized to update this blood request',
        );
    }

    bloodRequest.status = statusData.status;

    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
        .lean();
};

/**
 * Reject Blood Request (Admin Only)
 */
const rejectBloodRequest = async (
    requestId: string,
    rejectionData: { reasonOfRejection: string },
    userRole: string,
) => {
    // Only admins can reject blood requests
    if (userRole !== 'ADMIN') {
        throw new AppError(
            httpCodes.FORBIDDEN,
            'Only administrators can reject blood requests',
        );
    }

    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Check if request can be rejected (should not be already completed/expired)
    if (
        bloodRequest.status === REQUEST_STATUS.COMPLETED ||
        bloodRequest.status === REQUEST_STATUS.EXPIRED
    ) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            `Cannot reject a ${bloodRequest.status.toLowerCase()} blood request`,
        );
    }

    // Update status to REJECTED and add rejection reason
    bloodRequest.status = REQUEST_STATUS.REJECTED;
    bloodRequest.reasonOfRejection = rejectionData.reasonOfRejection;

    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email phoneNumber')
        .lean();
};

/**
 * Edit Pending Blood Request (Owner Only)
 */
const editPendingBloodRequest = async (
    requestId: string,
    updateData: Partial<IBloodRequest>,
    userId: string,
) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Only the owner can edit their blood request
    if (bloodRequest.createdBy.toString() !== userId) {
        throw new AppError(
            httpCodes.FORBIDDEN,
            'You are not authorized to edit this blood request',
        );
    }

    // Only allow editing when status is PENDING
    if (bloodRequest.status !== REQUEST_STATUS.PENDING) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'Blood request can only be edited while status is PENDING',
        );
    }

    // Update the blood request with new data
    Object.assign(bloodRequest, updateData);
    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
        .lean();
};

/**
 * Respond to Blood Request (Offer to Donate)
 */
const respondToBloodRequest = async (requestId: string, userId: string) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Owner cannot respond to their own request
    if (bloodRequest.createdBy.toString() === userId) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'You cannot respond to your own blood request',
        );
    }

    // Check if user has already responded (idempotent operation)
    const hasAlreadyResponded = bloodRequest.responders.some(
        (responderId) => responderId.toString() === userId,
    );

    if (!hasAlreadyResponded) {
        // Add user to responders array
        bloodRequest.responders.push(userId as any);
        await bloodRequest.save();
    }

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
        .populate('responders', 'name email phoneNumber bloodGroup')
        .lean();
};

/**
 * Withdraw Blood Request Response (Remove Donation Offer)
 */
const withdrawBloodRequestResponse = async (
    requestId: string,
    userId: string,
) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Check if user has responded to this request
    const hasResponded = bloodRequest.responders.some(
        (responderId) => responderId.toString() === userId,
    );

    if (!hasResponded) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'You have not responded to this blood request',
        );
    }

    // Remove user from responders array
    bloodRequest.responders = bloodRequest.responders.filter(
        (responderId) => responderId.toString() !== userId,
    );

    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
        .populate('responders', 'name email phoneNumber bloodGroup')
        .lean();
};

/**
 * Get Blood Request Responders (Owner/Admin Only)
 */
const getBloodRequestResponders = async (
    requestId: string,
    userId: string,
    userRole: string,
) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Only owner or admin can view responders
    const isOwner = bloodRequest.createdBy.toString() === userId;
    const isAdmin = userRole === 'ADMIN';

    if (!isOwner && !isAdmin) {
        throw new AppError(
            httpCodes.FORBIDDEN,
            'You are not authorized to view responders for this blood request',
        );
    }

    // Return blood request with populated responders (minimal fields)
    const bloodRequestWithResponders = await BloodRequest.findById(requestId)
        .populate('responders', 'name email bloodGroup city district phoneNumber')
        .populate('createdBy', 'name email')
        .lean();

    return {
        requestId: bloodRequestWithResponders?._id,
        patientName: bloodRequestWithResponders?.patientName,
        bloodGroup: bloodRequestWithResponders?.bloodGroup,
        createdBy: bloodRequestWithResponders?.createdBy,
        responders: bloodRequestWithResponders?.responders || [],
        respondersCount: bloodRequestWithResponders?.responders?.length || 0,
    };
};

/**
 * Match Blood Request Donor (Owner/Admin Only)
 */
const matchBloodRequestDonor = async (
    requestId: string,
    donorUserId: string,
    currentUserId: string,
    currentUserRole: string,
) => {
    const bloodRequest = await BloodRequest.findById(requestId);

    if (!bloodRequest) {
        throw new AppError(httpCodes.NOT_FOUND, 'Blood request not found');
    }

    // Only owner or admin can match donors
    const isOwner = bloodRequest.createdBy.toString() === currentUserId;
    const isAdmin = currentUserRole === 'ADMIN';

    if (!isOwner && !isAdmin) {
        throw new AppError(
            httpCodes.FORBIDDEN,
            'You are not authorized to match donors for this blood request',
        );
    }

    // Check if the donor has actually responded to this request
    const hasResponded = bloodRequest.responders.some(
        (responderId) => responderId.toString() === donorUserId,
    );

    if (!hasResponded) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            'Selected user has not responded to this blood request',
        );
    }

    // Check if request is in a valid state for matching
    const validStatuses = [REQUEST_STATUS.PENDING, REQUEST_STATUS.APPROVED];
    if (!validStatuses.includes(bloodRequest.status)) {
        throw new AppError(
            httpCodes.BAD_REQUEST,
            `Cannot match donors for a ${bloodRequest.status.toLowerCase()} blood request`,
        );
    }

    // Set matched donor and update status
    bloodRequest.matchedDonor = donorUserId as any;
    bloodRequest.status = REQUEST_STATUS.MATCHED;
    
    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
        .populate('matchedDonor', 'name email phoneNumber bloodGroup city district')
        .populate('responders', 'name email bloodGroup')
        .lean();
};

/**
 * Get Blood Request by ID
 */
const getBloodRequestById = async (id: string) => {
    const bloodRequest = await BloodRequest.findById(id)
        .populate('createdBy', 'name')
        .lean();
    return bloodRequest;
};

/**
 * Blood Request Service Export
 */
export const BloodRequestService = {
    createBloodRequest,
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
};
