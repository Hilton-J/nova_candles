import mongoose from 'mongoose';
import { z } from 'zod';

const reviewSchema = z.object({
  userId: z.string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id)),
  rating: z.enum([1, 2, 3, 4, 5]),
  date: z.date()
}).optional();

const productSchema = z.object({
  productName: z.string().min(1),
  description: z.string().min(1),
  price: z.string().transform((number) => Number(number)),
  size: z.string(),
  stock: z.string().transform((number) => Number(number)),
  type: z.string(),
  imgage: z.string().array().optional(),
});

export default productSchema;