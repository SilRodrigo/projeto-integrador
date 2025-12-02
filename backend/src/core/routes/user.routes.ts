import { makeInvoker } from "awilix-express";
import { Router } from "express";
import userAuthControllerFactory from "../modules/user/auth/controller";
import userCreateControllerFactory from "../modules/user/create/controller";
import userDeleteControllerFactory from "../modules/user/delete/controller";
import userFindByEmailControllerFactory from "../modules/user/findByEmail/controller";
import userFindByIdControllerFactory from "../modules/user/findById/controller";
import userListControllerFactory from "../modules/user/list/controller";
import userUpdateControllerFactory from "../modules/user/update/controller";

const userRoutes = Router();

const userAuthController = makeInvoker(userAuthControllerFactory);
const userCreateController = makeInvoker(userCreateControllerFactory);
const userDeleteController = makeInvoker(userDeleteControllerFactory);
const userFindByEmailController = makeInvoker(userFindByEmailControllerFactory);
const userFindByIdController = makeInvoker(userFindByIdControllerFactory);
const userListController = makeInvoker(userListControllerFactory);
const userUpdateController = makeInvoker(userUpdateControllerFactory);

userRoutes.route('/')
    .get(userListController('handle'))
    .post(userCreateController('handle'));

userRoutes.route('/:id')
    .get(userFindByIdController('handle'))
    .put(userUpdateController('handle'))
    .delete(userDeleteController('handle'));

userRoutes.route('/auth').post(userAuthController('handle'));

userRoutes.route('/email').post(userFindByEmailController('handle'));

export { userRoutes }