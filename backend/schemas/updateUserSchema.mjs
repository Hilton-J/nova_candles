import { z } from 'zod';

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email').trim().optional(),
  password: z.string().trim().min(3, 'Password must be at least 3 characters').optional(),
  phoneNumber: z.string().optional(),
  isActive: z.boolean().optional()
})
  .strict();

export default updateUserSchema;