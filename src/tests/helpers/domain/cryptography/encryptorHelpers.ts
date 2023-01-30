/* eslint-disable @typescript-eslint/no-explicit-any */
import { Encryptor, EncryptParams } from '@/domain/cryptography';

export class EncryptorSpy implements Encryptor {
  params: any;
  result = 'any_encrypted';

  async encrypt(params: EncryptParams): Promise<string> {
    this.params = params;
    return this.result;
  }
}
