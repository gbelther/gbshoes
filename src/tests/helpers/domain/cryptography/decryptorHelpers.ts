/* eslint-disable @typescript-eslint/no-explicit-any */
import { Decryptor, Result } from '@/domain/cryptography';
import { faker } from '@faker-js/faker';

export class DecryptorSpy implements Decryptor {
  params: string;
  result: Result = { email: faker.internet.email() };

  async decrypt(cryptography: string): Promise<Result> {
    this.params = cryptography;
    return this.result;
  }
}
