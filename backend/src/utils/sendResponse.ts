/**
 * Node Modules
 */
import { Response } from 'express';

/**
 * Types
 */
interface TMeta {
    total?: number;
    page?: number;
    limit?: number;
    totalPage?: number;
    from?: Date;
    to?: Date;
}

interface TResponse<T> {
    statusCode: number;
    success?: boolean;
    message: string;
    data: T;
    meta?: TMeta;
}

/**
 * Response Logic
 */
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success === false ? false : true,
        message: data.message,
        data: data.data,
        meta: data.meta,
    });
};

export default sendResponse;
