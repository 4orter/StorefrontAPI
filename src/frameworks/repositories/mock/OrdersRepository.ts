import {Order} from '../../../entities';
import {DataStorable} from '../../../entities/protocols';
import {MockDatabase} from '../../databases/mock';

const OrdersRepository: DataStorable<Order> = {
    async add(order: Order): Promise<Order> {
        if (!order.id) {
            order.id = MockDatabase.orders.length;
        }

        MockDatabase.orders.push(order);
        return order;
    },
    async update(order: Order): Promise<Order | null> {
        const index = MockDatabase.orders.findIndex((item: Order) => item.id === order.id);
        if (index < 0) return null;

        MockDatabase.orders[index] = order;
        return order;
    },
    async delete(order: Order): Promise<Order | null> {
        const index = MockDatabase.orders.findIndex((item: Order) => item.id = order.id);
        if (index < 0) return null;

        MockDatabase.orders.splice(index, 1);
        return order;
    },
    async getById(id: number): Promise<Order | null> {
       return MockDatabase.orders.find((item: Order) => item.id === id) || null;
    },
    async getAll(): Promise<Order[] | null> {
        return MockDatabase.orders.length ? MockDatabase.orders : null;
    }
};

Object.freeze(OrdersRepository);
export default OrdersRepository;
