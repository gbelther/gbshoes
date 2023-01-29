/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { CustomersRepositoryMemory } from '@/infra/repositories/memory';
import { makeCustomer } from '@/tests/helpers/domain/entities';
import { CreateSessionUseCase } from './CreateSessionUseCase';
import {
  Encryptor,
  EncryptParams,
  HashCompare,
  HashCompareParams,
} from '@/domain/cryptography';

class BcryptAdapterSpy implements HashCompare {
  params: any;
  result: any;

  async compare(params: HashCompareParams): Promise<boolean> {
    this.params = params;
    return true;
  }
}

class EncryptorSpy implements Encryptor {
  params: any;
  result: string;

  async encrypt(params: EncryptParams): Promise<string> {
    this.params = params;
    return this.result;
  }
}

const makeCredentials = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

type SutResult = {
  sut: CreateSessionUseCase;
  customersRepository: CustomersRepositoryMemory;
  hashCompare: BcryptAdapterSpy;
  encryptorAccessToken: EncryptorSpy;
  encryptorRefreshToken: EncryptorSpy;
};

const makeSut = (): SutResult => {
  const customersRepository = new CustomersRepositoryMemory();
  const hashCompare = new BcryptAdapterSpy();
  const encryptorAccessToken = new EncryptorSpy();
  const encryptorRefreshToken = new EncryptorSpy();
  const sut = new CreateSessionUseCase(
    customersRepository,
    hashCompare,
    encryptorAccessToken,
    encryptorRefreshToken
  );
  return {
    sut,
    customersRepository,
    hashCompare,
    encryptorAccessToken,
    encryptorRefreshToken,
  };
};

describe('CreateSession UseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call CustomersRepository(findByEmail) correctly', async () => {
    const { sut, customersRepository } = makeSut();
    const findByEmailSpy = jest.spyOn(customersRepository, 'findByEmail');
    const customer = makeCustomer();
    customersRepository.create(customer);
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    await sut.execute(credentials);
    expect(findByEmailSpy).toHaveBeenCalledWith(credentials.email);
  });

  it('should throw if CustomersRepository(findByEmail) throws', async () => {
    const { sut, customersRepository } = makeSut();
    jest
      .spyOn(customersRepository, 'findByEmail')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const credentials = makeCredentials();
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if customer not found', async () => {
    const { sut } = makeSut();
    const credentials = makeCredentials();
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow(new Error('Credenciais inválidas'));
  });

  it('should throw if HashCompare throws', async () => {
    const { sut, customersRepository, hashCompare } = makeSut();
    jest.spyOn(hashCompare, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });
    const customer = makeCustomer();
    customersRepository.create(customer);
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow(new Error());
  });

  it('should throw if HashCompare return false', async () => {
    const { sut, customersRepository, hashCompare } = makeSut();
    jest
      .spyOn(hashCompare, 'compare')
      .mockImplementationOnce(async () => false);
    const customer = makeCustomer();
    customersRepository.create(customer);
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow(new Error('Credenciais inválidas'));
  });

  it('should throw if EncryptorAccessToken(encrypt) throws', async () => {
    const { sut, customersRepository, hashCompare, encryptorAccessToken } =
      makeSut();
    const customer = makeCustomer();
    jest
      .spyOn(customersRepository, 'findByEmail')
      .mockResolvedValueOnce(customer);
    jest.spyOn(hashCompare, 'compare').mockResolvedValueOnce(true);
    jest.spyOn(encryptorAccessToken, 'encrypt').mockImplementationOnce(() => {
      throw new Error();
    });
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow();
  });

  it('should throw if EncryptorRefreshToken(encrypt) throws', async () => {
    const { sut, customersRepository, hashCompare, encryptorRefreshToken } =
      makeSut();
    const customer = makeCustomer();
    jest
      .spyOn(customersRepository, 'findByEmail')
      .mockResolvedValueOnce(customer);
    jest.spyOn(hashCompare, 'compare').mockResolvedValueOnce(true);
    jest.spyOn(encryptorRefreshToken, 'encrypt').mockImplementationOnce(() => {
      throw new Error();
    });
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    const promise = sut.execute(credentials);
    await expect(promise).rejects.toThrow();
  });

  it('should return accessToken and refreshToken correctly', async () => {
    const {
      sut,
      customersRepository,
      hashCompare,
      encryptorAccessToken,
      encryptorRefreshToken,
    } = makeSut();
    const customer = makeCustomer();
    jest
      .spyOn(customersRepository, 'findByEmail')
      .mockResolvedValueOnce(customer);
    jest.spyOn(hashCompare, 'compare').mockResolvedValueOnce(true);
    const accessToken = faker.datatype.uuid();
    const refreshToken = faker.datatype.uuid();
    jest
      .spyOn(encryptorAccessToken, 'encrypt')
      .mockResolvedValueOnce(accessToken);
    jest
      .spyOn(encryptorRefreshToken, 'encrypt')
      .mockResolvedValueOnce(refreshToken);
    const credentials = {
      email: customer.email,
      password: customer.password,
    };
    const result = await sut.execute(credentials);
    expect(result).toEqual({ accessToken, refreshToken });
  });
});
