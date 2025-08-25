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
 * Get All Pending Blood Requests (Admin Only)
 */
const getAllPendingBloodRequests = async (
    query: Record<string, string> = {},
) => {
    const queryBuilder = new QueryBuilder(
        BloodRequest.find({ status: REQUEST_STATUS.PENDING }),
        query,
    );

    const bloodRequestsData = queryBuilder.filter().sort().fields().paginate();

    const [data, meta] = await Promise.all([
        bloodRequestsData
            .build()
            .populate('createdBy', 'name email phoneNumber'),
        queryBuilder.getMeta(),
    ]);

    return { data, meta };
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
    getAllPendingBloodRequests,
    getBloodRequestById,
};
