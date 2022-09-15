import express from 'express';
import {CustomerServiceController} from '../../../../controllers/services';
import {Configuration} from '../../../../entities/config';

const CustomerServiceRouter = (dependencies: Configuration): express.Router => {
    const router = express.Router();
    const controller = CustomerServiceController(dependencies);

    router.route('/account')
          .get(controller.getAccount)
          .put(controller.updateAccount)
          .delete(controller.deleteAccount);

    router.route('/account/orders').get(controller.getOrders);
    router.route('/account/orders/:orderId').get(controller.getOrderById);

    router.route('/cart').get(controller.getCart);
    router.route('/cart/remove-item/:productId').delete(controller.removeItemFromCart);
    router.route('/checkout').put(controller.checkout);

    router.route('/store/products').get(controller.getProducts);
    router.route('/store/products/:productId').get(controller.getProductById);
    router.route('/store/products/:productId/add-to-cart').post(controller.addItemToCart);

    router.route('/store/categories').get(controller.getProductCategories);
    router.route('/store/categories/:categoryId').get(controller.getProductsByCategory);

    return router;
};

export default CustomerServiceRouter;
