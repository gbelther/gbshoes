import { Item } from '@/domain/entities';
import { ItemsRepository } from '@/domain/repositories';
import { CreateItem } from './CreateItem';
import { Input } from './dtos';

export class CreateItemUseCase implements CreateItem {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(input: Input): Promise<void> {
    const item = new Item(input.name, input.description, input.price);
    await this.itemsRepository.create(item);
  }
}
