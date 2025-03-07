import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


export const registerSchema = loginSchema.extend({
  confirmPassword: passwordSchema,
  role: z.enum(['customer', 'admin']).default('customer'),

})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });