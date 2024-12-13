import { Module } from '@nestjs/common';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  providers: [ProductInventoryService,ProductInventoryController],
})
export class ProductInventoryModule {}
