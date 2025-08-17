/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import {
    IErrorSources,
    IGenericErrorResponse,
} from '../interfaces/error.types';

export const handleMongooseValidationError = (
    error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
    const errorSources: IErrorSources[] = [];

    const errors = Object.values(error.errors);
    errors.forEach((errorObject: any) =>
        errorSources.push({
            path: errorObject.path,
            message: errorObject.message,
        })
    );

    return {
        statusCode: 400,
        message: 'Validation error',
        errorSources,
    };
};
