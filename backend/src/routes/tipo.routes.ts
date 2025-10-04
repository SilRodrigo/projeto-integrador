import { makeInvoker } from "awilix-express";
import { Router } from "express";
import tipoFindByIdControllerFactory from "../modules/tipo/findById/controller";
import tipoListControllerFactory from "../modules/tipo/list/controller";

const tipoRoutes = Router();

const tipoFindByIdController = makeInvoker(tipoFindByIdControllerFactory);
const tipoListController = makeInvoker(tipoListControllerFactory);

tipoRoutes.route('/')
    .get(tipoListController('handle'))

tipoRoutes.route('/:id')
    .get(tipoFindByIdController('handle'));

export { tipoRoutes }