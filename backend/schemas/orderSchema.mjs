import { z } from 'zod';

export const orderSchema = z.object({
  orderNumber: z.string(),
  quantity: z.coerce.number(),
  items: z.array(z.string()),
  
})