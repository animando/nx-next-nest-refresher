import { z } from 'zod';

export const inventoryItemSchema = z.object({
  id: z.number(),
  sku: z.string(),
  name: z.string(),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
