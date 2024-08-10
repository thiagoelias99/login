"use server"

import { registerUserDtoSchema } from '@/dto/register_user.dto';
import { z } from 'zod';

export async function registerUser(dto: z.infer<typeof registerUserDtoSchema>) {
  console.log(dto)
}