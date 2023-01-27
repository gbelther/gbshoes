import { Cpf } from './Cpf';

export class Customer {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly cpf: Cpf,
    readonly email: string,
    readonly password: string
  ) {}
}
