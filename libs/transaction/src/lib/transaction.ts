export type Currency = {
  name: string;
  code: string;
  symbol: string;
};
export type Transaction = {
  id: string;
  code: string;
  transactionType: string;
  transactionDescription: string;
  currency: Currency;
  amount: string;
  routingNumber: string;
};
