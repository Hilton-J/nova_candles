import { z } from 'zod';
import mongoose from 'mongoose';

export const itemSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid id format'),
  quantity: z.coerce.number().default(1),
  price: z.coerce.number(),
  size: z.string(),
  productName: z.string(),
  fragrance: z.string(),
  image: z.string(),
});