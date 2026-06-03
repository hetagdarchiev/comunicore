import { z } from 'zod';

import { passwordSchema } from '@/shared/lib/schemas/password.schema';

export const loginFormSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, 'Введите почту')
    .email({ message: 'Неверный формат почты' })
    .toLowerCase()
    .max(255, 'Email слишком длинный'),
  password: passwordSchema,
});

export type LoginFormTypes = z.infer<typeof loginFormSchema>;
