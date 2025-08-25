/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { BloodRequestController } from '@/modules/blood-request/blood-request.controller';
import { checkAuth } from '@/middlewares/checkAuth.middleware';
import { ROLE } from '@/modules/user/user.interface';
import {
    createBloodRequestSchema,
    updateBloodRequestStatusSchema,
    rejectBloodRequestSchema,
} from '@/modules/blood-request/blood-request.validator';
import { validateRequest } from '@/middlewares/validateRequest.middleware';

/**
 * Routes
 */
const router = Router();

router.post(
    '/',
    checkAuth(...Object.values(ROLE)),
    validateRequest(createBloodRequestSchema),
    BloodRequestController.newBloodRequest,
);

router.get(
    '/',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.getAllBloodRequests,
);

router.get(
    '/admin/all',
    checkAuth(ROLE.ADMIN),
    BloodRequestController.getAllBloodRequestsAdmin,
);

router.patch(
    '/:id/status',
    checkAuth(...Object.values(ROLE)),
    validateRequest(updateBloodRequestStatusSchema),
    BloodRequestController.updateBloodRequestStatus,
);

router.patch(
    '/:id/reject',
    checkAuth(ROLE.ADMIN),
    validateRequest(rejectBloodRequestSchema),
    BloodRequestController.rejectBloodRequest,
);

router.get(
    '/:id',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.getBloodRequestById,
);

export const BloodRequestRouter = router;
