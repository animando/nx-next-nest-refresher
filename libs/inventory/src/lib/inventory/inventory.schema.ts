import { z } from 'zod';

const oneOffPriceDetailsSchema = z.object({
  type: z.literal('oneoff'),
  price: z.number(),
});
const subscriptionPriceDetailsSchema = z.object({
  type: z.literal('subscription'),
  subscriptionDurationMonths: z.number(),
  initialPrice: z.number(),
  monthlyPrice: z.number(),
});

export const priceDetailsSchema = z.discriminatedUnion('type', [
  oneOffPriceDetailsSchema,
  subscriptionPriceDetailsSchema,
]);
export const inventoryItemSchema = z.object({
  id: z.number(),
  sku: z.string(),
  name: z.string(),
  currency: z.string().optional(),
  priceDetails: priceDetailsSchema.optional(),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type PriceDetails = z.infer<typeof priceDetailsSchema>;
