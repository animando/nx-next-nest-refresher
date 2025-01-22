import { TransactionsService } from './transactions.service';
import { Controller } from '@nestjs/common';
import { logger } from '@animando/logger';
import {
  Nack,
  RabbitPayload,
  RabbitRequest,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';
import { TransactionToSave } from '@animando/transaction';
import { Message } from 'amqplib';
import { PagedRequestMeta } from '@animando/utils';

const RETRIES = 5;

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @RabbitRPC({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'transactions.get.all',
    queue: 'rpc-queue',
    queueOptions: {
      durable: false,
      autoDelete: false,
    },
  })
  async getAllTransactions({ meta }: { meta?: PagedRequestMeta }) {
    logger.info('get all transactions', { meta });
    const allTransactions = await this.transactionsService.getAllTransactions(
      meta
    );
    logger.info('all transactions', { allTransactions });
    return allTransactions;
  }

  @RabbitRPC({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'transactions.get.latest',
    queue: 'rpc-queue-latest',
    queueOptions: {
      durable: false,
      autoDelete: false,
    },
  })
  getLatestTransactions(
    @RabbitPayload()
    request: { meta?: PagedRequestMeta },
    @RabbitRequest() message: Message
  ) {
    logger.info('get latest transactions xx', {
      request,
      isUnde: request === undefined,
    });
    const {
      fields: { deliveryTag },
    } = message;
    try {
      return this.transactionsService.getLatestTransactions(request?.meta);
    } catch (err: any) {
      logger.info('caught error', { deliveryTag });
      logger.error(err.message);
      return new Nack(false);
    }
  }

  @RabbitSubscribe({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'transaction.new',
    queue: 'transaction-service',
    queueOptions: {
      durable: true,
      autoDelete: false,
    },
  })
  async newTransaction(
    @RabbitPayload() transactionToSave: TransactionToSave,
    @RabbitRequest() message: Message
  ) {
    const {
      fields: { deliveryTag },
    } = message;
    try {
      const transaction = await this.transactionsService.newTransaction(
        transactionToSave
      );
      logger.info('Saved transaction', { transaction });
    } catch (err) {
      logger.error('Error saving transaction', err);

      return new Nack(deliveryTag < RETRIES);
    }
  }
}
