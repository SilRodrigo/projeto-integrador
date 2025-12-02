import { makeInvoker } from "awilix-express";
import { Router } from "express";
import requirementVersionCreateControllerFactory from "../modules/requirementVersion/create/controller";
import requirementVersionDeleteControllerFactory from "../modules/requirementVersion/delete/controller";
import requirementVersionFindByIdControllerFactory from "../modules/requirementVersion/findById/controller";
import requirementVersionListControllerFactory from "../modules/requirementVersion/list/controller";
import requirementVersionUpdateControllerFactory from "../modules/requirementVersion/update/controller";

const requirementVersionRoutes = Router({ mergeParams: true });

const requirementVersionCreateController = makeInvoker(requirementVersionCreateControllerFactory);
const requirementVersionDeleteController = makeInvoker(requirementVersionDeleteControllerFactory);
const requirementVersionFindByIdController = makeInvoker(requirementVersionFindByIdControllerFactory);
const requirementVersionListController = makeInvoker(requirementVersionListControllerFactory);
const requirementVersionUpdateController = makeInvoker(requirementVersionUpdateControllerFactory);

requirementVersionRoutes.route('/')
    .get(requirementVersionListController('handle'))
    .post(requirementVersionCreateController('handle'));

requirementVersionRoutes.route('/:id')
    .get(requirementVersionFindByIdController('handle'))
    .put(requirementVersionUpdateController('handle'))
    .delete(requirementVersionDeleteController('handle'));

export { requirementVersionRoutes }
