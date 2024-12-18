import { Module } from '@nestjs/common';
import { ProductInventoryResolver } from './product-inventory.resolver';
import { ProductInventoryService } from './product-inventory.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { QueueModule } from '@org/queue';
import { INVENTORY_TASKS_QUEUE } from '@org/inventory';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ClientsModule.register([
      {
        name: PRODUCT_INVENTORY_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
          ],
          queue: process.env.RABBIT_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    QueueModule.register(INVENTORY_TASKS_QUEUE),
  ],
  providers: [ProductInventoryService, ProductInventoryResolver],
})
export class ProductInventoryModule {}
