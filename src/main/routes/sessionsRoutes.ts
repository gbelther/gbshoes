import { expressAdaptRoute } from '@/infra/routes';
import express from 'express';
import { makeCreateSessionController } from '../factories/controllers/createSessionControllerFactory';

const sessionsRoutes = express.Router();

sessionsRoutes.post('/', expressAdaptRoute(makeCreateSessionController()));

export { sessionsRoutes };
