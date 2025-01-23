import { Controller, Inject } from '@nestjs/common';
import {
  RabbitSubscribe,
  RabbitRequest,
  RabbitPayload,
  RabbitHeader,
} from '@golevelup/nestjs-rabbitmq';
import { createQueueName, WEBSOCKETS_EXCHANGE_NAME } from '@animando/rabbit';
import { Message } from 'amqplib';
import { WebsocketEventsGateway } from './ws-events-gateway.service';
import { logger } from '@animando/logger';

const createTopicQueueName = createQueueName('api-service')('topic');

@Controller()
export class WebsocketsController {
  constructor(
    @Inject(WebsocketEventsGateway) private wsGateway: WebsocketEventsGateway
  ) {}

  @RabbitSubscribe({
    exchange: WEBSOCKETS_EXCHANGE_NAME,
    routingKey: 'ws.publish.*',
    queue: createTopicQueueName('ws.publish.*'),
    queueOptions: {
      durable: false,
      autoDelete: true,
    },
  })
  publishWebsocketMessage(
    @RabbitPayload() payload: unknown,
    @RabbitRequest() request: Message,
    @RabbitHeader('animando-room') room?: string
  ) {
    const {
      fields: { routingKey },
    } = request;
    const match = routingKey.match(/ws\.publish\.(\w+)/);
    const event = match?.[1];
    if (!event) {
      logger.warn('Unable to parse event from routing key', { routingKey });
      return;
    }
    if (room) {
      this.wsGateway.sendMessageToRoom(room, event, payload);
    } else {
      this.wsGateway.sendMessageToAllClients(event, payload);
    }
  }
}
