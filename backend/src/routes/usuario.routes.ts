import { makeInvoker } from "awilix-express";
import { Router } from "express";
import usuarioAuthControllerFactory from "../modules/usuario/auth/controller";
import usuarioCreateControllerFactory from "../modules/usuario/create/controller";
import usuarioDeleteControllerFactory from "../modules/usuario/delete/controller";
import usuarioFindByIdControllerFactory from "../modules/usuario/findById/controller";

const usuarioRoutes = Router();

const usuarioAuthController = makeInvoker(usuarioAuthControllerFactory);
const usuarioCreateController = makeInvoker(usuarioCreateControllerFactory);
const usuarioDeleteController = makeInvoker(usuarioDeleteControllerFactory);
const usuarioFindByIdController = makeInvoker(usuarioFindByIdControllerFactory);

usuarioRoutes.route('/')
    .post(usuarioCreateController('handle'));

usuarioRoutes.route('/:id')
    .get(usuarioFindByIdController('handle'))
    .delete(usuarioDeleteController('handle'));

usuarioRoutes.route('/auth')
    .post(usuarioAuthController('handle'));

export { usuarioRoutes }