import { Client, cacheExchange, fetchExchange } from 'urql';


export const client = new Client({
  url: 'http://localhost:22200/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
