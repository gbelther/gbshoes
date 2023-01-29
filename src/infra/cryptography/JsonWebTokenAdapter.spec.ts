import { faker } from '@faker-js/faker';
import jsonwebtoken from 'jsonwebtoken';
import { JsonWebTokenAdapter } from './JsonWebTokenAdapter';

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token';
  },
}));

type SutParams = {
  secret?: string;
  expiresIn?: number;
};

type SutTypes = {
  sut: JsonWebTokenAdapter;
};

const makeSut = ({
  secret = faker.random.word(),
  expiresIn = 86400,
}: SutParams = {}): SutTypes => {
  const sut = new JsonWebTokenAdapter(secret, expiresIn);
  return {
    sut,
  };
};

describe('JsonWebTokenAdapter', () => {
  it('should call sign correctly', async () => {
    const secret = faker.random.word();
    const expiresIn = faker.datatype.number();
    const { sut } = makeSut({ secret, expiresIn });
    const email = faker.internet.email();
    const signSpy = jest.spyOn(jsonwebtoken, 'sign');
    await sut.encrypt({ email });
    expect(signSpy).toHaveBeenCalledWith({ email }, secret, { expiresIn });
  });

  it('should throw if sign throws', async () => {
    const secret = faker.random.word();
    const { sut } = makeSut({ secret });
    const email = faker.internet.email();
    jest.spyOn(jsonwebtoken, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt({ email });
    await expect(promise).rejects.toThrow(new Error());
  });
});
