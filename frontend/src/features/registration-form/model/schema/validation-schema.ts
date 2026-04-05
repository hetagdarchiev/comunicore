import * as z from 'zod';

const minPasswordLength = 8;

export const validationSchema = z.object({
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
  password: z
    .string()
    .min(
      minPasswordLength,
      `Пароль должен содержать не менее ${minPasswordLength} символов`,
    )
    .regex(/[a-zA-Z]/, 'Пароль должен содержать хотя бы одну латинскую букву')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/,
      'Используйте только латиницу и спецсимволы',
    ),
  policy: z.boolean().refine((val) => val, {
    message: 'Условия должны быть приняты',
  }),
});

export type TRegistrationForm = z.infer<typeof validationSchema>;
