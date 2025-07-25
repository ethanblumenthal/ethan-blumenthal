import { z } from 'zod';

export const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  author: z.string().default('Ethan Blumenthal'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  publishedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createBlogPostSchema = blogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBlogPostSchema = blogPostSchema.partial().required({ id: true });

export type BlogPost = z.infer<typeof blogPostSchema>;
export type CreateBlogPost = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;