import express from 'express';
import {Product} from '../entities';
import {Dependable} from '../entities/protocols';
import {MiddlewareFuncAsync, Response, ResponseStatusCode} from '../entities/networking';

const ProductController = (dependencies: Dependable<Product>): {
    addProduct: MiddlewareFuncAsync,
    updateProduct: MiddlewareFuncAsync,
    deleteProduct: MiddlewareFuncAsync,
    getProductById: MiddlewareFuncAsync,
    getAllProducts: MiddlewareFuncAsync
} => {
    const addProduct = async (
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

        try {
            const {
                id,
                name,
                description,
                price,
            } = request.body as Product;

            const addedProduct = await useCase.add(dependencies).execute({id,name,description,price});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: addedProduct
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const updateProduct = async (
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

        try {
            const {
                id,
                name,
                description,
                price,
            } = request.body as Product;

            const updatedProduct = await useCase.update(dependencies).execute({id,name,description,price});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: updatedProduct
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const deleteProduct = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        const {
            useCase
        } = dependencies;

        if (!useCase) {
            throw new Error('use-case should be passed as s dependency');
        }

        try {
            const {
                id,
                name,
                description,
                price
            } = request.body as Product;

            const deletedProduct = await useCase.delete(dependencies).execute({id,name,description,price});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: deletedProduct
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getProductById = async (
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

        try {
            const id = request.params.id as string;

            const returnedProduct = await useCase.getById(dependencies).execute(id);
            if (!returnedProduct) {
                const rejection: Response = {
                    status: ResponseStatusCode.NotFound,
                    message: 'Error getting product',
                    reason: `No product with id ${id}`
                };
                next(rejection);
                return;
            }

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedProduct
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getAllProducts = async (
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

        try {
            // TODO: check user access credentials

            const returnedProducts = await useCase.getAll(dependencies).execute();

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedProducts
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    return {
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getAllProducts
    };
};

export default ProductController;
