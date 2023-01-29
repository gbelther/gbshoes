/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { Hash } from '@/domain/cryptography';
import { Cpf } from '@/domain/entities';
import { CustomersRepositoryMemory } from '@/infra/repositories/memory';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';

class BcryptAdapterSpy implements Hash {
  params: any;
  result: any;

  async hash(plainText: string): Promise<string> {
    this.params = plainText;
    return this.result;
  }
}

type SutResult = {
  sut: CreateCustomerUseCase;
  customersRepository: CustomersRepositoryMemory;
  hash: BcryptAdapterSpy;
};

const makeSut = (): SutResult => {
  const customersRepository = new CustomersRepositoryMemory();
  const hash = new BcryptAdapterSpy();
  const sut = new CreateCustomerUseCase(customersRepository, hash);
  return {
    sut,
    customersRepository,
    hash,
  };
};

describe('CreateCustomer UseCase', () => {
  it('should throw if CPF is invalid', async () => {
    const { sut } = makeSut();
    const promise = sut.execute({
      name: faker.name.fullName(),
      cpf: 'invalid_cpf',
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    await expect(promise).rejects.toThrow();
  });

  it('should call CustomersRepository(create) correctly', async () => {
    const { sut, customersRepository, hash } = makeSut();
    const createSpy = jest.spyOn(customersRepository, 'create');
    const passwordHashed = 'any_password_hashed';
    hash.result = passwordHashed;
    const input = {
      name: faker.name.fullName(),
      cpf: '967.563.026-47',
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.execute(input);
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...input,
        cpf: new Cpf(input.cpf),
        password: passwordHashed,
      })
    );
  });
});
