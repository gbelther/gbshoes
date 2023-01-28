import { Input, Output } from './dtos';

export interface CreateOrder {
  execute: (input: Input) => Promise<Output>;
}
