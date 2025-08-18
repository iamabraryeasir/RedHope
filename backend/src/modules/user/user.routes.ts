/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { UserController } from './user.controller';
import { validateRequest } from '@/middlewares/validateRequest.middleware';
import { registerZodValidator } from './user.validation';

const router = Router();

router.post(
    '/register',
    validateRequest(registerZodValidator),
    UserController.registerUser,
);

export const UserRouter = router;
