import { Item } from '@/domain/entities';
import { ItemsRepository } from '@/domain/repositories';

export class ItemsRepositoryMemory implements ItemsRepository {
  public items: Item[] = [];

  async list(): Promise<Item[]> {
    return this.items;
  }

  async findById(itemId: string): Promise<Item | undefined> {
    const item = this.items.find((item) => item.id === itemId);
    return item;
  }

  async create(item: Item): Promise<void> {
    this.items.push({
      id: item.id,
      description: item.description,
      name: item.name,
      price: item.price,
    });
  }
}
