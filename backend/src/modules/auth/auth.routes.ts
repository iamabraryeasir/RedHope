/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { AuthController } from './auth.controller';
import { validateRequest } from '@/middlewares/validateRequest.middleware';
import { loginZodValidator } from './auth.validator';

/**
 * Routes
 */
const router = Router();

router.post(
    '/login',
    validateRequest(loginZodValidator),
    AuthController.loginUser,
);

/**
 * Export Router
 */
export const AuthRouter = router;
