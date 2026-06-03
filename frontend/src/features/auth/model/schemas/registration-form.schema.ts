import * as z from 'zod';

import { passwordSchema } from '@/shared/lib/schemas/password.schema';

export const registrationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Введите имя' })
    .max(50, { message: 'Имя слишком длинное' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Введите почту' })
    .email({ message: 'Неверный формат почты' }),
  password: passwordSchema,
  policy: z.boolean().refine((val) => val, {
    message: 'Условия должны быть приняты',
  }),
});

export type RegistrationFormTypes = z.infer<typeof registrationFormSchema>;
