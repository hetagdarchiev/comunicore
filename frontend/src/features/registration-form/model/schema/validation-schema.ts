import * as z from 'zod';

const minPasswordLength = 8;

export const validationSchema = z.object({
  name: z.string().min(1, 'Введите имя'),
  email: z.email('Неверный формат почты'),
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
