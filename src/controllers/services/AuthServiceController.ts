import express from 'express';
import jwt from 'jsonwebtoken';
import vars from '../../config/vars';
import {User} from '../../entities';
import {MiddlewareFuncAsync, Response, ResponseStatusCode, TokenType} from '../../entities/networking';
import {Dependable} from '../../entities/protocols';

const generateToken = (type: TokenType, payload: User): string => {
    const secret = type === TokenType.Access ? vars.accessSecret : vars.refreshSecret;
    const expiration = type === TokenType.Access ? '1h' : '30d';

    return jwt.sign({...payload}, secret, {expiresIn: expiration});
};

const checkToken = (type: TokenType, token: string): jwt.JwtPayload | string | null => {
    const secret = type === TokenType.Access ? vars.accessSecret : vars.refreshSecret;
    try {
        const decoded: jwt.JwtPayload | string = jwt.verify(token, secret);
        return decoded;
    } catch (_) {
        return null;
    }
};

const AuthServiceController = (dependencies: Dependable<User>): {
    signUp: MiddlewareFuncAsync,
    signIn: MiddlewareFuncAsync,
    signOut: MiddlewareFuncAsync
} => {
    const signUp = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        const {
            useCase
        } = dependencies;

        if (!useCase) {
            throw new Error('use-case should be passed as a dependency');
        }

        const sessionToken = request.cookies[TokenType.Refresh] as string;
        if (sessionToken) {
            const user = checkToken(TokenType.Refresh, sessionToken) as User;
            if (user) {
                try {
                    if (!useCase.getSessionByUserId) throw new Error();
                    const session = await useCase.getSessionByUserId(dependencies).execute((user.id as string));
                    if (session) {
                        const rejection: Response = {
                            status: ResponseStatusCode.Unauthorized,
                            message: 'Error signing up',
                            reason: 'You are already signed in. Please sign out before taking this action'
                        };
                        next(rejection);
                        return;
                    }
                } catch (error) {
                    const rejection: Response = {
                        status: ResponseStatusCode.Unauthorized,
                        message: 'Error signing up',
                        reason: 'Unknown Server Error'
                    };
                    next(rejection);
                    return;
                }
            }
        }

        try {
            const {
                username,
                password,
                firstName,
                lastName,
            } = request.body;

            if (!useCase.getByUsername) {
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: 'Error with user sign up',
                    reason: 'Internal Server Error'
                };
                next(rejection);
                return;
            }

            const optionalUser = await useCase.getByUsername(dependencies).execute(username);

            if (optionalUser) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Error with user sign up',
                    reason: 'Username is already taken'
                };
                next(rejection);
                return;
            }

            const addedUser = await useCase.add(dependencies).execute({username,password,firstName,lastName,level:0}) as User;

            if (!(addedUser && useCase.addSession)) {
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: 'Error with user sign up',
                    reason: 'Unknown Server Error',
                };
                next(rejection);
                return;
            }

            const accessToken = generateToken(TokenType.Access, addedUser);
            const refreshToken = generateToken(TokenType.Refresh, addedUser);
            await useCase.addSession(dependencies).execute({secret:refreshToken,userId:(addedUser.id as string)});

            // NOTE: - In a production environment, we'd want to add the "secure" and "sameSite" flags
            response.cookie(TokenType.Access, accessToken, {
                maxAge: 3.6e6,
                httpOnly: true,
            });
            response.cookie(TokenType.Refresh, refreshToken, {
                maxAge: 2.592e9,
                httpOnly: true
            });

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: `Welcome ${addedUser.username}! You are now signed up.`
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const signIn = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        const {
            useCase
        } = dependencies;

        if (!useCase) {
            throw new Error('use-case should be passed as a dependency');
        }

        const sessionToken = request.cookies[TokenType.Refresh] as string;
        if (sessionToken) {
            const user = checkToken(TokenType.Refresh, sessionToken) as User;
            if (user) {
                try {
                    if (!useCase.getSessionByUserId) throw new Error();
                    const session = await useCase.getSessionByUserId(dependencies).execute((user.id as string));
                    if (session) {
                        const rejection: Response = {
                            status: ResponseStatusCode.Unauthorized,
                            message: 'Error signing in',
                            reason: 'You are already signed in. Please sign out before taking this action'
                        };
                        next(rejection);
                        return;
                    }
                } catch (error) {
                    const rejection: Response = {
                        status: ResponseStatusCode.Unauthorized,
                        message: 'Error signing in',
                        reason: 'Unknown Server Error'
                    };
                    next(rejection);
                    return;
                }
            }
        }

        try {
            const {
                username,
                password
            } = request.body;

            if (!useCase.authenticate) throw new Error('Internal Server Error');
            const signedInUser = await useCase.authenticate(dependencies).execute(username,password);
            if (!(signedInUser)) {
                const rejection: Response = {
                    status: ResponseStatusCode.Unauthorized,
                    message: 'Error signing in user',
                    reason: 'Invalid username or password',
                };
                next(rejection);
                return;
            }

            if (!(useCase.getSessionByUserId && useCase.addSession && useCase.deleteSession)) throw new Error('Internal Server Error');
            // Check if user already has session (e.g., User clears cookies but doesn't directly sign out)
            const session = await useCase.getSessionByUserId(dependencies).execute((signedInUser.id as string));
            if (session) await useCase.deleteSession(dependencies).execute(session);

            const accessToken = generateToken(TokenType.Access, signedInUser);
            const refreshToken = generateToken(TokenType.Refresh, signedInUser);

            await useCase.addSession(dependencies).execute({secret: refreshToken, userId: (signedInUser.id as string)});

            // NOTE: - In a production environment, we'd want to add the "secure" and "sameSite" flags
            response.cookie(TokenType.Access, accessToken, {
                maxAge: 3.6e6,
                httpOnly: true,
            });
            response.cookie(TokenType.Refresh, refreshToken, {
                maxAge: 2.592e9,
                httpOnly: true
            });

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: `Welcome ${signedInUser.username}! You are signed in.`
            };
            response.status(ResponseStatusCode.OK);
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const signOut = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        const {
            useCase
        } = dependencies;

        if (!useCase) {
            throw new Error('use-case should be passed as a dependency');
        }

        const accessToken = request.cookies[TokenType.Access] as string;
        const refreshToken = request.cookies[TokenType.Refresh] as string;
        // At least have a valid session token
        const user = checkToken(TokenType.Refresh, refreshToken) as User;
        if (!(accessToken && refreshToken && user)) {
            next();
            return;
        }

        try {
            if (!useCase.deleteSession) throw new Error('Internal Server Error');
            await useCase.deleteSession(dependencies).execute({secret:refreshToken,userId:(user.id as string)});
            response.clearCookie(TokenType.Access);
            response.clearCookie(TokenType.Refresh);

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: `You have successfully signed out! See you soon ${user.username}!`
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    return {
        signUp,
        signIn,
        signOut
    };
};

export default AuthServiceController;
