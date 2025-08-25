/**
 * Node Modules
 */
import { z } from 'zod';

/**
 * Local Modules
 */
import { BLOOD_GROUP } from '@/modules/user/user.interface';
import {
    REQUEST_STATUS,
    URGENCY,
} from '@/modules/blood-request/blood-request.interface';

/**
 * Create Blood Request Schema
 */
export const createBloodRequestSchema = z.object({
    patientName: z.string().trim().min(1),
    bloodGroup: z.nativeEnum(BLOOD_GROUP),
    unitsNeeded: z.number().int().min(1).max(6).default(1),
    urgency: z.nativeEnum(URGENCY).default(URGENCY.NORMAL),
    reasonOfRequest: z.string().trim().min(3).max(1000),

    hospitalName: z.string().trim().min(1),
    hospitalAddress: z.string().trim().default(''),
    hospitalCity: z.string().trim().min(1),
    hospitalDistrict: z.string().trim().min(1),

    contactPhone: z.string().regex(/^(\+?88)?01[3-9]\d{8}$/),
    altContactPhone: z
        .string()
        .regex(/^(\+?88)?01[3-9]\d{8}$/)
        .optional(),

    neededBy: z.coerce.date(),
    expiresAt: z.coerce.date().optional(),
});

/**
 * Update Blood Request Schema
 */
export const updateBloodRequestSchema = z.object({
    patientName: z.string().trim().min(1).optional(),
    bloodGroup: z.nativeEnum(BLOOD_GROUP).optional(),
    unitsNeeded: z.number().int().min(1).max(6).optional(),
    urgency: z.nativeEnum(URGENCY).optional(),
    reasonOfRequest: z.string().trim().min(3).max(1000).optional(),

    hospitalName: z.string().trim().optional(),
    hospitalAddress: z.string().trim().optional(),
    hospitalCity: z.string().trim().optional(),
    hospitalDistrict: z.string().trim().optional(),

    contactPhone: z
        .string()
        .regex(/^(\+?88)?01[3-9]\d{8}$/)
        .optional(),
    altContactPhone: z
        .string()
        .regex(/^(\+?88)?01[3-9]\d{8}$/)
        .optional(),

    neededBy: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
    status: z.nativeEnum(REQUEST_STATUS).optional(),
});
