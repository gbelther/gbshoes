import { Hash } from '@/domain/cryptography';
import { Customer } from '@/domain/entities';
import { CustomersRepository } from '@/domain/repositories';
import { CreateCustomer } from './CreateCustomer';
import { Input, Output } from './dtos';

export class CreateCustomerUseCase implements CreateCustomer {
  constructor(
    private readonly customersRepository: CustomersRepository,
    readonly hash: Hash
  ) {}

  async execute(input: Input): Promise<Output> {
    const passwordHashed = await this.hash.hash(input.password);

    const customer = new Customer({
      name: input.name,
      cpfData: input.cpf,
      email: input.email,
      password: passwordHashed,
    });

    await this.customersRepository.create(customer);
  }
}
