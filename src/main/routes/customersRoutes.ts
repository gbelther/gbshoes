import express from 'express';
import { expressAdaptRoute } from '@/infra/routes';
import { makeCreateCustomerController } from '../factories/controllers/createCustomerControllerFactory';

const customersRoutes = express.Router();

customersRoutes.post('/', expressAdaptRoute(makeCreateCustomerController()));

export { customersRoutes };
