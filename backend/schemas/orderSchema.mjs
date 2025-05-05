import { z } from 'zod';
import mongoose from 'mongoose';

const addressSchema = z.object({
  recipientName: z.string().min(1, "Name required").trim(),
  recipientLastName: z.string().min(1, "Last Name required").trim(),
  recipientPhoneNumber: z
    .string()
    .min(9, "Phone Number must be at least 9 digits as per RSA")
    .trim(),
  streetAddress: z.string().min(1, "Street address required").trim(),
  apartment: z
    .string()
    .min(1, "Apartment must have characters")
    .trim()
    .optional(),
  city: z.string().min(1, "City required").trim(),
  province: z.string().min(1, "Province required").trim(),
  postalCode: z.coerce.number(),
});

export const orderedItems = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid id format'),
  productName: z.string(),
  quantity: z.coerce.number(),
  price: z.coerce.number(),
});

export const orderSchema = z.object({
  deliveryAddress: addressSchema,
  billingAddress: addressSchema,
  totalPrice: z.coerce.number(),
  items: z.array(orderedItems),
})
  .strict();