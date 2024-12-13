import { z } from "zod";

export const inventoryItemSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
})

export type InventoryItem = z.infer<typeof inventoryItemSchema>