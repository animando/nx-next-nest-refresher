import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryController } from './product-inventory.controller';
import { PrismaService } from './prisma.service';
import { ProductInventoryRepository } from './product-inventory.repository';

@Module({
  imports: [],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService, PrismaService, ProductInventoryRepository],
})
export class ProductInventoryModule {}
