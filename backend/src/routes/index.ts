import { Router } from 'express'

import { PREFIX_ROUTE } from '../core/url'; // Prefix Global route
//* Routes *//
import { usuarioRoutes } from './usuario.routes';
import { pessoaRoutes } from './pessoa.routes';

import { authMiddleware } from '../middlewares/authMiddleware';
import { responseValidator } from '../middlewares/responseValidatorMiddleware';

const routes = Router();

routes.use(responseValidator);

routes.use(`${PREFIX_ROUTE}/usuario`, usuarioRoutes);
routes.use(`${PREFIX_ROUTE}/pessoa`, authMiddleware, pessoaRoutes);

export { routes }