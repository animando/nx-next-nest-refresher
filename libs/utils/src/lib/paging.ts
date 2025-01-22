export type PagedResponse<T> = {
  data: T;
  meta: {
    count: number;
    nextToken?: string;
  };
};

export type PagedRequestMeta = {
  limit?: number;
  nextToken?: string;
};

type NextTokenV1 = {
  v: 1;
  skip: number;
};
export const getSkipFromMeta = (meta?: PagedRequestMeta): number => {
  const skip = meta?.nextToken
    ? (JSON.parse(atob(meta.nextToken)) as NextTokenV1).skip
    : undefined;
  return skip || 0;
};

export const createNextToken = (skip: number): string => {
  const tokenObj: NextTokenV1 = {
    v: 1,
    skip,
  };
  return btoa(JSON.stringify(tokenObj));
};
