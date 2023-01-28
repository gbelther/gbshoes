import { Item } from '../../../entities';
import { ItemsRepository } from '../../../repositories';

export class ItemsRepositoryMemory implements ItemsRepository {
  public items: Item[] = [];

  async findById(itemId: string): Promise<Item | undefined> {
    const item = this.items.find((item) => item.id === itemId);
    return item;
  }
}
