import { cacheExchange, createClient, fetchExchange } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';

const makeClient = () => {
  return createClient({
    url: 'http://localhost:22200/graphql',
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const client = getClient();

export const getServersideGraphqlClient = () => {
  return client;
};
