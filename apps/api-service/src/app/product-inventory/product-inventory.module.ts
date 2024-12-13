import { Module } from '@nestjs/common';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
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
  ],
  providers: [ProductInventoryService, ProductInventoryController],
})
export class ProductInventoryModule {}
