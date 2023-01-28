import { Order } from '../entities';

export interface OrdersRepository {
  create: (order: Order) => Promise<void>;
  listAll: () => Promise<Order[]>;
}
