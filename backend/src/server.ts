import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { routes } from './routes';
import { scopePerRequest } from 'awilix-express';
import container from './container';

const server = express();
server.use(scopePerRequest(container));
server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'))
server.use(routes)

export { server }