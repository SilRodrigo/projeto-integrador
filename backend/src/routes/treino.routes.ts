import { makeInvoker } from "awilix-express";
import { Router } from "express";
import treinoCreateControllerFactory from "../modules/treino/create/controller";
import treinoDeleteControllerFactory from "../modules/treino/delete/controller";
import treinoFindByIdControllerFactory from "../modules/treino/findById/controller";
import treinoListControllerFactory from "../modules/treino/list/controller";
import treinoUpdateControllerFactory from "../modules/treino/update/controller";

const treinoRoutes = Router();

const treinoCreateController = makeInvoker(treinoCreateControllerFactory);
const treinoDeleteController = makeInvoker(treinoDeleteControllerFactory);
const treinoFindByIdController = makeInvoker(treinoFindByIdControllerFactory);
const treinoListController = makeInvoker(treinoListControllerFactory);
const treinoUpdateController = makeInvoker(treinoUpdateControllerFactory);

treinoRoutes.route('/')
    .get(treinoListController('handle'))
    .post(treinoCreateController('handle'));

treinoRoutes.route('/:id')
    .get(treinoFindByIdController('handle'))
    .delete(treinoDeleteController('handle'))
    .put(treinoUpdateController('handle'));

export { treinoRoutes }