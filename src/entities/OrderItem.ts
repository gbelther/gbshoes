type Params = {
  item_id: string;
  price: number;
  quantity: number;
};

export class OrderItem {
  item_id: string;
  price: number;
  quantity: number;

  constructor({ item_id, price, quantity }: Params) {
    this.item_id = item_id;
    this.price = price;
    this.quantity = quantity;
  }
}
