import { z } from 'zod';

const itemSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number(),
});

export const orderSchema = z.object({
  deliveryAddress: z.string(),
  billingAddress: z.string(),
  totalPrice: z.coerce.number(),
  items: z.array(itemSchema),
}).strict();