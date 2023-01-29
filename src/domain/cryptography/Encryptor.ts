export type EncryptParams = {
  email: string;
};

export interface Encryptor {
  encrypt: (params: EncryptParams) => Promise<string>;
}
