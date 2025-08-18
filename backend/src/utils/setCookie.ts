/**
 * Node Modules
 */
import { Response } from 'express';

/**
 * Local Modules
 */

/**
 * Prop Interface
 */
export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

/**
 * setAuthCookie util logic
 */
export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
    }

    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
    }
};
