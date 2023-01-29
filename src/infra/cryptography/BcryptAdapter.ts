import { Hash, HashCompare, HashCompareParams } from '@/domain/cryptography';
import { hash, compare } from 'bcrypt';

export class BcryptAdapter implements Hash, HashCompare {
  constructor(private readonly salt: number) {}

  async hash(plainText: string): Promise<string> {
    return await hash(plainText, this.salt);
  }

  async compare({ plainText, hash }: HashCompareParams): Promise<boolean> {
    return await compare(plainText, hash);
  }
}
