export type Result = {
  email: string;
};

export interface Decryptor {
  decrypt: (cryptography: string) => Promise<Result>;
}
