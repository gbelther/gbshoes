import { faker } from '@faker-js/faker';
import { Item } from './Item';
import { Order } from './Order';

describe('Order', () => {
  it('should create Order correctly without code and createdAt', () => {
    const cpfValue = '737.611.853-59';
    const id = faker.datatype.uuid();
    const order = new Order({
      cpfData: cpfValue,
      id,
    });
    expect(order.cpf.value).toBe(cpfValue);
    expect(order.id).toBe(id);
    expect(order.code.length).toBe(16);
    expect(order.orderItems).toHaveLength(0);
  });

  it('should create Order correctly with code and createdAt', () => {
    const cpfValue = '737.611.853-59';
    const id = faker.datatype.uuid();
    const code = faker.random.numeric(16);
    const createdAt = faker.date.recent();
    const order = new Order({
      cpfData: cpfValue,
      id,
      code,
      createdAt,
    });
    expect(order.cpf.value).toBe(cpfValue);
    expect(order.id).toBe(id);
    expect(order.code.length).toBe(16);
    expect(order.orderItems).toHaveLength(0);
  });

  it('should throw Order if CPF is invalid', () => {
    const cpfValue = '111.111.111-22';
    const id = faker.datatype.uuid();
    const code = faker.random.numeric(16);
    const createdAt = faker.date.recent();
    expect(
      () =>
        new Order({
          cpfData: cpfValue,
          id,
          code,
          createdAt,
        })
    ).toThrow(new Error('CPF Inválido'));
  });

  it('should add item correctly', () => {
    const cpfValue = '737.611.853-59';
    const id = faker.datatype.uuid();
    const code = faker.random.numeric(16);
    const createdAt = faker.date.recent();
    const order = new Order({
      cpfData: cpfValue,
      id,
      code,
      createdAt,
    });
    const item = new Item(
      faker.commerce.productName(),
      faker.commerce.productDescription(),
      10
    );
    order.addItem(item, 3);
    expect(order.orderItems).toHaveLength(1);
    expect(order.orderItems[0]).toEqual({
      item_id: item.id,
      price: item.price,
      quantity: 3,
    });
  });
});
