import express from 'express';
import { customersRoutes } from './customersRoutes';

const router = express.Router();

router.use('/customers', customersRoutes);

export { router };
