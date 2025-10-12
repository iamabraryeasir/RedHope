/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { BloodRequestController } from './blood-request.controller';
import { checkAuth } from '../../middlewares/checkAuth.middleware';
import { ROLE } from '../user/user.interface';
import {
    createBloodRequestSchema,
    updateBloodRequestStatusSchema,
    rejectBloodRequestSchema,
    editPendingBloodRequestSchema,
} from './blood-request.validator';
import { validateRequest } from '../../middlewares/validateRequest.middleware';

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

router.patch(
    '/:id',
    checkAuth(...Object.values(ROLE)),
    validateRequest(editPendingBloodRequestSchema),
    BloodRequestController.editPendingBloodRequest,
);

router.post(
    '/:id/respond',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.respondToBloodRequest,
);

router.delete(
    '/:id/respond',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.withdrawBloodRequestResponse,
);

router.get(
    '/:id/responders',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.getBloodRequestResponders,
);

router.patch(
    '/:id/match/:userId',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.matchBloodRequestDonor,
);

router.get(
    '/:id',
    checkAuth(...Object.values(ROLE)),
    BloodRequestController.getBloodRequestById,
);

router.delete(
    '/:id',
    checkAuth(ROLE.ADMIN),
    BloodRequestController.deleteBloodRequest,
);

export const BloodRequestRouter = router;
