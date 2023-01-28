import { Item } from '../entities';

export interface ItemsRepository {
  findById: (itemId: string) => Promise<Item | undefined>;
}
