import { Test } from '@nestjs/testing';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryRepository } from './product-inventory.repository';
import { PrismaService } from './prisma.service';

describe('product-inventory-service', () => {
  const getServices = async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductInventoryService,
        ProductInventoryRepository,
        PrismaService,
      ],
    }).compile();

    return {
      productInventoryService: moduleRef.get(ProductInventoryService),
      productInventoryRepository: moduleRef.get(ProductInventoryRepository),
    };
  };
  describe('getInventory', () => {
    it('should query repository', async () => {
      const { productInventoryService, productInventoryRepository } =
        await getServices();
      jest
        .spyOn(productInventoryRepository, 'getAllInventoryItems')
        .mockResolvedValue([]);

      const inventoryItems = await productInventoryService.getInventory();
      expect(inventoryItems).toEqual([]);
    });
  });
});
