import Joi from 'joi';
import {Product} from '../entities';
import {ProductCategory} from '../entities/auxiliary';
import {Response, ResponseStatusCode, ValidationError} from '../entities/networking';
import {BusinessUsable, Dependable} from '../entities/protocols';

const ProductUseCase: BusinessUsable<Product> = {
    add(dependencies: Dependable<Product>): {execute: (product: Product) => Promise<Product | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (product: Product): ValidationError | null=> {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).optional(),
                name: Joi.string().required(),
                description: Joi.string(),
                price: Joi.number().required()
            });

            const result = schema.validate(product);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (product: Product): Promise<Product | null> => {
            const validationError = getValidationErrors(product);
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
                return await repository.add(product);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error adding product',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    update(dependencies: Dependable<Product>): {execute: (product: Product) => Promise<Product | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (product: Product): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).required(),
                name: Joi.string().required(),
                description: Joi.string(),
                price: Joi.number().required()
            });

            const result = schema.validate(product);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (product: Product): Promise<Product | null> => {
            const validationError = getValidationErrors(product);
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
                return await repository.update(product);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error updating product',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    delete(dependencies: Dependable<Product>): {execute: (product: Product) => Promise<Product | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (product: Product): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().guid({version:'uuidv4'}).required(),
                uname: Joi.string().required(),
                description: Joi.string().optional(),
                price: Joi.number().required()
            });

            const result = schema.validate(product);

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (product: Product): Promise<Product | null> => {
            const validationError = getValidationErrors(product);
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
                return await repository.delete(product);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error deleting product',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getById(dependencies: Dependable<Product>): {execute: (id: string) => Promise<Product | null>} {
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

        const execute = async (id: string): Promise<Product | null> => {
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
                    message: (error as Error).message || 'Error getting product by id',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };
        return {execute};
    },
    getAll(dependencies: Dependable<Product>): {execute: () => Promise<Product[] | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passes as a dependency');
        }

        const getValidationErrors = (): ValidationError | null => {
            return null;
        };

        const execute = async (): Promise<Product[] | null> => {
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
                    message: (error as Error).message || 'Error getting product',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    getByCategory(dependencies: Dependable<Product>): {execute: (category: ProductCategory) => Promise<Product[] | null>} {
        const {
            repository
        } = dependencies;

        if (!repository) {
            throw new Error('repository should be passed as a dependency');
        }

        const getValidationErrors = (category: ProductCategory): ValidationError | null => {
            const schema = Joi.object({
                id: Joi.string().alphanum().required(),
                name: Joi.string().alphanum().required()
            });

            const result = schema.validate({
                id: category.id,
                name: category.name
            });

            if (result.error) {
                return {
                    field: result.error.details[0].context?.label,
                    message: result.error.message
                };
            }

            return null;
        };

        const execute = async (category: ProductCategory): Promise<Product[] | null> => {
            const validationError = getValidationErrors(category);
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
                if (!repository.getByCategory) throw new Error();
                return await repository.getByCategory(category);
            } catch (error) {
                // TODO: - Use error tracking (e.g. TrackJS) for error logging
                const rejection: Response = {
                    status: ResponseStatusCode.InternalServerError,
                    message: (error as Error).message || 'Error getting product by category',
                    reason: 'Internal Server Error',
                };
                return Promise.reject(rejection);
            }
        };

        return {execute};
    },
    
};

Object.freeze(ProductUseCase);
export default ProductUseCase;
