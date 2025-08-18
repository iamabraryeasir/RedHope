/**
 * Node Modules
 */
import { Request, Response, Router } from 'express';
import httpCodes from 'http-status-codes';

/**
 * Local Modules
 */
import sendResponse from '@/utils/sendResponse';

/**
 * Routers
 */
import { UserRouter } from '@/modules/user/user.routes';
import { AuthRouter } from '@/modules/auth/auth.routes';

/**
 * Types
 */
interface IModuleRoutes {
    path: string;
    route: Router;
}

const router = Router();

/**
 * API Root route
 */
router.get('/', (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: httpCodes.OK,
        message: 'Welcome to RedHope API V1',
        data: {
            version: '1.0.0',
            docs: 'https://github.com/iamabraryeasir/RedHope',
            timestamp: new Date().toISOString(),
        },
    });
});

/**
 * Routes list
 */
const moduleRoutes: IModuleRoutes[] = [
    { path: '/users', route: UserRouter },
    { path: '/auth', route: AuthRouter },
];

/**
 * Register Routes
 */
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export const AppRouter = router;
