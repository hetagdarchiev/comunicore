import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'Пароль должен быть не менее 8 символов' })
  .regex(/[a-z]/, {
    message: 'Пароль должен содержать хотя бы одну строчную букву',
  })
  .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
