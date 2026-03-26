import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().min(1, 'Введите почту').email('Некорректный формат почты'),
  password: z.string().min(1, 'Введите пароль'),
});

export type TAuthForm = z.infer<typeof authSchema>;
