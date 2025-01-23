'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handler, useWebsocket } from './useWebsocket';
import { useQuery, UseQueryExecute } from '@urql/next';

import {
  LatestTransactionsQuery,
  LatestTransactionsDocument,
} from './generated/transactions';

type UITransaction = Omit<
  NonNullable<LatestTransactionsQuery['latestTransactions']>['data'][number],
  '__typename'
>;
type AddTransactions = (...t: UITransaction[]) => void;

type LoadMore = () => void;

const useTransactionsQuery = (
  addTransactions: AddTransactions
): [LoadMore, boolean] => {
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [nextTokenToUse, setNextTokenToUse] = useState<string | null>(null);
  const [{ data }, revalidate] = useQuery<LatestTransactionsQuery>({
    query: LatestTransactionsDocument,
    requestPolicy: 'cache-and-network',
    pause: true,
    variables: {
      limit: 5,
      nextToken: nextTokenToUse,
    },
  });
  useEffect(() => {
    console.log('data updated');
    if (data?.latestTransactions) {
      addTransactions(...data.latestTransactions.data);
      setNextToken(data.latestTransactions.meta.nextToken || null);
    }
  }, [data, addTransactions]);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  const loadMore = useCallback<LoadMore>(() => {
    setNextTokenToUse(nextToken);
  }, [nextToken]);
  return [loadMore, nextToken !== null];
};

const useTransactionsStore = (): [UITransaction[], AddTransactions] => {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);

  const addTransactions = useCallback<AddTransactions>(
    (...transactions: UITransaction[]) => {
      setTransactions((t) => t.concat(transactions));
    },
    []
  );
  return [transactions, addTransactions];
};

const useTransactionsWebsocketConfig = (addTransactions: AddTransactions) => {
  const onNewTransaction = useCallback(
    (trx: UITransaction) => {
      addTransactions(trx);
    },
    [addTransactions]
  ) as Handler;
  const config = useMemo(
    () => ({
      rooms: ['transactions'],
      handlers: {
        newTransaction: onNewTransaction,
      },
    }),
    [onNewTransaction]
  );
  const { connected } = useWebsocket(config);

  return { connected };
};

export const WebsocketsClient = () => {
  const [transactions, addTransactions] = useTransactionsStore();
  const { connected } = useTransactionsWebsocketConfig(addTransactions);
  const [loadMore, hasMore] = useTransactionsQuery(addTransactions);

  return (
    <div>
      <p>Hello websockets - {connected ? 'Connected' : 'Disconnected'}</p>
      <button disabled={!hasMore} onClick={loadMore}>
        Load More
      </button>
      {transactions.map((t, idx) => (
        <p key={idx}>{JSON.stringify(t)}</p>
      ))}
    </div>
  );
};
