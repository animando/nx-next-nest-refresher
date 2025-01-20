'use client';

import { UrqlProvider } from '@urql/next';
import { useMemo } from 'react';
import { createClientAndSsr } from '../src/graphql/create-graphql-client';

export const GraphqlProvider = ({ children }: React.PropsWithChildren) => {
  const [client, ssr] = useMemo(() => {
    const [client, ssr] = createClientAndSsr();
    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
};
