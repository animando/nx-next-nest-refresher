import { ProductInventoryService } from './product-inventory.service';
import { Controller } from '@nestjs/common';
import { logger } from '@animando/logger';
import { RabbitRPC, RabbitSubscribe, Nack } from '@golevelup/nestjs-rabbitmq';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';
import { createQueueName } from '@animando/rabbit';

const createRpcQueueName = createQueueName('product-inventory-service')('rpc');
const createTopicQueueName = createQueueName('product-inventory-service')(
  'topic'
);

@Controller()
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @RabbitRPC({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'inventory.get',
    queue: createRpcQueueName('inventory.get'),
    queueOptions: {
      durable: false,
      autoDelete: false,
    },
  })
  getInventory() {
    if (Math.random() > 2 / 3) {
      logger.info('random failure');
      return new Nack(true);
    }
    logger.info('get inventory');
    return this.productInventory.getInventory();
  }

  @RabbitSubscribe({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'tx.msg.*',
    queue: createTopicQueueName('tx.msg.*'),
    queueOptions: {
      durable: true,
      autoDelete: false,
      deadLetterRoutingKey: 'dlq.tx.msg',
      deadLetterExchange: TOPIC_EXCHANGE_NAME,
    },
  })
  publishTransactions(arg1: any, arg2: any) {
    if (Math.random() > 2 / 3) {
      logger.info('initiateTx - random failure');
      return new Nack(false);
    }
    logger.info('initiateTx', arg1, arg2);
  }

  @RabbitSubscribe({
    exchange: TOPIC_EXCHANGE_NAME,
    routingKey: 'tx.broadcast',
    queue: createTopicQueueName(`tx.broadcast`, true),
    queueOptions: {
      durable: false,
      autoDelete: true,
    },
  })
  broadcastProcessor() {
    if (Math.random() > 2 / 3) {
      logger.info('broadcastProcessor - random failure');
      return new Nack(false);
    }
    logger.info('broadcastProcessor');
  }
}
