import Joi from 'joi';
import {User} from '../entities';
import {BusinessUsable, Dependable} from '../entities/protocols';
import {Response, ResponseStatusCode, ValidationError} from '../entities/networking';
import {UserSession} from '../entities/auxiliary';

const UserUseCase: BusinessUsable<User> = {
    add(dependencies: Dependable<User>): {execute: (user: User) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (user: User): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).optional(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                firstName: Joi.string().optional(),
                lastName: Joi.string().optional(),
                level: Joi.number().min(0).max(1).required()
            });

            const result = schema.validate(user);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (user: User): Promise<User | null> => {
            const validationError = getValidationErrors(user);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                return await repository.add(user);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    update(dependencies: Dependable<User>): {execute: (user: User) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (user: User): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                firstName: Joi.string().optional(),
                lastName: Joi.string().optional(),
                level: Joi.number().min(0).max(1).required()
            });

            const result = schema.validate(user);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (user: User): Promise<User | null> => {
            const validationError = getValidationErrors(user);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                return await repository.update(user);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    delete(dependencies: Dependable<User>): {execute: (user: User) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (user: User): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                firstName: Joi.string().optional(),
                lastName: Joi.string().optional(),
                level: Joi.number().min(0).max(1).required()
            });

            const result = schema.validate(user);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (user: User): Promise<User | null> => {
            const validationError = getValidationErrors(user);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                return await repository.delete(user);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getById(dependencies: Dependable<User>): {execute: (id: string) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (id: string): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).required(),
            });

            const result = schema.validate({id});

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (id: string): Promise<User | null> => {
            const validationError = getValidationErrors(id);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                return await repository.getById(id);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };
        return {execute};
    },
    getByUsername(dependencies: Dependable<User>): {execute: (username: string) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (username: string): ValidationError | null => {
            const schema = Joi.object({
                username: Joi.string().required()
            });

            const result = schema.validate({username});

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (username: string): Promise<User | null> => {
            const validationError = getValidationErrors(username);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                if (!repository.getByUsername) throw new Error();
                return await repository.getByUsername(username);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user by username',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };
        return {execute};
    },
    getAll(dependencies: Dependable<User>): {execute: () => Promise<User[] | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (): ValidationError | null => {
            return null;
        };

        const execute = async (): Promise<User[] | null> => {
            const validationError = getValidationErrors();
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                return await repository.getAll();
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting users',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    authenticate(dependencies: Dependable<User>): {execute: (username: string, password: string) => Promise<User | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (username: string, password: string): ValidationError | null => {
            const schema = Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            });

            const result = schema.validate({username,password});

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (username: string, password: string): Promise<User | null> => {
            const validationError = getValidationErrors(username, password);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };

                return Promise.reject(rejection);
            }

            try {
                if (!repository.authenticate) throw new Error();
                return await repository.authenticate(username, password);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error authenticating user',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    addSession(dependencies: Dependable<User>): {execute: (session: UserSession) => Promise<UserSession | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (session: UserSession): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().optional(),
                secret: Joi.string().regex(/^(?:[\w-]*\.){2}[\w-]*$/).required(),
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });
            const result = schema.validate(session);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }
            return null;
        };

        const execute = async (session: UserSession): Promise<UserSession | null> => {
            const validationError = getValidationErrors(session);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };
                return Promise.reject(rejection);
            }

            try {
                if (!repository.addSession) throw new Error();
                return await repository.addSession(session);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error adding session',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    deleteSession(dependencies: Dependable<User>): {execute: (session: UserSession) => Promise<UserSession | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (session: UserSession): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().optional(),
                secret: Joi.string().regex(/^(?:[\w-]*\.){2}[\w-]*$/).required(),
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });
            const result = schema.validate(session);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }
            return null;
        };

        const execute = async (session: UserSession): Promise<UserSession | null> => {
            const validationError = getValidationErrors(session);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };
                return Promise.reject(rejection);
            }

            try {
                if (!repository.deleteSession) throw new Error();
                return await repository.deleteSession(session);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error deleting session',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getSessionById(dependencies: Dependable<User>): {execute: (id: number) => Promise<UserSession | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (id: number): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().required(),
            });
            const result = schema.validate({id});

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }
            return null;
        };

        const execute = async (id: number): Promise<UserSession | null> => {
            const validationError = getValidationErrors(id);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };
                return Promise.reject(rejection);
            }

            try {
                if (!repository.getSessionById) throw new Error();
                return await repository.getSessionById(id);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting session by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getSessionByUserId(dependencies: Dependable<User>): {execute: (userId: string) => Promise<UserSession | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (userId: string): ValidationError | null => {
            const schema = Joi.object({
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });
            const result = schema.validate({userId});

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }
            return null;
        };

        const execute = async (userId: string): Promise<UserSession | null> => {
            const validationError = getValidationErrors(userId);
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };
                return Promise.reject(rejection);
            }

            try {
                if (!repository.getSessionByUserId) throw new Error();
                return await repository.getSessionByUserId(userId);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting session by user id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getAllSessions(dependencies: Dependable<User>): {execute: () => Promise<UserSession[] | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (): ValidationError | null => {
            return null;
        };

        const execute = async (): Promise<UserSession[] | null> => {
            const validationError = getValidationErrors();
            if (validationError) {
                const rejection: Response = {
                    status: ResponseStatusCode.BadRequest,
                    message: 'Validation Error',
                    reason: 'Bad Request Sent',
                    validationError
                };
                return Promise.reject(rejection);
            }

            try {
                if (!repository.getAllSessions) throw new Error();
                return await repository.getAllSessions();
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting user sessions',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    }
};

Object.freeze(UserUseCase);
export default UserUseCase;
