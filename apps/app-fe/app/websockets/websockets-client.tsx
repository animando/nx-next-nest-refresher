'use client';
import { useCallback, useMemo, useState } from 'react';
import { useWebsocket } from './useWebsocket';

const useTransactionsWebsocketConfig = () => {
  const [transactions, setTransactions] = useState<unknown[]>([]);
  const onNewTransaction = useCallback((trx: unknown) => {
    setTransactions((t) => t.concat(trx));
  }, []);
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

  return { connected, transactions };
};
export const WebsocketsClient = () => {
  const { connected, transactions } = useTransactionsWebsocketConfig();

  return (
    <div>
      <p>Hello websockets - {connected ? 'Connected' : 'Disconnected'}</p>
      {transactions.map((t, idx) => (
        <p key={idx}>{JSON.stringify(t)}</p>
      ))}
    </div>
  );
};
