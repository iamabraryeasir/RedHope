/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    IErrorSources,
    IGenericErrorResponse,
} from '../interfaces/error.types';

export const handleZodValidationError = (error: any): IGenericErrorResponse => {
    const errorSources: IErrorSources[] = [];

    error.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        });
    });

    return {
        statusCode: 400,
        message: 'Zod Error',
        errorSources,
    };
};
