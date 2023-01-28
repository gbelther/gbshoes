import { OrdersRepository } from '@/domain/repositories';
import { Output } from './dtos';
import { ListOrdersByCpf } from './ListOrdersByCpf';

export class ListOrdersByCpfUseCase implements ListOrdersByCpf {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute(cpf: string): Promise<Output> {
    const orders = await this.ordersRepository.listByCpf(cpf);
    return orders;
  }
}
