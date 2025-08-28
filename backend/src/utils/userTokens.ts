/**
 * Node Modules
 */
import { JwtPayload } from 'jsonwebtoken';
import httpCodes from 'http-status-codes';

/**
 * Local Modules
 */
import config from '../config';
import { User } from '../modules/user/user.model';
import { AppError } from '../errorHelpers/AppError';
import { generateJwtToken, verifyJwtToken } from './jwt';
import { IUser } from '../modules/user/user.interface';

/**
 * Function for creating access and refresh token in the login
 */
export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    // generate access token
    const accessToken = generateJwtToken(
        jwtPayload,
        config.JWT.ACCESS_SECRET,
        config.JWT.ACCESS_EXPIRE,
    );

    // generate refresh token
    const refreshToken = generateJwtToken(
        jwtPayload,
        config.JWT.REFRESH_SECRET,
        config.JWT.REFRESH_EXPIRE,
    );

    return { accessToken, refreshToken };
};

/**
 * Function for generating new access token from refresh token
 */
export const createNewAccessTokenWithRefreshToken = async (
    refreshToken: string,
) => {
    const verifiedRefreshToken = verifyJwtToken(
        refreshToken,
        config.JWT.REFRESH_SECRET,
    ) as JwtPayload;

    const isUserExists = await User.findOne({
        email: verifiedRefreshToken.email,
    });

    if (!isUserExists) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User does not exist');
    }

    if (isUserExists.isDeleted) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User is deleted');
    }

    if (isUserExists.isBlocked) {
        throw new AppError(httpCodes.BAD_REQUEST, 'User is blocked');
    }

    const jwtPayload = {
        userId: isUserExists._id,
        email: isUserExists.email,
        role: isUserExists.role,
    };

    const accessToken = generateJwtToken(
        jwtPayload,
        config.JWT.ACCESS_SECRET,
        config.JWT.ACCESS_EXPIRE,
    );
    return accessToken;
};
