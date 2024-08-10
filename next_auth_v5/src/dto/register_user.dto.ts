import { z } from 'zod';

export const registerUserDtoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})