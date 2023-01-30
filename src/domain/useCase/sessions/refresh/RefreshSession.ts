import { Input, Output } from './dtos';

export interface RefreshSession {
  execute: (input: Input) => Promise<Output>;
}
