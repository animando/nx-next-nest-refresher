import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';

const url =
  process.env['NEXT_PUBLIC_API_SERVICE_URL'] || 'http://localhost:22200';
const makeClient = () => {
  return createClient({
    url: `${url}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const client = getClient();

export const getServersideGraphqlClient = () => {
  return client;
};
