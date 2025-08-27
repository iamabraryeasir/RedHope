import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export const generateJwtToken = (
    payload: JwtPayload,
    secret: string,
    expiresIn: string,
): string => {
    const options: SignOptions = {
        expiresIn: expiresIn?.trim() as SignOptions['expiresIn'],
    };

    const token: string = jwt.sign(payload, secret, options);
    return token;
};

export const verifyJwtToken = (token: string, secret: string) => {
    const verifiedTokenData = jwt.verify(token, secret);
    return verifiedTokenData;
};
