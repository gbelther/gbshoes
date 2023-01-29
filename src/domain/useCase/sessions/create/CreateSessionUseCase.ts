import { Encryptor, HashCompare } from '@/domain/cryptography';
import { CustomersRepository } from '@/domain/repositories';
import { CreateSession } from './CreateSession';
import { Input, Output } from './dtos';

export class CreateSessionUseCase implements CreateSession {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly hashCompare: HashCompare,
    private readonly encryptorAccessToken: Encryptor,
    private readonly encryptorRefreshToken: Encryptor
  ) {}

  async execute(input: Input): Promise<Output> {
    const customer = await this.customersRepository.findByEmail(input.email);
    if (!customer) throw new Error('Credenciais inválidas');

    const passwordIsCorrect = await this.hashCompare.compare({
      plainText: input.password,
      hash: customer.password,
    });
    if (!passwordIsCorrect) throw new Error('Credenciais inválidas');

    const accessToken = await this.encryptorAccessToken.encrypt({
      email: customer.email,
    });
    const refreshToken = await this.encryptorRefreshToken.encrypt({
      email: customer.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
