import { z } from 'zod';

export const validationSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Введите почту')
    .email({ message: 'Неверный формат почты' })
    .toLowerCase()
    .max(255, 'Email слишком длинный'),
  password: z.string().min(1, 'Введите пароль'),
});

export type LoginSchema = z.infer<typeof validationSchema>;
