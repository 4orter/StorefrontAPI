import Joi from 'joi';
import {Order} from '../entities';
import {Response, ResponseStatusCode, ValidationError} from '../entities/networking';
import {BusinessUsable, Dependable} from '../entities/protocols';

const OrderUseCase: BusinessUsable<Order> = {
    add(dependencies: Dependable<Order>): {execute: (order: Order) => Promise<Order | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (order: Order): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().optional(),
                status: Joi.string().alphanum().length(1).required(),
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });

            const result = schema.validate(order);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (order: Order): Promise<Order | null> => {
            const validationError = getValidationErrors(order);
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
                return await repository.add(order);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error adding order',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    update(dependencies: Dependable<Order>): {execute: (order: Order) => Promise<Order | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (order: Order): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().required(),
                status: Joi.string().alphanum().length(1).required(),
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });

            const result = schema.validate(order);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (order: Order): Promise<Order | null> => {
            const validationError = getValidationErrors(order);
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
                return await repository.update(order);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error updating order',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    delete(dependencies: Dependable<Order>): {execute: (order: Order) => Promise<Order | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (order: Order): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.number().required(),
                status: Joi.string().alphanum().length(1).required(),
                userId: Joi.string().guid({version:'uuidv4'}).required()
            });

            const result = schema.validate(order);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (order: Order): Promise<Order | null> => {
            const validationError = getValidationErrors(order);
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
                return await repository.delete(order);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error deleting order',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getById(dependencies: Dependable<Order>): {execute: (id: string) => Promise<Order | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (id: string): ValidationError | null => {

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

        const execute = async (id: string): Promise<Order | null> => {
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
                    message: (error as Error).message || 'Error getting order by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };
        return {execute};
    },
    getAll(dependencies: Dependable<Order>): {execute: () => Promise<Order[] | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (): ValidationError | null => {
            return null;
        };

        const execute = async (): Promise<Order[] | null> => {
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
                    message: (error as Error).message || 'Error getting order',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    }
};

Object.freeze(OrderUseCase);
export default OrderUseCase;
