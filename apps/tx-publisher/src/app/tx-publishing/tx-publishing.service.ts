import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { WEBSOCKETS_EXCHANGE_NAME } from '@animando/rabbit';
import { Transaction } from '@animando/transaction';

@Injectable()
export class TxPublishingService {
  amqpConnection: AmqpConnection;

  constructor(@Inject(AmqpConnection) amqpConnection: AmqpConnection) {
    this.amqpConnection = amqpConnection;
  }

  async publishTransaction(transaction: Transaction) {
    return this.amqpConnection?.publish(
      WEBSOCKETS_EXCHANGE_NAME,
      'ws.publish.newTransaction',
      transaction,
      {
        headers: {
          'animando-room': 'transactions',
        },
      }
    );
  }
}
