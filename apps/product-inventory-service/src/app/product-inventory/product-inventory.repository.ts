import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { InventoryItem } from '@prisma/client';

@Injectable()
export class ProductInventoryRepository {
  constructor(private prisma: PrismaService) {}

  async getAllInventoryItems(
  ): Promise<InventoryItem[]> {
    return this.prisma.inventoryItem.findMany();
  }
}