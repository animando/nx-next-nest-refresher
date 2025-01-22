import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction, TransactionToSave } from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';
import { logger } from '@animando/logger';

@Injectable()
export class TransactionsService {
  constructor(private readonly repository: TransactionsRepository) {}

  getAllTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    return this.repository.getAllTransactions(meta);
  }

  getLatestTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('1');
    return this.repository.getLatestTransactions(meta);
  }

  newTransaction(transaction: TransactionToSave) {
    return this.repository.saveTransaction(transaction);
  }
}
