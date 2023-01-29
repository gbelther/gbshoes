import { Customer } from '@/domain/entities';
import { CustomersRepository } from '@/domain/repositories';

export class CustomersRepositoryMemory implements CustomersRepository {
  customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async findByEmail(email: string): Promise<Customer> {
    const customerFound = this.customers.find(
      (customer) => customer.email === email
    );
    return customerFound;
  }
}
