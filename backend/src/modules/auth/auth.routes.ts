/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { AuthController } from './auth.controller';
import { validateRequest } from '@/middlewares/validateRequest.middleware';
import {
    changePasswordZodValidator,
    loginZodValidator,
} from './auth.validator';
import { checkAuth } from '@/middlewares/checkAuth.middleware';
import { ROLE } from '../user/user.interface';

/**
 * Routes
 */
const router = Router();

router.post(
    '/login',
    validateRequest(loginZodValidator),
    AuthController.loginUser,
);

router.post('/refresh-token', AuthController.getNewAccessToken);

router.post('/logout', AuthController.logOutUser);

router.post(
    '/change-password',
    checkAuth(...Object.values(ROLE)),
    validateRequest(changePasswordZodValidator),
    AuthController.changePassword,
);

/**
 * Export Router
 */
export const AuthRouter = router;
