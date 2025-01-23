'use client';

import { TransactionsView } from './transactions-view';
import { useTransactionsData } from './useTransactionsData';

export const TransactionsContainer = () => {
  const { connected, transactions, loadMore, hasMore } = useTransactionsData();
  return (
    <div>
      <TransactionsView
        transactions={transactions}
        loadMore={loadMore}
        hasMore={hasMore}
        isLiveConnected={connected}
      />
    </div>
  );
};
