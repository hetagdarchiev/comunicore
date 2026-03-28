import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Введите почту'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
