import { logger } from '@animando/logger';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';

@Injectable()
export class TxPublishingService {
  amqpConnection: AmqpConnection;

  constructor(@Inject(AmqpConnection) amqpConnection: AmqpConnection) {
    this.amqpConnection = amqpConnection;
  }

  async publishTransactions() {
    const res = await this.amqpConnection?.publish(
      TOPIC_EXCHANGE_NAME,
      'tx.initiateTransactions',
      { value: 1 }
    );
    logger.info('initiate transactions', { res });
  }
}
