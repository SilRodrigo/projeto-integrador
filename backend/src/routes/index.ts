import { Router } from 'express'

import { PREFIX_ROUTE } from '../core/url'; // Prefix Global route
//* Routes *//
import { usuarioRoutes } from './usuario.routes';
import { treinoRoutes } from './treino.routes';
import { tipoRoutes } from './tipo.routes';

import { authMiddleware } from '../middlewares/authMiddleware';
import { responseValidator } from '../middlewares/responseValidatorMiddleware';

const routes = Router();

routes.use(responseValidator);

routes.use(`${PREFIX_ROUTE}/usuario`, usuarioRoutes);
routes.use(`${PREFIX_ROUTE}/treino`, treinoRoutes);
routes.use(`${PREFIX_ROUTE}/tipo`, tipoRoutes);

export { routes }