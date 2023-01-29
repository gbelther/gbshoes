import { randomUUID } from 'node:crypto';
import { Cpf } from './Cpf';

type Params = {
  id?: string;
  name: string;
  cpfData: string;
  email: string;
  password: string;
};

export class Customer {
  id: string;
  name: string;
  cpf: Cpf;
  email: string;
  password: string;

  constructor({ id, name, cpfData, email, password }: Params) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.cpf = new Cpf(cpfData);
    this.email = email;
    this.password = password;
  }
}
