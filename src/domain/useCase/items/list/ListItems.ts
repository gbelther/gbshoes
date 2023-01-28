import { Output } from './dtos';

export interface ListItems {
  execute: () => Promise<Output>;
}
