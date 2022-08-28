import {Configuration, Environment} from '../entities/config';
import {MockDatabase} from '../frameworks/databases/mock';
import {UsersRepository, ProductsRepository} from '../frameworks/repositories/mock';
import {ProductUseCase, UserUseCase} from '../use-cases';

const mockConfig: Configuration = {
    type: Environment.Test,
    useCases: {
        UserUseCase,
        ProductUseCase
    },
    repositories: {
        UsersRepository,
        ProductsRepository
    },
    database: MockDatabase
};

Object.freeze(mockConfig);
export default mockConfig;
