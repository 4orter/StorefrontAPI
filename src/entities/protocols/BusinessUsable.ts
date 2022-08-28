import {Product, User} from '..';
import {ProductCategory, UserSession} from '../auxiliary';
import Dependable from './Dependable';

interface BusinessUsable<T> {
    add(dependencies: Dependable<T>): {execute: (item: T) => Promise<T | null>};
    update(dependencies: Dependable<T>): {execute: (item: T) => Promise<T | null>};
    delete(dependencies: Dependable<T>): {execute: (item: T) => Promise<T | null>};
    getById(dependencies: Dependable<T>): {execute: (id: string) => Promise<T | null>};
    getAll(dependencies: Dependable<T>): {execute: () => Promise<T[] | null>};

    // User Specific
    getByUsername?(dependencies: Dependable<User>): {execute: (username: string) => Promise<User | null>};
    authenticate?(dependencies: Dependable<User>): {execute: (username: string, password: string) => Promise<User | null>};
    addSession?(dependencies: Dependable<User>): {execute: (session: UserSession) => Promise<UserSession | null>};
    deleteSession?(dependencies: Dependable<User>): {execute: (session: UserSession) => Promise<UserSession | null>};
    getSessionById?(dependencies: Dependable<User>): {execute: (id: number) => Promise<UserSession | null>};
    getSessionByUserId?(dependencies: Dependable<User>): {execute: (userId: string) => Promise<UserSession | null>};
    getAllSessions?(dependencies: Dependable<User>): {execute: () => Promise<UserSession[] | null>};

    // Product Specific
    getByCategory?(dependencies: Dependable<Product>): {execute: (category: ProductCategory) => Promise<Product[] | null>};
    getCategoryById?(dependencies: Dependable<Product>): {execute: (id: number) => Promise<ProductCategory | null>};
    getAllCategories?(dependencies: Dependable<Product>): {execute: () => Promise<ProductCategory[] | null>};
};

export default BusinessUsable;
