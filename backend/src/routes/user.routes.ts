import { makeInvoker } from "awilix-express";
import { Router } from "express";
import userAuthControllerFactory from "../modules/user/auth/controller";
import userCreateControllerFactory from "../modules/user/create/controller";
import userDeleteControllerFactory from "../modules/user/delete/controller";
import userFindByIdControllerFactory from "../modules/user/findById/controller";

const userRoutes = Router();

const userAuthController = makeInvoker(userAuthControllerFactory);
const userCreateController = makeInvoker(userCreateControllerFactory);
const userDeleteController = makeInvoker(userDeleteControllerFactory);
const userFindByIdController = makeInvoker(userFindByIdControllerFactory);

userRoutes.route('/')
    .post(userCreateController('handle'));

userRoutes.route('/:id')
    .get(userFindByIdController('handle'))
    .delete(userDeleteController('handle'));

userRoutes.route('/auth')
    .post(userAuthController('handle'));

export { userRoutes }