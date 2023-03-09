import express from 'express';
import { customersRoutes } from './customersRoutes';
import { sessionsRoutes } from './sessionsRoutes';

const router = express.Router();

router.use('/customers', customersRoutes);
router.use('/sessions', sessionsRoutes);

export { router };
