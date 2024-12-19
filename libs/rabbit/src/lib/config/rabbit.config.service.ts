import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get host() {
    return this.configService.getOrThrow('RABBIT_HOST');
  }

  public get port() {
    return Number(this.configService.getOrThrow('RABBIT_PORT'));
  }

  public get url() {
    return `amqp://${this.host}:${this.port}`;
  }

  public get queueName() {
    return this.configService.getOrThrow('RABBIT_QUEUE_NAME');
  }
}
