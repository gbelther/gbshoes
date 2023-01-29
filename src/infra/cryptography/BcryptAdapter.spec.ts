import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async hash() {
    return 'any_hash';
  },
  async compare() {
    return true;
  },
}));

type SutParams = {
  salt?: number;
};

type SutTypes = {
  sut: BcryptAdapter;
};

const makeSut = ({ salt = 2 }: SutParams = {}): SutTypes => {
  const sut = new BcryptAdapter(salt);
  return {
    sut,
  };
};

describe('BcryptAdapter', () => {
  describe('Hash', () => {
    it('should call Hash correctly', async () => {
      const salt = 2;
      const { sut } = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      const text = faker.random.word();
      await sut.hash(text);
      expect(hashSpy).toHaveBeenCalledWith(text, salt);
    });

    it('should return a text hashed if Hash succeeds', async () => {
      const { sut } = makeSut();
      const textHashed = await sut.hash(faker.random.word());
      expect(textHashed).toBe('any_hash');
    });

    it('should throw if Hash throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });
      const hashPromise = sut.hash(faker.random.word());
      await expect(hashPromise).rejects.toThrow(new Error());
    });
  });

  describe('HashCompare', () => {
    it('should call compare correctly', async () => {
      const { sut } = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      const hash = 'any_hash';
      const plainText = 'any_plain_text';
      await sut.compare({ plainText, hash });
      expect(compareSpy).toHaveBeenCalledWith(plainText, hash);
    });

    it('should return true if compare returns true', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
      const hash = 'any_hash';
      const plainText = 'any_plain_text';
      const result = await sut.compare({ plainText, hash });
      expect(result).toBeTruthy();
    });

    it('should return false if compare returns false', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      const hash = 'any_hash';
      const plainText = 'any_plain_text';
      const result = await sut.compare({ plainText, hash });
      expect(result).toBeFalsy();
    });

    it('should throw if compare throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });
      const hash = 'any_hash';
      const plainText = 'any_plain_text';
      const promise = sut.compare({ plainText, hash });
      await expect(promise).rejects.toThrow();
    });
  });
});
