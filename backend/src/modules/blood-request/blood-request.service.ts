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
        throw new Error('Blood request not found');
    }

    if (userRole !== 'ADMIN' && bloodRequest.createdBy.toString() !== userId) {
        throw new Error('You are not authorized to update this blood request');
    }

    bloodRequest.status = statusData.status;

    await bloodRequest.save();

    return await BloodRequest.findById(requestId)
        .populate('createdBy', 'name email')
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
    getBloodRequestById,
};
