import { Order } from '@/domain/entities';
import { OrdersRepository } from '@/domain/repositories';

export class OrdersRepositoryMemory implements OrdersRepository {
  orders: Order[] = [];

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async listAll(): Promise<Order[]> {
    return this.orders;
  }

  async listByCpf(cpf: string): Promise<Order[]> {
    const orders = this.orders.filter((order) => order.cpf.value === cpf);
    return orders;
  }
}
