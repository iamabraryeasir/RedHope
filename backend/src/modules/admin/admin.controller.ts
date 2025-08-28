/**
 * Node Modules
 */
import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

/**
 * Local Modules
 */
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

/**
 * Get Dashboard Analytics
 */
const getDashboardAnalytics = catchAsync(
    async (req: Request, res: Response) => {
        const analyticsData = await AdminService.getDashboardAnalytics();

        sendResponse(res, {
            statusCode: httpCodes.OK,
            message: 'Dashboard analytics retrieved successfully',
            data: analyticsData,
        });
    },
);

/**
 * Export Controller
 */
export const AdminController = {
    getDashboardAnalytics,
};
