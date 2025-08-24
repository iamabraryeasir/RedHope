/**
 * Node Modules
 */
import 'dotenv/config';

/**
 * Types
 */
export enum NODE_ENV {
    DEVELOPMENT = 'DEVELOPMENT',
    PRODUCTION = 'PRODUCTION',
}

interface IConfig {
    PORT: number;
    NODE_ENV: NODE_ENV;
    WHITELIST_ORIGINS: string[];
    ADMIN: {
        EMAIL: string;
        PASSWORD: string;
    };
    MONGODB: {
        URI: string;
        NAME: string;
        APP_NAME: string;
    };
    LOG_LEVEL: string;
    JWT: {
        ACCESS_SECRET: string;
        ACCESS_EXPIRE: string;
        REFRESH_SECRET: string;
        REFRESH_EXPIRE: string;
        RESET_PASSWORD_SECRET: string;
    };
    BCRYPT_SALT_ROUND: number;
    EMAIL_SENDER: {
        SMTP_HOST: string;
        SMTP_PORT: number;
        SMTP_USER: string;
        SMTP_PASS: string;
        SMTP_FROM: string;
    };
    REDIS: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: string;
    };
    FRONTEND_URL: string;
}

/**
 * Env variable loader with required check
 */
const loadConfigVariable = (): IConfig => {
    // list all required env variable
    const requiredEnvVariable: string[] = [
        'PORT',
        'NODE_ENV',
        'ADMIN_EMAIL',
        'ADMIN_PASSWORD',
        'WHITELIST_ORIGINS',
        'MONGODB_URI',
        'MONGODB_NAME',
        'MONGODB_APP_NAME',
        'JWT_ACCESS_SECRET',
        'JWT_ACCESS_EXPIRE',
        'JWT_REFRESH_SECRET',
        'JWT_REFRESH_EXPIRE',
        'JWT_RESET_PASSWORD_SECRET',
        'BCRYPT_SALT_ROUND',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'SMTP_FROM',
        'REDIS_USERNAME',
        'REDIS_PASSWORD',
        'REDIS_HOST',
        'REDIS_PORT',
        'FRONTEND_URL',
    ];

    // throw error if any required env variable is not found
    requiredEnvVariable.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable ${key}`);
        }
    });

    // return the main config object
    return {
        PORT: Number(process.env.PORT) || 5000,
        NODE_ENV: process.env.NODE_ENV as NODE_ENV,
        WHITELIST_ORIGINS: (process.env.WHITELIST_ORIGINS as string)?.split(
            ',',
        ),
        ADMIN: {
            EMAIL: process.env.ADMIN_EMAIL as string,
            PASSWORD: process.env.ADMIN_PASSWORD as string,
        },
        MONGODB: {
            URI: process.env.MONGODB_URI as string,
            NAME: process.env.MONGODB_NAME as string,
            APP_NAME: process.env.MONGODB_APP_NAME as string,
        },
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        JWT: {
            ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
            ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
            REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
            REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
            RESET_PASSWORD_SECRET: process.env
                .JWT_RESET_PASSWORD_SECRET as string,
        },
        BCRYPT_SALT_ROUND: Number(process.env.BCRYPT_SALT_ROUND),
        REDIS: {
            USERNAME: process.env.REDIS_USERNAME as string,
            PASSWORD: process.env.REDIS_PASSWORD as string,
            HOST: process.env.REDIS_HOST as string,
            PORT: process.env.REDIS_PORT as string,
        },
        EMAIL_SENDER: {
            SMTP_USER: process.env.SMTP_USER as string,
            SMTP_PASS: process.env.SMTP_PASS as string,
            SMTP_PORT: Number(process.env.SMTP_PORT),
            SMTP_HOST: process.env.SMTP_HOST as string,
            SMTP_FROM: process.env.SMTP_FROM as string,
        },
        FRONTEND_URL: process.env.FRONTEND_URL as string,
    };
};

/**
 * Config object
 */
const config: IConfig = loadConfigVariable();

export default Object.freeze(config);
