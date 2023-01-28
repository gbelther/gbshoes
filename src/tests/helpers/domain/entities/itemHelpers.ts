import { Item } from '@/domain/entities';
import { faker } from '@faker-js/faker';

export const makeItem = (): Item =>
  new Item(
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    5
  );
