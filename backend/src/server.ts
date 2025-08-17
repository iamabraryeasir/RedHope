/**
 * Local Modules
 */
import app from '@/app';
import config, { NODE_ENV } from '@/config';
import { connectToDatabase, disconnectFromDatabase } from '@/lib/mongoose';
import { seedAdmin } from './utils/seedAdmin';

/**
 * Async IIFE for starting the express server.
 *
 * - Tries to connect to the database before initiating the server
 * - Starts the server in a specific port and logs running URL
 * - if an error occurs during startup, it's logged, and the process exits with status 1
 */
(async () => {
    try {
        await connectToDatabase();

        app.listen(config.PORT, () => {
            console.log(`Server running at port ${config.PORT}`);
        });

        await seedAdmin();
    } catch (error) {
        console.error('Failed to start the server', error);

        if (config.NODE_ENV === NODE_ENV.PRODUCTION) {
            process.exit(1);
        }
    }
})();

/**
 * Handles server shutdown gracefully by disconnecting from the database
 *
 * - Attempts to disconnecting from the database before shutting down the server.
 * - Loges a success message if the disconnection is successful.
 * - If an error occurs during disconnection, it is logged to the console.
 * - Exits the process with status code `0` (indicating a successful shutdown)
 */
const handleServerShutdown = async (signalType: 'SIGINT' | 'SIGTERM') => {
    try {
        await disconnectFromDatabase();

        console.log(`${signalType} signal detected. Shutting down Server`);
        process.exit(0);
    } catch (error) {
        console.warn('Error during server shutdown', error);
    }
};

/**
 * Listens for termination signals (`SIGTERM` and `SIGINT`).
 *
 * - `SIGTERM` is typically sent when stopping a process (e.g. `kill` command or container shutdown)
 * - `SIGINT` is triggered when the user interrupts the process (e.g. pressing `ctrl + c`)
 * - When either signal is received, `handleServerShutdown` is executed to ensure proper cleanup
 */
process.on('SIGTERM', handleServerShutdown);
process.on('SIGINT', handleServerShutdown);
