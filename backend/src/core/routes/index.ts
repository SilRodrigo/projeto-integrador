import { Router } from 'express'

import { PREFIX_ROUTE } from '../url'; // Prefix Global route
//* Routes *//
import { userRoutes } from './user.routes';
import { projectRoutes } from './project.routes';
import { requirementRoutes } from './requirement.routes';
import { requirementVersionRoutes } from './requirementVersion.routes';

import { authMiddleware } from '../../middlewares/authMiddleware';
import { responseValidator } from '../../middlewares/responseValidatorMiddleware';

const routes = Router();

routes.use(responseValidator);

routes.use(`${PREFIX_ROUTE}/user`, userRoutes);
routes.use(`${PREFIX_ROUTE}/project`, authMiddleware, projectRoutes);
routes.use(`${PREFIX_ROUTE}/requirement`, authMiddleware, requirementRoutes);
routes.use(`${PREFIX_ROUTE}/version`, authMiddleware, requirementVersionRoutes);

export { routes }