import { PrismaClient } from '@prisma/client';
import { Customer } from '@/domain/entities';
import { CustomersRepository } from '@/domain/repositories';

export class CustomersRepositoryDatabase implements CustomersRepository {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async create(customer: Customer): Promise<void> {
    await this.client.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        cpf: customer.cpf.value,
        email: customer.email,
        password: customer.password,
      },
    });
  }

  async findByEmail(email: string): Promise<Customer> {
    const customerData = await this.client.customer.findFirst({
      where: { email },
    });
    if (!customerData) return;
    const customer = new Customer({
      id: customerData.id,
      cpfData: customerData.cpf,
      name: customerData.name,
      email: customerData.email,
      password: customerData.password,
    });
    return customer;
  }
}
