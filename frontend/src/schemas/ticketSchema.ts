import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' })
    .nonempty({ message: 'Title is required' }),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(500, { message: 'Description cannot exceed 500 characters' })
    .nonempty({ message: 'Description is required' }),
});

export const updateTicketSchema = z.object({
    status: z
      .string()
      .nonempty({ message: 'Status is required' })
      .refine((val) => ['Open', 'In Progress', 'Closed'].includes(val), {
        message: 'Status must be one of "Open", "In Progress", or "Closed"',
      }),
  });
  
  export type TicketFormData = z.infer<typeof createTicketSchema>;
  export type UpdateTicketFormData = z.infer<typeof updateTicketSchema>;