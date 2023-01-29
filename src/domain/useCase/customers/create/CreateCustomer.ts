import { Input, Output } from './dtos';

export interface CreateCustomer {
  execute: (input: Input) => Promise<Output>;
}
