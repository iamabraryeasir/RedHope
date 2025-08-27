/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Local Modules
 */
import { AdminController } from './admin.controller';
import { checkAuth } from '@/middlewares/checkAuth.middleware';
import { ROLE } from '@/modules/user/user.interface';

/**
 * Routes
 */
const router = Router();

/**
 * Analytics Routes - Admin only
 */
router.get(
    '/analytics/dashboard',
    checkAuth(ROLE.ADMIN),
    AdminController.getDashboardAnalytics,
);

/**
 * Export Router
 */
export const AdminRouter = router;
