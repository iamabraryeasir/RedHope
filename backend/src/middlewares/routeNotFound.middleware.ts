/**
 * Node Modules
 */
import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

/**
 * Logic
 */
export const routeNotFound = (req: Request, res: Response) => {
    res.status(httpCodes.NOT_FOUND).json({
        success: false,
        statusCode: httpCodes.NOT_FOUND,
        message: 'Route Not Found',
        data: null,
    });
};
