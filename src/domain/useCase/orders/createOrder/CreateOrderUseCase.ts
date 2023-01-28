import { Order } from '../../../entities';
import { ItemsRepository, OrdersRepository } from '../../../repositories';
import { CreateOrder } from './CreateOrder';
import { Input, Output } from './dtos';

export class CreateOrderUseCase implements CreateOrder {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly itemsRepository: ItemsRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    if (input.orderItems.length === 0) {
      throw new Error('Adicione algum item ao pedido');
    }

    const order = new Order({ cpfData: input.cpf });
    for (const orderItem of input.orderItems) {
      const item = await this.itemsRepository.findById(orderItem.itemId);
      if (!item) throw new Error('Item não encontrado');
      order.addItem(item, orderItem.quantity);
    }

    await this.ordersRepository.create(order);
  }
}
