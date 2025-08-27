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

/**
 * Change Password Validator
 */
export const changePasswordZodValidator = z.object({
    oldPassword: z
        .string()
        .min(8, 'Old password must be at least 8 characters long'),
    newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters long'),
});
