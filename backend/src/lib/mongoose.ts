/**
 * Node Modules
 */
import mongoose from 'mongoose';

/**
 * Local Modules
 */
import config from '../config';

/**
 * Types
 */
import type { ConnectOptions } from 'mongoose';

/**
 * Client options
 */
const clientOptions: ConnectOptions = {
    dbName: config.MONGODB.NAME,
    appName: config.MONGODB.APP_NAME,
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    },
};

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * If an error occurs during the connection process, it throws an error with a descriptive message.
 *
 * - Uses `MONGODB_URI` as the connection string.
 * - `clientOptions` contains additional configuration for Mongoose.
 * - Errors are properly handled and rethrown for better debugging.
 */
export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.MONGODB.URI, clientOptions);
        console.log('Successfully connected to Database', {
            uri: config.MONGODB.URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        console.warn('Error connecting to Database', error);
    }
};

/**
 * Disconnects from the MongoDB database using Mongoose.
 * This function attempts to disconnect from the database asynchronously.
 * If the disconnection is successful, a success message is togged.
 * If an error occurs, it is either re-thrown as a new Error (if it's an instance of Error)
 * or logged to the console.
 */
export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Successfully disconnected from the Database', {
            uri: config.MONGODB.URI,
            options: clientOptions,
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.warn('Error disconnecting from Database');
    }
};
