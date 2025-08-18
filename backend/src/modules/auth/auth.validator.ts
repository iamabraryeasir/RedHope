/**
 * Node Modules
 */
import { email, z } from 'zod';

/**
 * Login Validator
 */
export const loginZodValidator = z.object({
    email: z.email('Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});
