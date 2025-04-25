import { z, ZodLazy } from 'zod';
import mongoose from 'mongoose';

export const itemSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid id format'),
  quantity: z.coerce.number().default(1),
  price: z.number(),
  size: z.string(),
  productName: z.string().optional(),
  fragrance: z.string().optional(),
  image: z.string().optional(),
});