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
    this.setName(name);
    this.setCpf(cpfData);
    this.setEmail(email);
    this.setPassword(password);
  }

  setName(name: string) {
    if (!name) throw new Error('O campo nome é obrigatório.');
    this.name = name;
  }

  setCpf(cpfData: string) {
    const cpf = new Cpf(cpfData);
    this.cpf = cpf;
  }

  setEmail(email: string) {
    if (!email) throw new Error('O campo E-mail é obrigatório.');
    this.email = email;
  }

  setPassword(password: string) {
    if (!password) throw new Error('O campo senha é obrigatório.');
    this.password = password;
  }
}
