import { z } from 'zod';

export const validationSchema = z.object({
  login: z.string().min(1, 'Введите почту'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginSchema = z.infer<typeof validationSchema>;
