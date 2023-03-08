import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '@/presentation/protocols';
import { CreateSessionUseCaseSpy } from '@/tests/helpers/domain/useCase';
import { CreateSessionController } from './CreateSessionController';

type SutResult = {
  sut: CreateSessionController;
  createSessionUseCaseSpy: CreateSessionUseCaseSpy;
};

const makeSut = (): SutResult => {
  const createSessionUseCaseSpy = new CreateSessionUseCaseSpy();
  const sut = new CreateSessionController(createSessionUseCaseSpy);
  return {
    sut,
    createSessionUseCaseSpy,
  };
};

describe('Create Session Controller', () => {
  it('should throw if email is invalid', async () => {
    const { sut } = makeSut();
    const promise = sut.handle({
      email: '',
      password: faker.internet.password(),
    });
    await expect(promise).rejects.toThrow(new Error('Parametros inválidos'));
  });

  it('should throw if password is invalid', async () => {
    const { sut } = makeSut();
    const promise = sut.handle({
      email: faker.internet.email(),
      password: '',
    });
    await expect(promise).rejects.toThrow(new Error('Parametros inválidos'));
  });

  it('should call CreateSession correctly', async () => {
    const { sut, createSessionUseCaseSpy } = makeSut();
    const input = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.handle(input);
    expect(createSessionUseCaseSpy.input).toEqual(input);
  });

  it('should throw if CreateSession throws', async () => {
    const { sut, createSessionUseCaseSpy } = makeSut();
    jest
      .spyOn(createSessionUseCaseSpy, 'execute')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const promise = sut.handle({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    await expect(promise).rejects.toThrow(new Error());
  });

  it('should return the correct values', async () => {
    const { sut, createSessionUseCaseSpy } = makeSut();
    const output = {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    };
    createSessionUseCaseSpy.output = output;
    const httpResult = await sut.handle({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(httpResult).toEqual({
      statusCode: HttpStatusCode.ok,
      body: output,
    });
  });
});
