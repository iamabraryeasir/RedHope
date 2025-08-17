/**
 * Node Modules
 */
import { NextFunction, Request, Response } from 'express';

/**
 * Local Modules
 */
import { logger } from '@/lib/winston';

/**
 * Types
 */
type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<void>;

/**
 * Logic
 */
export const catchAsync =
    (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            logger.warn(error);
            next(error);
        });
    };
