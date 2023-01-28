import { Order } from '@/domain/entities';

export interface OrdersRepository {
  create: (order: Order) => Promise<void>;
  listAll: () => Promise<Order[]>;
  listByCpf: (cpf: string) => Promise<Order[]>;
}
