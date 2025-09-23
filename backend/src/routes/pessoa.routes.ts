import { makeInvoker } from "awilix-express";
import { Router } from "express";
import pessoaCreateControllerFactory from "../modules/pessoa/create/controller";
import pessoaDeleteControllerFactory from "../modules/pessoa/delete/controller";
import pessoaFindByIdControllerFactory from "../modules/pessoa/findById/controller";
import pessoaListControllerFactory from "../modules/pessoa/list/controller";
import pessoaUpdateControllerFactory from "../modules/pessoa/update/controller";

const pessoaRoutes = Router();

const pessoaCreateController = makeInvoker(pessoaCreateControllerFactory);
const pessoaDeleteController = makeInvoker(pessoaDeleteControllerFactory);
const pessoaFindByIdController = makeInvoker(pessoaFindByIdControllerFactory);
const pessoaListController = makeInvoker(pessoaListControllerFactory);
const pessoaUpdateController = makeInvoker(pessoaUpdateControllerFactory);

pessoaRoutes.route('/')
    .get(pessoaListController('handle'))
    .post(pessoaCreateController('handle'));

pessoaRoutes.route('/:id')
    .get(pessoaFindByIdController('handle'))
    .put(pessoaUpdateController('handle'))
    .delete(pessoaDeleteController('handle'));

export { pessoaRoutes }