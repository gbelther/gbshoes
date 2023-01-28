type Params = {
  itemId: string;
  price: number;
  quantity: number;
};

export class OrderItem {
  itemId: string;
  price: number;
  quantity: number;

  constructor({ itemId, price, quantity }: Params) {
    this.itemId = itemId;
    this.price = price;
    this.quantity = quantity;
  }
}
