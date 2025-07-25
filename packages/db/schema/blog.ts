import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const blogStatusEnum = pgEnum('blog_status', ['draft', 'published', 'archived']);

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  author: text('author').default('Ethan Blumenthal').notNull(),
  status: blogStatusEnum('status').default('draft').notNull(),
  tags: text('tags').array().default(sql`'{}'`).notNull(),
  featuredImage: text('featured_image'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;