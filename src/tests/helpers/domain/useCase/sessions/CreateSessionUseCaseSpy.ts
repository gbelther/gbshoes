import { CreateSession } from '@/domain/useCase/sessions/create/CreateSession';
import { Input, Output } from '@/domain/useCase/sessions/create/dtos';
import { faker } from '@faker-js/faker';

export class CreateSessionUseCaseSpy implements CreateSession {
  input: Input = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  output: Output = {
    accessToken: faker.datatype.uuid(),
    refreshToken: faker.datatype.string(20),
  };

  async execute(input: Input): Promise<Output> {
    this.input = input;
    return this.output;
  }
}
