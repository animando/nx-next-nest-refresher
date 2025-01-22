export type Currency = {
  name: string;
  code: string;
  symbol: string;
};
export type Transaction = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  transactionDate: Date;
  trxId: string;
  code: string;
  transactionType: string;
  transactionDescription: string;
  currency: Currency;
  amount: number;
  routingNumber: string;
};
export type TransactionToSave = Omit<
  Transaction,
  'id' | 'createdAt' | 'updatedAt'
>;
