import { z } from 'zod';

export const itemSchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number(),
});

export const cartSchema = z.object({

});