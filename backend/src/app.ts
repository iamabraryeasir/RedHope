/**
 * Node Modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

/**
 * Local Modules
 */
import config, { NODE_ENV } from './config';
import limiter from './lib/express_rate_limit';
import { AppRouter } from './routes/v1';
import { routeNotFound } from './middlewares/routeNotFound.middleware';

/**
 * Types
 */
import type { CorsOptions } from 'cors';
import { globalErrorHandler } from './middlewares/globalErrorHandler.middleware';

/**
 * Express App Initial
 */
const app = express();

/**
 * Trust Proxy
 */
if (config.NODE_ENV === NODE_ENV.PRODUCTION) {
    app.set('trust proxy', true);
}

/**
 * CORS Middleware Apply
 */
const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (
            config.NODE_ENV === NODE_ENV.DEVELOPMENT ||
            !origin ||
            config.WHITELIST_ORIGINS.includes(origin)
        ) {
            callback(null, true);
        } else {
            // reject request from non-whitelisted origins
            callback(new Error(`CORS Error: ${origin} is not allowed`), false);
            console.warn(`CORS Error: ${origin} is not allowed`);
        }
    },
};

app.use(cors(corsOptions));

/**
 * Enable JSON and URL Encoded request body parsing
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Enable cookie parser for reding request cookie
 */
app.use(cookieParser());

/**
 * Enable response compression to reduce payload size and improve performance
 */
app.use(
    compression({
        threshold: 1024, // only compress responses larger then 1KB
    }),
);

/**
 * Enable Helmet for enhancing security by setting various http headers
 */
app.use(helmet());

/**
 * Enable rate limiting middleware for preventing excessive requests and enhance security
 */
app.use(limiter);

/**
 * Add v1 routes
 */
app.use('/api/v1', AppRouter);

/**
 * Global Error Handler
 */
app.use(globalErrorHandler);

/**
 * Not Found Route
 */
app.use(routeNotFound);

export default app;
