import express from 'express';
import {User} from '../entities';
import {Dependable} from '../entities/protocols';
import {MiddlewareFuncAsync, Response, ResponseStatusCode} from '../entities/networking';

const UserController = (dependencies: Dependable<User>): {
    addUser: MiddlewareFuncAsync,
    updateUser: MiddlewareFuncAsync,
    deleteUser: MiddlewareFuncAsync,
    getUserById: MiddlewareFuncAsync,
    getUserByUsername: MiddlewareFuncAsync,
    getAllUsers: MiddlewareFuncAsync
} => {
    const addUser = async (
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
                username,
                password,
                firstName,
                lastName,
                level
            } = request.body as User;

            const addedUser = await useCase.add(dependencies).execute({id,username,password,firstName,lastName,level});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: addedUser
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const updateUser = async (
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
                username,
                password,
                firstName,
                lastName,
                level
            } = request.body as User;

            const updatedUser = await useCase.update(dependencies).execute({id,username,password,firstName,lastName,level});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: updatedUser
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const deleteUser = async (
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
                username,
                password,
                firstName,
                lastName,
                level
            } = request.body as User;

            const deletedUser = await useCase.delete(dependencies).execute({id,username,password,firstName,lastName,level});

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: deletedUser
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getUserById = async (
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

            const returnedUser = await useCase.getById(dependencies).execute(id);
            if (!returnedUser) {
                const rejection: Response = {
                    status: ResponseStatusCode.NotFound,
                    message: 'Error getting user',
                    reason: `No user with id ${id}`
                };
                next(rejection);
                return;
            }

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedUser
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getUserByUsername = async (
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
            const username = request.params.username as string;

            if (!useCase.getByUsername) throw new Error('Internal Server Error');
            const returnedUser = await useCase.getByUsername(dependencies).execute(username);
            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedUser
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    const getAllUsers = async (
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

            const returnedUsers = await useCase.getAll(dependencies).execute();

            const json: Response = {
                status: ResponseStatusCode.OK,
                message: returnedUsers
            };
            response.json(json);
        } catch (error) {
            next(error);
        }
    };

    return {
        addUser,
        updateUser,
        deleteUser,
        getUserById,
        getUserByUsername,
        getAllUsers
    };
};

export default UserController;
