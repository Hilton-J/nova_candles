import { FcCellPhone } from 'react-icons/fc';
import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email');
const passwordSchema = z.string().min(3, 'Password must be at least 3 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


export const registerSchema = loginSchema.extend({
  confirmPassword: passwordSchema,
  role: z.enum(['customer', 'admin']).default('customer'),
  firstName: z.string(),
  lastName: z.string(),
  cellPhoneNo: z.string(),

})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword'],
  });