import {
  cacheExchange,
  Client,
  createClient,
  fetchExchange,
  SSRExchange,
  ssrExchange,
} from '@urql/next';

const apiServiceUrl = process.env['NEXT_PUBLIC_API_SERVICE_URL'] || '';

export const createClientAndSsr = (): [Client, SSRExchange] => {
  const ssr = ssrExchange({
    isClient: typeof window !== 'undefined',
  });
  const client = createClient({
    url: `${apiServiceUrl}/graphql`,
    exchanges: [cacheExchange, ssr, fetchExchange],
    suspense: true,
  });

  return [client, ssr];
};
