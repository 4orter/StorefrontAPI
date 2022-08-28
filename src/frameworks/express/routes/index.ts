import express from 'express';
import {Configuration} from '../../../entities/config';
import {UserLevel} from '../../../entities/enums';
import {Token} from './policies';
import {AuthRouter} from './services';
import UsersRouter from './UsersRouter';
import ProductsRouter from './ProductsRouter';


const routes = (dependencies: Configuration): express.Router => {
    const router = express.Router();

    router.use('/', AuthRouter({
        repository: dependencies.repositories.UsersRepository,
        useCase: dependencies.useCases.UserUseCase
    }));

    router.use(Token(UserLevel.Customer).policy);

    router.use('/users', UsersRouter({
        repository: dependencies.repositories.UsersRepository,
        useCase: dependencies.useCases.UserUseCase
    }));

    router.use('/products', ProductsRouter({
        repository: dependencies.repositories.ProductsRepository,
        useCase: dependencies.useCases.ProductUseCase
    }));

    return router;
};

export default routes;
