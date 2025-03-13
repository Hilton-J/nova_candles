import { FcCellPhone } from 'react-icons/fc';
import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email').trim();
const passwordSchema = z.string().trim().min(3, 'Password must be at least 3 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


export const registerSchema = loginSchema.extend({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  cellPhoneNo: z.string().trim(),
  confirmPassword: passwordSchema,
  role: z.enum(['customer', 'admin']).default('customer'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });