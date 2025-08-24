import { z } from 'zod';

export const createPropertyZodSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(5, 'Description is required'),
    area: z.number().positive(),
  })
  .required();

export type CreatePropertyZodSchema = z.infer<typeof createPropertyZodSchema>;
