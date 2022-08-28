import {Pool} from 'pg';
import Product from '../Product';
import {BusinessUsable, DataStorable, Initializable} from '../protocols';
import User from '../User';
import Environment from './Environment';

type Configuration = {
    type: Environment,
    useCases: {
        UserUseCase?: BusinessUsable<User>,
        ProductUseCase?: BusinessUsable<Product>
    },
    repositories: {
        UsersRepository?: DataStorable<User>,
        ProductsRepository?: DataStorable<Product>
    },
    database: Initializable | Pool
};

export default Configuration;
