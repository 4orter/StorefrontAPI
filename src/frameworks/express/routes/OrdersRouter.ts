import express from 'express';
import {OrderController} from '../../../controllers';
import {Order} from '../../../entities';
import {Dependable} from '../../../entities/protocols';

const OrdersRouter = (dependencies: Dependable<Order>): express.Router => {
    const router = express.Router();
    const controller = OrderController(dependencies);

    router.route('/')
          .get(controller.getAllOrders)
          .post(controller.addOrder)
          .put(controller.updateOrder)
          .delete(controller.deleteOrder);


    router.route('/:id').get(controller.getOrderById);

    return router;
};

export default OrdersRouter;
