import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction, TransactionToSave } from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';

@Injectable()
export class TransactionsService {
  constructor(private readonly repository: TransactionsRepository) {}

  async getAllTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    return this.repository.getAllTransactions(meta);
  }

  newTransaction(transaction: TransactionToSave) {
    return this.repository.saveTransaction(transaction);
  }
}
