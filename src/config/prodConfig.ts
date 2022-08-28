import {Configuration, Environment} from '../entities/config';
import {PostgresDatabase} from '../frameworks/databases/postgres';
import {UsersRepository} from '../frameworks/repositories/postgres';
import {UserUseCase} from '../use-cases';

const prodConfig: Configuration = {
    type: Environment.Production,
    useCases: {
        UserUseCase
    },
    repositories: {
        UsersRepository
    },
    database: PostgresDatabase
};

Object.freeze(prodConfig);
export default prodConfig;
