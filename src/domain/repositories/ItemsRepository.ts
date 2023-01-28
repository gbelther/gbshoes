import { Item } from '@/domain/entities';

export interface ItemsRepository {
  findById: (itemId: string) => Promise<Item | undefined>;
  create: (item: Item) => Promise<void>;
}
