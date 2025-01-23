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

type SkipNextTokenV1 = {
  v: 1;
  skip: number;
};
type CursorNextTokenV1 = {
  v: 1;
  cursor: string;
};
export const getSkipFromMeta = (meta?: PagedRequestMeta): number => {
  const skip = meta?.nextToken
    ? (JSON.parse(atob(meta.nextToken)) as SkipNextTokenV1).skip
    : undefined;
  return skip || 0;
};
export const getCursorFromMeta = (
  meta?: PagedRequestMeta
): string | undefined => {
  const cursor = meta?.nextToken
    ? (JSON.parse(atob(meta.nextToken)) as CursorNextTokenV1).cursor
    : undefined;
  return cursor || undefined;
};

export const createCursorNextToken = (cursor: string): string => {
  const tokenObj: CursorNextTokenV1 = {
    v: 1,
    cursor,
  };
  return btoa(JSON.stringify(tokenObj));
};
export const createSkipNextToken = (skip: number): string => {
  const tokenObj: SkipNextTokenV1 = {
    v: 1,
    skip,
  };
  return btoa(JSON.stringify(tokenObj));
};
