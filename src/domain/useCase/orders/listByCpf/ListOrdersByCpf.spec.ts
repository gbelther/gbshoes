import { Order } from '@/domain/entities';
import { OrdersRepositoryMemory } from '@/infra/repositories/memory';
import { ListOrdersByCpfUseCase } from './ListOrdersByCpfUseCase';

type SutResult = {
  sut: ListOrdersByCpfUseCase;
  ordersRepository: OrdersRepositoryMemory;
};

const makeSut = (): SutResult => {
  const ordersRepository = new OrdersRepositoryMemory();
  const sut = new ListOrdersByCpfUseCase(ordersRepository);
  return {
    sut,
    ordersRepository,
  };
};

describe('ListOrdersByCpf UseCase', () => {
  it('should throw if OrdersRepository(listByCpf) throws', async () => {
    const { sut, ordersRepository } = makeSut();
    jest.spyOn(ordersRepository, 'listByCpf').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.execute('any_cpf');
    await expect(promise).rejects.toThrow();
  });

  it('should call OrdersRepository(listByCpf) correctly', async () => {
    const { sut, ordersRepository } = makeSut();
    const listByCpfSpy = jest.spyOn(ordersRepository, 'listByCpf');
    const cpf = 'any_cpf';
    await sut.execute(cpf);
    expect(listByCpfSpy).toHaveBeenCalledWith(cpf);
  });

  it('should return orders correctly', async () => {
    const { sut, ordersRepository } = makeSut();
    const order1 = new Order({ cpfData: '980.559.411-49' });
    const order2 = new Order({ cpfData: '546.018.517-34' });
    const order3 = new Order({ cpfData: '980.559.411-49' });
    ordersRepository.orders = [order1, order2, order3];
    const cpf = '980.559.411-49';
    const result = await sut.execute(cpf);
    expect(result).toEqual(expect.arrayContaining([order1, order3]));
  });
});
