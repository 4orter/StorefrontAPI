import {Product} from '../../../entities';
import {DataStorable} from '../../../entities/protocols';
import {v4 as uuid} from 'uuid';
import {MockDatabase} from '../../databases/mock';
import {ProductCategory} from '../../../entities/auxiliary';

const ProductsRepository: DataStorable<Product> = {
    async add(product: Product): Promise<Product> {
        if (!product.id) {
            product.id = uuid();
        }

        MockDatabase.products.push(product);
        return product;
    },
    async update(product: Product): Promise<Product | null> {
        const index = MockDatabase.products.findIndex((item: Product) => item.id === product.id);
        if (index < 0) return null;

        MockDatabase.products[index] = product;
        return product;
    },
    async delete(product: Product): Promise<Product | null> {
        const index = MockDatabase.products.findIndex((item: Product) => item.id = product.id);
        if (index < 0) return null;

        MockDatabase.products.splice(index, 1);
        return product;
    },
    async getById(id: string): Promise<Product | null> {
       return MockDatabase.products.find((item: Product) => item.id === id) || null;
    },
    async getAll(): Promise<Product[] | null> {
        return MockDatabase.products.length ? MockDatabase.products : null;
    },
    async getByCategory(category: ProductCategory): Promise<Product[] | null> {
        const products = MockDatabase.products.filter((item: Product) => item.categoryId === category.id);
        if(!products.length) return null;

        return products;
    },
    async getCategoryById(id: number): Promise<ProductCategory | null> {
        return MockDatabase.productCategories.find((item: ProductCategory) => item.id = id) || null;
    },
    async getAllCategories(): Promise<ProductCategory[] | null> {
        return MockDatabase.productCategories.length ? MockDatabase.productCategories : null;
    }
};

Object.freeze(ProductsRepository);
export default ProductsRepository;
