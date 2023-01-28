import { ItemsRepositoryMemory } from '@/infra/repositories/memory';
import { makeItem } from '@/tests/helpers/domain/entities';
import { ListItemsUseCase } from './ListItemsUseCase';

type SutResult = {
  sut: ListItemsUseCase;
  itemsRepository: ItemsRepositoryMemory;
};

const makeSut = (): SutResult => {
  const itemsRepository = new ItemsRepositoryMemory();
  const sut = new ListItemsUseCase(itemsRepository);
  return {
    sut,
    itemsRepository,
  };
};

describe('ListItems UseCase', () => {
  it('should call ItemsRepository(list) correctly', async () => {
    const { sut, itemsRepository } = makeSut();
    const listSpy = jest.spyOn(itemsRepository, 'list');
    await sut.execute();
    expect(listSpy).toHaveBeenCalled();
  });

  it('should throw if ItemsRepository(list) throws', async () => {
    const { sut, itemsRepository } = makeSut();
    jest.spyOn(itemsRepository, 'list').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute();
    await expect(promise).rejects.toThrow(new Error());
  });

  it('should return items correctly', async () => {
    const { sut, itemsRepository } = makeSut();
    const items = [makeItem(), makeItem()];
    itemsRepository.items = items;
    const result = await sut.execute();
    expect(result.items).toEqual(expect.arrayContaining(items));
  });
});
