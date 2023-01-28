import { Output } from './dtos';

export interface ListOrdersByCpf {
  execute: (cpf: string) => Promise<Output>;
}
