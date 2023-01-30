import { Decryptor, Encryptor } from '@/domain/cryptography';
import { CustomersRepository } from '@/domain/repositories';
import { Input, Output } from './dtos';
import { RefreshSession } from './RefreshSession';

export class RefreshSessionUseCase implements RefreshSession {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly encryptor: Encryptor,
    private readonly decryptor: Decryptor
  ) {}

  async execute(input: Input): Promise<Output> {
    const refreshData = await this.decryptor.decrypt(input.refreshToken);
    if (!refreshData || !refreshData.email) throw new Error('Acesso negado');

    const customer = await this.customersRepository.findByEmail(
      refreshData.email
    );
    if (!customer) throw new Error('Acesso negado');

    const newAccessToken = await this.encryptor.encrypt({
      email: customer.email,
    });
    return { accessToken: newAccessToken };
  }
}
