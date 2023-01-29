import { sign } from 'jsonwebtoken';
import { Encryptor, EncryptParams } from '@/domain/cryptography';

export class JsonWebTokenAdapter implements Encryptor {
  constructor(
    private readonly secret: string,
    private readonly secondsToExpire: number
  ) {}

  async encrypt({ email }: EncryptParams): Promise<string> {
    return sign({ email }, this.secret, { expiresIn: this.secondsToExpire });
  }
}
