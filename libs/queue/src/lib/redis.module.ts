import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConnectionOptionsSymbol } from './redis.symbols';

export type RedisConnectionOptions = {
  host: string;
  port: number;
};
const redisConnectionOptionsFactory = (
  configService: ConfigService
): RedisConnectionOptions => ({
  host: configService.getOrThrow<string>('REDIS_HOST'),
  port: Number(configService.getOrThrow<string>('REDIS_PORT')),
});

@Module({
  controllers: [],
  providers: [
    {
      provide: RedisConnectionOptionsSymbol,
      useFactory: redisConnectionOptionsFactory,
      inject: [ConfigService],
    },
  ],
  exports: [RedisConnectionOptionsSymbol],
  imports: [ConfigModule.forRoot()],
})
export class RedisModule {}
