import { Customer } from '../entities';

export interface CustomersRepository {
  create: (customer: Customer) => Promise<void>;
}
