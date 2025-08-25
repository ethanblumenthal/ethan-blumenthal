import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  status: z.enum(['prospect', 'qualified', 'engaged', 'converted', 'lost']).default('prospect'),
  group: z
    .enum(['venture_capital', 'private_equity', 'angel_investor', 'lender', 'broker'])
    .nullable()
    .optional(),
  labels: z.array(z.string()).default([]),
  notes: z.string().optional(),
  xProfile: z.string().optional(),
  linkedinProfile: z.string().optional(),
  source: z.enum(['website', 'linkedin', 'twitter', 'manual']).default('website'),
  leadScore: z.number().int().min(0).default(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactSchema = contactSchema.partial().required({ id: true });

export type Contact = z.infer<typeof contactSchema>;
export type CreateContact = z.infer<typeof createContactSchema>;
export type UpdateContact = z.infer<typeof updateContactSchema>;
