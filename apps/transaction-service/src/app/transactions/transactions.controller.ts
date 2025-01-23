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
import { createQueueName, TOPIC_EXCHANGE_NAME } from '@animando/rabbit';
import { TransactionSearch, TransactionToSave } from '@animando/transaction';
import { Message } from 'amqplib';
import { PagedRequestMeta } from '@animando/utils';

const RETRIES = 5;

const createRpcQueueName = createQueueName('transaction-service')('rpc');
const createTopicQueueName = createQueueName('transaction-service')('topic');

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @RabbitRPC({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'transactions.get.all',
    queue: createRpcQueueName('transactions.get.all'),
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
    queue: createRpcQueueName('transactions.get.latest'),
    queueOptions: {
      durable: false,
      autoDelete: false,
    },
  })
  getLatestTransactions(
    @RabbitPayload()
    request: {
      meta?: PagedRequestMeta;
      search?: TransactionSearch;
    }
  ) {
    try {
      return this.transactionsService.getLatestTransactions(
        request.meta,
        request.search
      );
    } catch (err) {
      logger.error('Error fetching transactions', err);
      return new Nack(false);
    }
  }

  @RabbitSubscribe({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'transaction.new',
    queue: createTopicQueueName('transaction.new'),
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
