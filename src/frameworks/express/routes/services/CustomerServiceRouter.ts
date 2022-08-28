import express from 'express';
import {CustomerServiceController} from '../../../../controllers/services';
import {User} from '../../../../entities';
import {Dependable} from '../../../../entities/protocols';

const CustomerServiceRouter = (dependencies: Dependable<User>): express.Router => {
    const router = express.Router();
    const controller = CustomerServiceController(dependencies);

    router.route('/account')
          .get(controller.getAccount)
          .put(controller.updateAccount)
          .delete(controller.deleteAccount);

    router.route('/account/orders').get(controller.getOrders);
    router.route('/account/orders/:id').get(controller.getOrderById);

    router.route('/cart')
          .get(controller.getCart)
          .put(controller.updateCart);
    router.route('/cart/remove-item/:id').delete(controller.removeItemFromCart);

    router.route('/products').get(controller.getProducts);
    router.route('/products/:id').get(controller.getProductById);
    router.route('/products/:id/add-to-cart').post(controller.addItemToCart);
    router.route('/products/categories').get(controller.getProductCategories);
    router.route('/products/category/:category').get(controller.getProductsByCategory);

    return router;
};

export default CustomerServiceRouter;
