import { Customer } from '@/domain/entities';
import { CustomersRepository } from '@/domain/repositories';

export class CustomersRepositoryMemory implements CustomersRepository {
  customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
}
