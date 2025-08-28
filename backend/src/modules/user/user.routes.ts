/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest.middleware';
import { registerZodValidator } from './user.validation';
import { checkAuth } from '../../middlewares/checkAuth.middleware';
import { ROLE } from './user.interface';

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

router.get(
    '/:id',
    checkAuth(...Object.values(ROLE)),
    UserController.getSingleUser,
);

export const UserRouter = router;
