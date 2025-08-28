/**
 * Node Modules
 */
import { NextFunction, Request, Response } from 'express';

/**
 * Local Modules
 */
import config, { NODE_ENV } from '../config';
import { AppError } from '../errorHelpers/AppError';

/**
 * Error Handlers
 */
import { handleDuplicateError } from '../errorHelpers/handleDuplicateError';
import { handleCastError } from '../errorHelpers/handleCastError';
import { handleZodValidationError } from '../errorHelpers/handleZodValidationError';
import { handleMongooseValidationError } from '../errorHelpers/handleMongooseValidationError';
import { IErrorSources } from '../interfaces/error.types';

/**
 * Middleware Logic
 */
export const globalErrorHandler = async (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let statusCode = 500;
    let message = error?.message || 'Something went wrong';
    let errorSources: IErrorSources[] = [];

    if (error.code === 11000) {
        /**
         * user already exists error
         */
        const simplifiedError = handleDuplicateError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } else if (error.name === 'CastError') {
        /**
         * Mongo type cast error
         */
        const simplifiedError = handleCastError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    } else if (error.name === 'ZodError') {
        /**
         * Zod validation error
         */
        const simplifiedError = handleZodValidationError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as IErrorSources[];
    } else if (error.name === 'ValidationError') {
        /**
         * Mongoose validation error
         */
        const simplifiedError = handleMongooseValidationError(error);

        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources as IErrorSources[];
    } else if (error instanceof AppError) {
        /**
         * Our local custom error
         */
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        /**
         * Inbuilt node error
         */
        message = error.message;
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSources,
        error: config.NODE_ENV === NODE_ENV.DEVELOPMENT ? error : null,
        stack: config.NODE_ENV === NODE_ENV.DEVELOPMENT ? error.stack : null,
    });
};
