// Client-safe schemas (no database imports)
import { z } from 'zod';

export const createContactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),  
  website: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterHandle: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  group: z.enum(['venture_capital', 'private_equity', 'angel_investor', 'lender', 'broker']).optional(),
  labels: z.array(z.string()).default([]),
  notes: z.string().optional(),
  allowMarketing: z.boolean().default(false),
  source: z.enum(['website', 'linkedin', 'twitter', 'manual']).default('website'),
});

export type CreateContact = z.infer<typeof createContactSchema>;

export const createNewsletterSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  topics: z.array(z.string()).default(['proptech']),
  source: z.string().default('newsletter'),
});

export type CreateNewsletterSignup = z.infer<typeof createNewsletterSignupSchema>;