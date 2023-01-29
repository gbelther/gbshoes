import { Customer } from '../entities';

export interface CustomersRepository {
  create: (customer: Customer) => Promise<void>;
  findByEmail: (email: string) => Promise<Customer | undefined>;
}
