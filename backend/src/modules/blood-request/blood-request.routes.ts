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
import { createBloodRequestSchema } from '@/modules/blood-request/blood-request.validator';
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

export const BloodRequestRouter = router;
