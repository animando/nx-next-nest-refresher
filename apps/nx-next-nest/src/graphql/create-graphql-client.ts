import {
  cacheExchange,
  Client,
  createClient,
  fetchExchange,
  SSRExchange,
  ssrExchange,
} from '@urql/next';

export const createClientAndSsr = (): [Client, SSRExchange] => {
  const ssr = ssrExchange({
    isClient: typeof window !== 'undefined',
  });
  const client = createClient({
    url: 'http://localhost:22200/graphql',
    exchanges: [cacheExchange, ssr, fetchExchange],
    suspense: true,
  });

  return [client, ssr];
};
