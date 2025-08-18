/**
 * Node Modules
 */
import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';

/**
 * Middleware Logic
 */
export const validateRequest =
    (zodSchema: ZodObject) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body?.data) {
                req.body = JSON.parse(req.body?.data);
            }
            req.body = await zodSchema.parseAsync(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
