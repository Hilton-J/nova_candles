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
  isActive: z.string().optional() //z.coerce.boolean() will not work because it does not behave the way is expected
});

export const imageScheme = z.coerce.string().base64().optional();



// export default productSchema;