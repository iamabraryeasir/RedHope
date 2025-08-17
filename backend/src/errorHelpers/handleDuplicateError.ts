/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorResponse } from '../interfaces/error.types';

export const handleDuplicateError = (error: any): IGenericErrorResponse => {
    const matchedArray = error.message.match(/"([^"]*)"/);

    return {
        statusCode: 400,
        message: `${matchedArray?.[0]} already exists`,
    };
};
