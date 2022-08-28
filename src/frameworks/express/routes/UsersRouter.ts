import express from 'express';
import {UserController} from '../../../controllers';
import {User} from '../../../entities';
import {Dependable} from '../../../entities/protocols';

const UsersRouter = (dependencies: Dependable<User>): express.Router => {
    const router = express.Router();
    const controller = UserController(dependencies);

    router.route('/')
          .get(controller.getAllUsers)
          .post(controller.addUser)
          .put(controller.updateUser)
          .delete(controller.deleteUser);


    router.route('/:id').get(controller.getUserById);

    return router;
};

export default UsersRouter;
