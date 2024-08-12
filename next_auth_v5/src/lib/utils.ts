import { z } from 'zod';

export const signFormSchema = ({ type }: SignFormProps) => z.object({
  firstName: type !== "sign-up" ? z.string().optional() : z.string().min(1),
  lastName: type !== "sign-up" ? z.string().optional() : z.string().min(1),
  email: type === "reset-password" ? z.string().optional() : z.string().email(),
  password: z.string().min(6),
  confirmPassword: type === "sign-in" ? z.string().optional() : z.string().min(6),
})