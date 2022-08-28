import express from 'express';
import {Order} from '../entities';
import {Dependable} from '../entities/protocols';
import {MiddlewareFuncAsync, Response, ResponseStatusCode} from '../entities/networking';

const OrderController = (dependencies: Dependable<Order>): {
    addOrder: MiddlewareFuncAsync,
    updateOrder: MiddlewareFuncAsync,
    deleteOrder: MiddlewareFuncAsync,
    getOrderById: MiddlewareFuncAsync,
    getAllOrders: MiddlewareFuncAsync
} => {
    const addOrder = async (
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
                status,
                userId,
            } = request.body as Order;

            const addedOrder = await useCase.add(dependencies).execute({id,status,userId});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: addedOrder
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const updateOrder = async (
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
                status,
                userId,
            } = request.body as Order;

            const updatedOrder = await useCase.update(dependencies).execute({id,status,userId});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: updatedOrder
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const deleteOrder = async (
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
                status,
                userId,
            } = request.body as Order;

            const deletedOrder = await useCase.delete(dependencies).execute({id,status,userId});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: deletedOrder
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getOrderById = async (
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

            const returnedOrder = await useCase.getById(dependencies).execute(id);
            if (!returnedOrder) {
                const rejection: Response = {
                    status: ResponseStatusCode.NotFound,
                    message: 'Error getting order',
                    reason: `No order with id ${id}`
                };
                next(rejection);
                return;
            }

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedOrder
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getAllOrders = async (
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

            const returnedOrders = await useCase.getAll(dependencies).execute();

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedOrders
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    return {
        addOrder,
        updateOrder,
        deleteOrder,
        getOrderById,
        getAllOrders
    };
};

export default OrderController;
