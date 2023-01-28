import { ItemsRepository } from '@/domain/repositories';
import { Output } from './dtos';
import { ListItems } from './ListItems';

export class ListItemsUseCase implements ListItems {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(): Promise<Output> {
    const items = await this.itemsRepository.list();
    return {
      items,
    };
  }
}
