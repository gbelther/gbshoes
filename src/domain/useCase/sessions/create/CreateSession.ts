import { Input, Output } from './dtos';

export interface CreateSession {
  execute: (input: Input) => Promise<Output>;
}
