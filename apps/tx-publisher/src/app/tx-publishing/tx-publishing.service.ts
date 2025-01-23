import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';
import { TransactionToSave } from '@animando/transaction';

@Injectable()
export class TxPublishingService {
  constructor(@Inject(AmqpConnection) private amqpConnection: AmqpConnection) {}

  async publishTransaction(transaction: TransactionToSave) {
    await this.amqpConnection.publish(
      TOPIC_EXCHANGE_NAME,
      'transaction.new',
      transaction
    );
  }
}
