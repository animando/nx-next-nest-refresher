import { LatestTransactionsQuery } from './generated/transactions';

export type UITransaction = Omit<
  NonNullable<LatestTransactionsQuery['latestTransactions']>['data'][number],
  '__typename'
>;
