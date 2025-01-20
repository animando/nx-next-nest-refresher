import { Module } from '@nestjs/common';
import { ProductInventoryResolver } from './product-inventory.resolver';
import { ProductInventoryService } from './product-inventory.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { QueueModule } from '@animando/queue';
import { INVENTORY_TASKS_QUEUE } from '@animando/inventory';
import { RabbitModule } from '@animando/rabbit';
import { PriceDetailsResolver } from './price-details.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    RabbitModule,
    QueueModule.register(INVENTORY_TASKS_QUEUE),
  ],
  providers: [
    ProductInventoryService,
    ProductInventoryResolver,
    PriceDetailsResolver,
  ],
})
export class ProductInventoryModule {}
