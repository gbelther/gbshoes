import { CreateCustomer } from '@/domain/useCase/customers/create/CreateCustomer';
import {
  Controller,
  HttpResponse,
  HttpStatusCode,
} from '@/presentation/protocols';
import { Input, Output } from './dtos';

export class CreateCustomerController implements Controller<Input, Output> {
  constructor(private readonly createCustomer: CreateCustomer) {}

  async handle(httpRequest: Input): Promise<HttpResponse<void>> {
    await this.createCustomer.execute({
      name: httpRequest.name,
      cpf: httpRequest.cpf,
      email: httpRequest.email,
      password: httpRequest.password,
    });

    return {
      statusCode: HttpStatusCode.created,
    };
  }
}
