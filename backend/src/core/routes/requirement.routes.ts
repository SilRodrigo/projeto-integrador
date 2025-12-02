import { makeInvoker } from "awilix-express";
import { Router } from "express";
import requirementCreateControllerFactory from "../modules/requirement/create/controller";
import requirementDeleteControllerFactory from "../modules/requirement/delete/controller";
import requirementFindByIdControllerFactory from "../modules/requirement/findById/controller";
import requirementListControllerFactory from "../modules/requirement/list/controller";
import requirementUpdateControllerFactory from "../modules/requirement/update/controller";
import { requirementVersionRoutes } from './requirementVersion.routes';

const requirementRoutes = Router({ mergeParams: true });

const requirementCreateController = makeInvoker(requirementCreateControllerFactory);
const requirementDeleteController = makeInvoker(requirementDeleteControllerFactory);
const requirementFindByIdController = makeInvoker(requirementFindByIdControllerFactory);
const requirementListController = makeInvoker(requirementListControllerFactory);
const requirementUpdateController = makeInvoker(requirementUpdateControllerFactory);

requirementRoutes.route('/')
    .get(requirementListController('handle'))
    .post(requirementCreateController('handle'));

requirementRoutes.route('/:id')
    .get(requirementFindByIdController('handle'))
    .put(requirementUpdateController('handle'))
    .delete(requirementDeleteController('handle'));

requirementRoutes.use(`/:requirementId/version`, requirementVersionRoutes);

export { requirementRoutes }
