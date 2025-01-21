import {
  OnGatewayInit,
  SubscribeMessage,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { logger } from '@animando/logger';
import { Cron } from '@nestjs/schedule';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { TxPublishingService } from './tx-publishing.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketEventsGateway
  implements OnGatewayInit<Server>, OnGatewayConnection<Socket>
{
  @WebSocketServer()
  private server?: Server;

  txPublishingService: TxPublishingService;

  constructor(
    @Inject(TxPublishingService) txPublishingService: TxPublishingService
  ) {
    this.txPublishingService = txPublishingService;
  }

  afterInit(server: Server) {
    this.server = server;
  }

  async handleConnection(client: Socket, ...args: unknown[]) {
    logger.info('client connected', client.id, args);
    await client.join('connected');
    client.emit('from-server', 'you are connected');
  }

  @SubscribeMessage('events')
  async findAll(): Promise<WsResponse<number>[]> {
    logger.info('got event');
    await this.txPublishingService.publishTransactions();
    logger.info('published');
    return [1, 2, 3].map((item) => ({ event: 'from-server', data: item }));
  }

  @Cron('*/10 * * * * *')
  handleCron() {
    if (!this.server) {
      logger.info('No server');
      return;
    }
    logger.info('Use server');
    this.server.in('connected').emit('from-server', 'cron');
  }
}
