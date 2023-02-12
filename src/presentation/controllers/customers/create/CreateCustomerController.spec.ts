import { Input } from '@/domain/useCase/customers/create/dtos';
import { HttpStatusCode } from '@/presentation/protocols';
import { CreateCustomerUseCaseSpy } from '@/tests/helpers/presentation/useCase';
import { faker } from '@faker-js/faker';
import { CreateCustomerController } from './CreateCustomerController';

const makeInput = (): Input => ({
  name: faker.name.fullName(),
  email: faker.internet.email(),
  cpf: '084.679.748-85',
  password: faker.internet.password(),
});

type SutResult = {
  sut: CreateCustomerController;
  createCustomerUseCase: CreateCustomerUseCaseSpy;
};

const makeSut = (): SutResult => {
  const createCustomerUseCase = new CreateCustomerUseCaseSpy();
  const sut = new CreateCustomerController(createCustomerUseCase);
  return {
    sut,
    createCustomerUseCase,
  };
};

describe('CreateCustomer Controller', () => {
  it('should call CreateCustomer correctly', async () => {
    const { sut, createCustomerUseCase } = makeSut();
    const input = makeInput();
    await sut.handle(input);
    expect(createCustomerUseCase.input).toEqual(input);
  });

  it('should throw if CreateCustomer throws', async () => {
    const { sut, createCustomerUseCase } = makeSut();
    jest.spyOn(createCustomerUseCase, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(makeInput());
    await expect(promise).rejects.toThrow(new Error());
  });

  it('should return 201 if CreateCustomer succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeInput());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.created);
  });
});
