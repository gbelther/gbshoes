import { faker } from '@faker-js/faker';
import { Cpf, Item } from '../../../entities';
import { OrdersRepositoryMemory } from '../../../../infra/repositories/memory';
import { ItemsRepositoryMemory } from '../../../../infra/repositories/memory/ItemsRepositoryMemory';
import { CreateOrderUseCase } from './CreateOrderUseCase';

const makeItem = (): Item =>
  new Item(
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    5
  );

type SutResult = {
  sut: CreateOrderUseCase;
  itemsRepository: ItemsRepositoryMemory;
  ordersRepository: OrdersRepositoryMemory;
};

const makeSut = (): SutResult => {
  const ordersRepository = new OrdersRepositoryMemory();
  const itemsRepository = new ItemsRepositoryMemory();
  const sut = new CreateOrderUseCase(ordersRepository, itemsRepository);
  return {
    sut,
    itemsRepository,
    ordersRepository,
  };
};

describe('CreateOrder UseCase', () => {
  it('should throws if order items is empty', async () => {
    const { sut } = makeSut();
    const promise = sut.execute({ cpf: 'invalid_cpf', orderItems: [] });
    await expect(promise).rejects.toThrow(
      new Error('Adicione algum item ao pedido')
    );
  });

  it('should throws if Order throws', async () => {
    const { sut } = makeSut();
    const promise = sut.execute({ cpf: 'invalid_cpf', orderItems: [] });
    await expect(promise).rejects.toThrow();
  });

  it('should call ItemsRepository(findById) correctly', async () => {
    const { sut, itemsRepository } = makeSut();
    const findByIdSpy = jest.spyOn(itemsRepository, 'findById');
    const item = makeItem();
    itemsRepository.items = [item];
    await sut.execute({
      cpf: '980.559.411-49',
      orderItems: [{ itemId: item.id, quantity: 5 }],
    });
    expect(findByIdSpy).toHaveBeenCalledWith(item.id);
  });

  it('should throws if any item not found', async () => {
    const { sut } = makeSut();
    const promise = sut.execute({
      cpf: '980.559.411-49',
      orderItems: [{ itemId: faker.datatype.uuid(), quantity: 5 }],
    });
    await expect(promise).rejects.toThrow(new Error('Item não encontrado'));
  });

  it('should call OrdersRepository(create) correctly', async () => {
    const { sut, itemsRepository, ordersRepository } = makeSut();
    const createSpy = jest.spyOn(ordersRepository, 'create');
    const item = makeItem();
    itemsRepository.items = [item];
    const orderItems = [{ itemId: item.id, price: item.price, quantity: 5 }];
    await sut.execute({
      cpf: '980.559.411-49',
      orderItems,
    });
    const [order] = await ordersRepository.listAll();
    expect(createSpy).toHaveBeenCalledWith({
      id: order.id,
      cpf: new Cpf(order.cpf.value),
      code: order.code,
      createdAt: order.createdAt,
      orderItems: orderItems,
    });
  });
});
