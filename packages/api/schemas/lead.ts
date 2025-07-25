import { z } from 'zod';

export const leadSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  platform: z.enum(['twitter', 'linkedin']),
  profileUrl: z.string().url('Valid profile URL is required'),
  xProfile: z.string().optional(),
  linkedinProfile: z.string().optional(),
  followerCount: z.number().int().min(0).optional(),
  engagementScore: z.number().min(0).max(1).optional(),
  createdAt: z.date().optional(),
});

export const createLeadSchema = leadSchema.omit({
  id: true,
  createdAt: true,
});

export const updateLeadSchema = leadSchema.partial().required({ id: true });

export type Lead = z.infer<typeof leadSchema>;
export type CreateLead = z.infer<typeof createLeadSchema>;
export type UpdateLead = z.infer<typeof updateLeadSchema>;