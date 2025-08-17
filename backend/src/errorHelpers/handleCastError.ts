/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/error.types';

export const handleCastError = (
    error: mongoose.Error.CastError
): IGenericErrorResponse => {
    return {
        statusCode: 400,
        message: 'Invalid Mongodb ObjectID',
    };
};
