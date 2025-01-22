import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import {
  Transaction,
  TransactionSearch,
  TransactionToSave,
} from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';

@Injectable()
export class TransactionsService {
  constructor(private readonly repository: TransactionsRepository) {}

  getAllTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    return this.repository.getAllTransactions(meta);
  }

  getLatestTransactions(
    meta: PagedRequestMeta | undefined,
    search: TransactionSearch | undefined
  ): Promise<PagedResponse<Transaction[]>> {
    return this.repository.getLatestTransactions(meta, search);
  }

  newTransaction(transaction: TransactionToSave) {
    return this.repository.saveTransaction(transaction);
  }
}
