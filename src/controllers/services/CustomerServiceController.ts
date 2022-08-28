import express from 'express';
import {User} from '../../entities';
import {MiddlewareFuncAsync} from '../../entities/networking';
import {Dependable} from '../../entities/protocols';

const CustomerServiceController = (dependencies: Dependable<User>): {
    getAccount: MiddlewareFuncAsync,
    updateAccount: MiddlewareFuncAsync,
    deleteAccount: MiddlewareFuncAsync,
    getCart: MiddlewareFuncAsync,
    updateCart: MiddlewareFuncAsync,
    addItemToCart: MiddlewareFuncAsync,
    removeItemFromCart: MiddlewareFuncAsync,
    getOrders: MiddlewareFuncAsync,
    getOrderById: MiddlewareFuncAsync,
    getProducts: MiddlewareFuncAsync,
    getProductCategories: MiddlewareFuncAsync,
    getProductById: MiddlewareFuncAsync,
    getProductsByCategory: MiddlewareFuncAsync
} => {
    const getAccount = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const updateAccount = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const deleteAccount = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getCart = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const updateCart = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const addItemToCart = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const removeItemFromCart = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getOrders = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getOrderById = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getProducts = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getProductCategories = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getProductById = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    const getProductsByCategory = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        return Promise.reject();
    };

    return {
        getAccount,
        updateAccount,
        deleteAccount,
        getCart,
        updateCart,
        addItemToCart,
        removeItemFromCart,
        getOrders,
        getOrderById,
        getProducts,
        getProductCategories,
        getProductById,
        getProductsByCategory
    };
};

export default CustomerServiceController;
