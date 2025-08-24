/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { UserController } from '@/modules/user/user.controller';
import { validateRequest } from '@/middlewares/validateRequest.middleware';
import { registerZodValidator } from '@/modules/user/user.validation';
import { checkAuth } from '@/middlewares/checkAuth.middleware';
import { ROLE } from '@/modules/user/user.interface';

const router = Router();

router.get('/me', checkAuth(...Object.values(ROLE)), UserController.getMe);

router.post(
    '/register',
    validateRequest(registerZodValidator),
    UserController.registerUser,
);

router.get('/', checkAuth(...Object.values(ROLE)), UserController.getAllDonors);

router.patch('/', checkAuth(...Object.values(ROLE)), UserController.updateUser);

router.get(
    '/:id/contact',
    checkAuth(...Object.values(ROLE)),
    UserController.getUserPhoneNumber,
);

export const UserRouter = router;
