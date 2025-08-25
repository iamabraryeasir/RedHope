/**
 * Node Modules
 */

/**
 * Local Modules
 */
import { IBloodRequest } from './blood-request.interface';
import { BloodRequest } from './blood-request.model';

/**
 * Create Blood Request
 */
const createBloodRequest = async (bloodRequestData: Partial<IBloodRequest>) => {
    const newBloodRequest = await BloodRequest.create(bloodRequestData);
    return newBloodRequest;
};

export const BloodRequestService = {
    createBloodRequest,
};
