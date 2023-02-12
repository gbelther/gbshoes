import { CreateCustomer } from '@/domain/useCase/customers/create/CreateCustomer';
import { Input } from '@/domain/useCase/customers/create/dtos';

export class CreateCustomerUseCaseSpy implements CreateCustomer {
  input: Input;

  async execute(input: Input): Promise<void> {
    this.input = input;
  }
}
