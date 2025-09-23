import { Router } from 'express'

import { PREFIX_ROUTE } from '../core/url'; // Prefix Global route
//* Routes *//
import { userRoutes } from './user.routes';

import { authMiddleware } from '../middlewares/authMiddleware';
import { responseValidator } from '../middlewares/responseValidatorMiddleware';

const routes = Router();

routes.use(responseValidator);

routes.use(`${PREFIX_ROUTE}/user`, userRoutes);

export { routes }