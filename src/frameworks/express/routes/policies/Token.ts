import express from 'express';
import jwt from 'jsonwebtoken';
import vars from '../../../../config/vars';
import {User} from '../../../../entities';
import {UserLevel} from '../../../../entities/enums';
import {Response, ResponseStatusCode, TokenType} from '../../../../entities/networking';

const checkToken = (ofType: TokenType, withToken: string): jwt.JwtPayload | string | null => {
    const secret = ofType === TokenType.Access ? vars.accessSecret : vars.refreshSecret;
    try {
        const decoded: jwt.JwtPayload | string = jwt.verify(withToken, secret);
        return decoded;
    } catch (_) {
        return null;
    }
};

const handleUnauthorizedAccess = (response: express.Response): void => {
    const json: Response = {
        status: ResponseStatusCode.NotFound,
        error: 'Resource Not Found'
    };
    response.status(ResponseStatusCode.NotFound);
    response.json(json);
};

const Token = (
    userLevel: UserLevel
): {policy: (request: express.Request, response: express.Response, next: express.NextFunction) => void} => {
    const policy = (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void => {
        const accessToken = request.cookies[TokenType.Access] as string;
        if (!accessToken) {
            handleUnauthorizedAccess(response);
            return;
        }

        const userWithAccess = checkToken(TokenType.Access, accessToken) as User;
        if (!userWithAccess) {
            const refreshToken = request.cookies[TokenType.Refresh] as string;
            if (!refreshToken) {
                handleUnauthorizedAccess(response);
                return;
            }

            const userWithSession = checkToken(TokenType.Refresh, refreshToken) as User;
            if (!userWithSession) {
                handleUnauthorizedAccess(response);
                return;
            }

            // TODO: - Redirect user to refresh endpoint to get new tokens
            return;
        }

        if (userWithAccess.level !== userLevel) {
            console.log('USER DOESNT HAVE ACCESS RIGHTS...');
            handleUnauthorizedAccess(response);
            return;
        }
        next();
    };

    return {policy};

};

export default Token;
