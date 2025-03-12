import mongoose from 'mongoose';
import { z } from 'zod';

export const reviewProductSchema = z.object({
  comment: z.string().optional(),
  rating: z.coerce.number().gte(1).lte(5)
});

export const productSchema = z.object({
  productName: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number(),
  size: z.string(),
  stock: z.coerce.number(),
  type: z.string(),
  images: z.array(z.string()).optional(),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.coerce.number().optional(),
  size: z.string().optional(),
  stock: z.coerce.number().optional(),
  type: z.string().optional(),
  images: z.string().optional(),
});

// export default productSchema;