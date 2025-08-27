/**
 * Node Modules
 */
import { z } from 'zod';
import { GENDER, BLOOD_GROUP } from './user.interface';

/**
 * Register User Validation Schema
 */
export const registerZodValidator = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.email('Invalid email address'),
    phoneNumber: z
        .string()
        .regex(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    bloodGroup: z.enum(BLOOD_GROUP),
    gender: z.enum(GENDER),
    dateOfBirth: z.string().transform((str) => new Date(str)),
    district: z.string().min(2, 'District is required'),
    city: z.string().min(2, 'City is required'),
    thana: z.string().optional(),
});
