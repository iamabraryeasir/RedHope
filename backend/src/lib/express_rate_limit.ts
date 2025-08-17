/**
 * Node Modules
 */
import { rateLimit } from 'express-rate-limit';

/**
 * Configure rate limiting middleware for preventing abuse
 */
const limiter = rateLimit({
    windowMs: 1000 * 60, // 1 minute
    limit: 60, // allow 60 requests per window per IP
    standardHeaders: 'draft-8', // latest standard rate limit headers
    legacyHeaders: false, // disable deprecated X-RateLimit headers
    message: {
        error: 'You have sent too many requests in a given time. Please try again later.',
    },
});

export default limiter;
