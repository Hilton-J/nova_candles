import { z } from 'zod';
import { itemSchema } from './cartSchema.mjs';


export const orderSchema = z.object({
  deliveryAddress: z.string(),
  billingAddress: z.string(),
  totalPrice: z.coerce.number(),
  items: z.array(itemSchema),
}).strict();