export interface Hash {
  hash: (plainText: string) => Promise<string>;
}
