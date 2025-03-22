import { z } from 'zod';

export const updateUserSchema = loginSchema.extend({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  phoneNumber: z.string().optional(),
  confirmPassword: passwordSchema.optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });