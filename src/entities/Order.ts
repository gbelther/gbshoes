import { randomUUID } from 'node:crypto';
import { Cpf } from './Cpf';
import { Item } from './Item';
import { OrderItem } from './OrderItem';

type Params = {
  cpfData: string;
  id?: string;
  code?: string;
  createdAt?: Date;
};

export class Order {
  cpf: Cpf;
  id: string;
  code: string;
  createdAt: Date;
  orderItems: OrderItem[] = [];

  constructor({ cpfData, id, code, createdAt }: Params) {
    this.cpf = new Cpf(cpfData);
    this.id = id ?? randomUUID();
    this.code = code ?? this.generateCode();
    this.createdAt = createdAt ?? new Date();
  }

  public addItem(item: Item, quantity: number) {
    const newOrderItem = new OrderItem({
      item_id: item.id,
      price: item.price,
      quantity,
    });
    this.orderItems.push(newOrderItem);
  }

  private generateCode(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const randomNum = Math.round((Math.random() + 1) * Math.pow(10, 7));
    return `${year}${month}${day}${randomNum}`.padEnd(16, '0');
  }
}
