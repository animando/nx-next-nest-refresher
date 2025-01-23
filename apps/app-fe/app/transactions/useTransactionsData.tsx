import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Handler, useWebsocket } from './useWebsocket';
import { useQuery } from '@urql/next';

import {
  LatestTransactionsQuery,
  LatestTransactionsDocument,
} from './generated/transactions';
import { UITransaction } from './types';

type AddTransactions = (...t: UITransaction[]) => void;

type LoadMore = () => void;

const useTransactionsQuery = (
  addTransactions: AddTransactions
): { loadMore: LoadMore; hasMore: boolean; isLoading: boolean } => {
  const initialLoadDone = useRef<boolean>(false);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [nextTokenToUse, setNextTokenToUse] = useState<string | null>(null);
  const [{ data, fetching }, revalidate] = useQuery<LatestTransactionsQuery>({
    query: LatestTransactionsDocument,
    requestPolicy: 'cache-and-network',
    pause: true,
    variables: {
      limit: 200,
      nextToken: nextTokenToUse,
    },
  });
  useEffect(() => {
    if (data?.latestTransactions) {
      addTransactions(...data.latestTransactions.data);
      setNextToken(data.latestTransactions.meta.nextToken || null);
    }
  }, [data, addTransactions]);

  useEffect(() => {
    if (!initialLoadDone.current) {
      revalidate();
      initialLoadDone.current = true;
    }
  }, [revalidate]);

  const loadMore = useCallback<LoadMore>(() => {
    console.log('load more');
    setNextTokenToUse(nextToken);
    initialLoadDone.current = false;
  }, [nextToken]);
  return { loadMore, hasMore: nextToken !== null, isLoading: fetching };
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

export const useTransactionsData = () => {
  const [transactions, addTransactions] = useTransactionsStore();
  const { connected } = useTransactionsWebsocketConfig(addTransactions);
  const { loadMore, hasMore, isLoading } =
    useTransactionsQuery(addTransactions);
  return { connected, transactions, loadMore, hasMore, isLoading };
};
