import mongoose from 'mongoose';
import { z } from 'zod';

export const reviewSchema = z.object({
  userId: z.string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id)),
  rating: z.enum([1, 2, 3, 4, 5]),
  date: z.date()
}).optional();

export const productSchema = z.object({
  productName: z.string().min(1),
  description: z.string().min(1),
  price: z.string().transform((number) => Number(number)),
  size: z.string(),
  stock: z.string().transform((number) => Number(number)),
  type: z.string(),
  images: z.array(z.string()).optional(),
});

export const updateProductSchema = z.object({
  productName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.string().transform((number) => Number(number)).optional(),
  size: z.string().optional(),
  stock: z.string().transform((number) => Number(number)).optional(),
  type: z.string().optional(),
  images: z.string().optional(),
});

// export default productSchema;