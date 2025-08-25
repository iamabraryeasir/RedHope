/**
 * Node Modules
 */

/**
 * Local Modules
 */
import { IBloodRequest, REQUEST_STATUS } from './blood-request.interface';
import { BloodRequest } from './blood-request.model';

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
import { QueryBuilder } from '@/utils/QueryBuilder';

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

export const BloodRequestService = {
    createBloodRequest,
    getAllBloodRequests,
};
