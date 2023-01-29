export type HashCompareParams = {
  plainText: string;
  hash: string;
};

export interface HashCompare {
  compare: (params: HashCompareParams) => Promise<boolean>;
}
