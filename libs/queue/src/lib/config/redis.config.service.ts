import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get host() {
    return this.configService.getOrThrow('REDIS_HOST');
  }

  public get port() {
    return Number(this.configService.getOrThrow('REDIS_PORT'));
  }
}
