export type Input = {
  cpf: string;
  orderItems: { itemId: string; quantity: number }[];
};

export type Output = void;
