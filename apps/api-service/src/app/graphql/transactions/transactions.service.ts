import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';
import { Transaction } from '@animando/transaction';
import { PagedRequestMeta, PagedResponse } from '@animando/utils';
import { logger } from '@animando/logger';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(AmqpConnection)
    private readonly rabbitClient: AmqpConnection
  ) {}

  async getTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    return this.rabbitClient.request<PagedResponse<Transaction[]>>({
      exchange: TOPIC_EXCHANGE_NAME,
      routingKey: 'transactions.get.all',
      payload: {
        meta,
      },
    });
  }

  async getLatestTransactions(
    meta?: PagedRequestMeta
  ): Promise<PagedResponse<Transaction[]>> {
    logger.info('get latest trx', { meta });
    return this.rabbitClient.request<PagedResponse<Transaction[]>>({
      exchange: TOPIC_EXCHANGE_NAME,
      routingKey: 'transactions.get.latest',
      payload: {
        meta,
      },
    });
  }
}
