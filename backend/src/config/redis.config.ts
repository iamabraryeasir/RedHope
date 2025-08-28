/**
 * Node Modules
 */
import { createClient } from 'redis';

/**
 * Local Modules
 */
import config from './index';

/**
 * Configure Redis Client
 */
export const redisClient = createClient({
    username: config.REDIS.USERNAME,
    password: config.REDIS.PASSWORD,
    socket: {
        host: config.REDIS.HOST,
        port: parseInt(config.REDIS.PORT),
    },
});

/**
 * Catch Redis Client Error
 */
redisClient.on('error', (err) => console.log('Redis Client Error', err));

/**
 * Connect To Redis
 */
export const connectToRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        console.log('Connected to Redis.');
    }
};
