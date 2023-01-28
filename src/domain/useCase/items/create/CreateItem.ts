import { Input, Output } from './dtos';

export interface CreateItem {
  execute: (input: Input) => Promise<Output>;
}
