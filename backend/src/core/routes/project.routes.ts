import { makeInvoker } from "awilix-express";
import { Router } from "express";
import projectCreateControllerFactory from "../modules/project/create/controller";
import projectDeleteControllerFactory from "../modules/project/delete/controller";
import projectFindByIdControllerFactory from "../modules/project/findById/controller";
import projectListControllerFactory from "../modules/project/list/controller";
import projectUpdateControllerFactory from "../modules/project/update/controller";

import { requirementRoutes } from './requirement.routes';

const projectRoutes = Router();

const projectCreateController = makeInvoker(projectCreateControllerFactory);
const projectDeleteController = makeInvoker(projectDeleteControllerFactory);
const projectFindByIdController = makeInvoker(projectFindByIdControllerFactory);
const projectListController = makeInvoker(projectListControllerFactory);
const projectUpdateController = makeInvoker(projectUpdateControllerFactory);

projectRoutes.route('/')
    .get(projectListController('handle'))
    .post(projectCreateController('handle'));

projectRoutes.route('/:id')
    .get(projectFindByIdController('handle'))
    .put(projectUpdateController('handle'))
    .delete(projectDeleteController('handle'));


projectRoutes.use(`/:projectId/requirement`, requirementRoutes);

export { projectRoutes }
