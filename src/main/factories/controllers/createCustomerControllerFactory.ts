import { CreateCustomerController } from '@/presentation/controllers/customers/create/CreateCustomerController';
import { makeCreateCustomerUseCase } from '../useCases';

export const makeCreateCustomerController = () =>
  new CreateCustomerController(makeCreateCustomerUseCase());
