import { Module } from '@nestjs/common';
import { LoggerModule } from '@animando/logger';
import { WebsocketsModule } from './websockets/websockets.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [GraphQLModule, LoggerModule, WebsocketsModule],
})
export class AppModule {}
