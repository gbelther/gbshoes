import { Order } from '../../../entities';
import { OrdersRepository } from '../../../repository';

export class OrdersRepositoryMemory implements OrdersRepository {
  orders: Order[] = [];

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async listAll(): Promise<Order[]> {
    return this.orders;
  }
}
