import z from 'zod';

export const searchSchema = z.object({
  search: z.string(),
});

export type SearchTypes = z.infer<typeof searchSchema>;
