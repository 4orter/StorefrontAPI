import {Product, User} from '..';
import {ProductCategory, UserSession} from '../auxiliary';

interface DataStorable<T> {
    add(item: T): Promise<T | null>;
    update(item: T): Promise<T | null>;
    delete(item: T): Promise<T | null>;
    getById(id: string | number): Promise<T | null>;
    getAll(): Promise<T[] | null>;

    // User Specific
    getByUsername?(username: string): Promise<User | null>;
    authenticate?(username: string, password: string): Promise<User | null>;
    addSession?(session: UserSession): Promise<UserSession | null>;
    deleteSession?(session: UserSession): Promise<UserSession | null>;
    getSessionById?(id: number): Promise<UserSession | null>;
    getSessionByUserId?(userId: string): Promise<UserSession | null>;
    getAllSessions?(): Promise<UserSession[] | null>;

    // Product Specific
    getByCategory?(category: ProductCategory): Promise<Product[] | null>;
    getCategoryById?(id: number): Promise<ProductCategory | null>;
    getAllCategories?(): Promise<ProductCategory[] | null>;
}

export default DataStorable;
