import { randomUUID } from 'node:crypto';

export class Item {
  id: string;

  constructor(
    readonly name: string,
    readonly description: string,
    readonly price: number,
    id?: string
  ) {
    this.id = id ?? randomUUID();
  }
}
