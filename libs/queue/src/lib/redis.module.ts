import { Module } from '@nestjs/common';
import { RedisConnectionOptionsSymbol } from './redis.symbols';
import { RedisConfigService } from './config/redis.config.service';
import { RedisConfigModule } from './config/redis.config.module';

export type RedisConnectionOptions = {
  host: string;
  port: number;
};
const redisConnectionOptionsFactory = (
  configService: RedisConfigService
): RedisConnectionOptions => ({
  host: configService.host,
  port: configService.port,
});

@Module({
  controllers: [],
  providers: [
    {
      provide: RedisConnectionOptionsSymbol,
      useFactory: redisConnectionOptionsFactory,
      inject: [RedisConfigService],
    },
  ],
  exports: [RedisConnectionOptionsSymbol],
  imports: [RedisConfigModule],
})
export class RedisModule {}
