import { Item } from '@/domain/entities';

export interface ItemsRepository {
  list: () => Promise<Item[]>;
  findById: (itemId: string) => Promise<Item | undefined>;
  create: (item: Item) => Promise<void>;
}
