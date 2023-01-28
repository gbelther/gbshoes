import { faker } from '@faker-js/faker';
import { Item } from '@/domain/entities';
import { ItemsRepositoryMemory } from '@/infra/repositories/memory';
import { CreateItemUseCase } from './CreateItemUseCase';

type SutResult = {
  sut: CreateItemUseCase;
  itemsRepository: ItemsRepositoryMemory;
};

const makeSut = (): SutResult => {
  const itemsRepository = new ItemsRepositoryMemory();
  const sut = new CreateItemUseCase(itemsRepository);
  return {
    sut,
    itemsRepository,
  };
};

describe('CreateItem UseCase', () => {
  it('should call ItemsRepository(create) correctly', async () => {
    const { sut, itemsRepository } = makeSut();
    const createSpy = jest.spyOn(itemsRepository, 'create');
    const input = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 10,
    };
    await sut.execute(input);
    expect(createSpy).toHaveBeenCalledWith(expect.any(Item));
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        description: input.description,
        price: input.price,
      })
    );
  });

  it('should throw if ItemsRepository(create) throws', async () => {
    const { sut, itemsRepository } = makeSut();
    jest.spyOn(itemsRepository, 'create').mockImplementationOnce(() => {
      throw new Error();
    });
    const input = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: 10,
    };
    const promise = sut.execute(input);
    expect(promise).rejects.toThrow(new Error());
  });
});
