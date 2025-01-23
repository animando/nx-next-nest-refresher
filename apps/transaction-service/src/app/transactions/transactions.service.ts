import { Inject, Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import {
  Transaction,
  TransactionSearch,
  TransactionToSave,
} from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { WEBSOCKETS_EXCHANGE_NAME } from '@animando/rabbit';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly repository: TransactionsRepository,
    @Inject(AmqpConnection) private amqpConnection: AmqpConnection
  ) {}

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

  async newTransaction(transaction: TransactionToSave) {
    const savedTransaction = await this.repository.saveTransaction(transaction);

    await this.amqpConnection.publish(
      WEBSOCKETS_EXCHANGE_NAME,
      'ws.publish.newTransaction',
      savedTransaction,
      {
        headers: {
          'animando-room': 'transactions',
        },
      }
    );
  }
}
