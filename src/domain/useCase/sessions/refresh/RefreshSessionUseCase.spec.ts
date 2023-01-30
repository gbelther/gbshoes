import { Customer } from '@/domain/entities';
import { CustomersRepositoryMemory } from '@/infra/repositories/memory';
import {
  DecryptorSpy,
  EncryptorSpy,
} from '@/tests/helpers/domain/cryptography';
import { makeCustomer } from '@/tests/helpers/domain/entities';
import { faker } from '@faker-js/faker';
import { RefreshSessionUseCase } from './RefreshSessionUseCase';

const addCustomerToRepository = (
  customersRepository: CustomersRepositoryMemory
): Customer => {
  const customer = makeCustomer();
  customersRepository.create(customer);
  return customer;
};

type SutResult = {
  sut: RefreshSessionUseCase;
  customersRepository: CustomersRepositoryMemory;
  decryptorSpy: DecryptorSpy;
  encryptorSpy: EncryptorSpy;
};

const makeSut = (): SutResult => {
  const customersRepository = new CustomersRepositoryMemory();
  const encryptorSpy = new EncryptorSpy();
  const decryptorSpy = new DecryptorSpy();
  const sut = new RefreshSessionUseCase(
    customersRepository,
    encryptorSpy,
    decryptorSpy
  );
  return {
    sut,
    customersRepository,
    encryptorSpy,
    decryptorSpy,
  };
};

describe('RefreshSession UseCase', () => {
  describe('Decryptor', () => {
    it('should call Decryptor correctly', async () => {
      const { sut, customersRepository, decryptorSpy } = makeSut();
      const { email } = addCustomerToRepository(customersRepository);
      decryptorSpy.result = { email: email };
      const decryptSpy = jest.spyOn(decryptorSpy, 'decrypt');
      const refreshToken = faker.datatype.uuid();
      await sut.execute({ refreshToken });
      expect(decryptSpy).toHaveBeenCalledWith(refreshToken);
    });

    it('should throw if Decryptor throws', async () => {
      const { sut, decryptorSpy } = makeSut();
      jest.spyOn(decryptorSpy, 'decrypt').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow();
    });

    it('should throw if Decryptor returns a falsy value', async () => {
      const { sut, decryptorSpy } = makeSut();
      jest.spyOn(decryptorSpy, 'decrypt').mockResolvedValueOnce(undefined);
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow();
    });

    it('should throw if Decryptor returns a falsy email', async () => {
      const { sut, decryptorSpy } = makeSut();
      jest
        .spyOn(decryptorSpy, 'decrypt')
        .mockResolvedValueOnce({ email: undefined });
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow();
    });
  });

  describe('CustomersRepository', () => {
    it('should call CustomersRepository(findByEmail) correctly', async () => {
      const { sut, customersRepository, decryptorSpy } = makeSut();
      const { email } = addCustomerToRepository(customersRepository);
      jest.spyOn(decryptorSpy, 'decrypt').mockResolvedValueOnce({ email });
      const findByEmailSpy = jest.spyOn(customersRepository, 'findByEmail');
      await sut.execute({ refreshToken: 'any_token' });
      expect(findByEmailSpy).toHaveBeenCalledWith(email);
    });

    it('should throw if CustomersRepository(findByEmail) throws', async () => {
      const { sut, customersRepository } = makeSut();
      jest
        .spyOn(customersRepository, 'findByEmail')
        .mockImplementationOnce(() => {
          throw new Error();
        });
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow();
    });

    it('should throw if CustomersRepository(findByEmail) return a falsy value', async () => {
      const { sut, customersRepository } = makeSut();
      jest
        .spyOn(customersRepository, 'findByEmail')
        .mockResolvedValueOnce(undefined);
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow(new Error('Acesso negado'));
    });
  });

  describe('Encryptor', () => {
    it('should call Encryptor correctly', async () => {
      const { sut, customersRepository, decryptorSpy, encryptorSpy } =
        makeSut();
      const { email } = addCustomerToRepository(customersRepository);
      decryptorSpy.result = { email: email };
      const encryptSpy = jest.spyOn(encryptorSpy, 'encrypt');
      await sut.execute({ refreshToken: 'any_token' });
      expect(encryptSpy).toHaveBeenCalledWith({ email });
    });

    it('should throw if Encryptor throws', async () => {
      const { sut, customersRepository, decryptorSpy, encryptorSpy } =
        makeSut();
      const { email } = addCustomerToRepository(customersRepository);
      decryptorSpy.result = { email: email };
      jest.spyOn(encryptorSpy, 'encrypt').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.execute({ refreshToken: 'any_token' });
      await expect(promise).rejects.toThrow();
    });

    it('should return an accessToken correctly', async () => {
      const { sut, customersRepository, decryptorSpy, encryptorSpy } =
        makeSut();
      const { email } = addCustomerToRepository(customersRepository);
      decryptorSpy.result = { email: email };
      encryptorSpy.result = 'any_value';
      const output = await sut.execute({ refreshToken: 'any_token' });
      expect(output.accessToken).toBe('any_value');
    });
  });
});
