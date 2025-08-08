import { z } from 'zod';
import { eq, desc, and, or, like, count, sql } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { createBlogPostSchema, updateBlogPostSchema } from '../schemas/blog';
import { db, blogPosts } from '@personal-app/db';

export const blogRouter = router({
  // Get all blog posts with optional filtering
  getAll: publicProcedure
    .input(
      z.object({
        status: z.enum(['draft', 'published', 'archived']).optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        limit: z.number().min(1).max(1000).default(50),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      try {
        const { status, tags, author, limit = 50, offset = 0 } = input || {};
        
        const conditions = [];

        if (status) {
          conditions.push(eq(blogPosts.status, status));
        }
        if (author) {
          conditions.push(like(blogPosts.author, `%${author}%`));
        }
        if (tags && tags.length > 0) {
          // Check if any of the provided tags are in the blog post's tags array
          conditions.push(
            or(...tags.map(tag => sql`${blogPosts.tags} @> ${[tag]}`))
          );
        }

        // Execute queries
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [postResults, totalResult] = await Promise.all([
          db.select()
            .from(blogPosts)
            .where(whereClause)
            .orderBy(desc(blogPosts.createdAt))
            .limit(limit)
            .offset(offset),
          db.select({ count: count() })
            .from(blogPosts)
            .where(whereClause)
        ]);

        return {
          posts: postResults,
          total: totalResult[0]?.count || 0,
        };
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw new Error('Failed to fetch blog posts');
      }
    }),

  // Get single blog post by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, input.slug))
        .limit(1);
      
      return post[0] || null;
    }),

  // Get single blog post by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const post = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.id, input.id))
        .limit(1);
      
      return post[0] || null;
    }),

  // Create new blog post
  create: publicProcedure
    .input(createBlogPostSchema)
    .mutation(async ({ input }) => {
      // Generate slug from title if not provided
      const slug = input.slug || input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const [newPost] = await db
        .insert(blogPosts)
        .values({
          title: input.title,
          slug,
          content: input.content,
          excerpt: input.excerpt,
          author: input.author,
          status: input.status,
          tags: input.tags,
          featuredImage: input.featuredImage,
          publishedAt: input.publishedAt,
        })
        .returning();

      return newPost;
    }),

  // Update existing blog post
  update: publicProcedure
    .input(updateBlogPostSchema.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;
      
      // If slug is being updated, regenerate from title
      if (updateData.title && !updateData.slug) {
        updateData.slug = updateData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      const [updatedPost] = await db
        .update(blogPosts)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, id))
        .returning();

      return updatedPost;
    }),

  // Delete blog post
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db
        .delete(blogPosts)
        .where(eq(blogPosts.id, input.id));
      
      return { success: true };
    }),

  // Publish blog post
  publish: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const publishedAt = new Date();
      
      const [publishedPost] = await db
        .update(blogPosts)
        .set({
          status: 'published',
          publishedAt,
          updatedAt: publishedAt,
        })
        .where(eq(blogPosts.id, input.id))
        .returning();

      return publishedPost;
    }),

  // Archive blog post
  archive: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const [archivedPost] = await db
        .update(blogPosts)
        .set({
          status: 'archived',
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, input.id))
        .returning();

      return archivedPost;
    }),

  // Get blog post statistics
  getStats: publicProcedure
    .query(async () => {
      try {
        const totalPosts = await db
          .select({ count: count() })
          .from(blogPosts);

        const statusStats = await db
          .select({ 
            status: blogPosts.status, 
            count: count() 
          })
          .from(blogPosts)
          .groupBy(blogPosts.status);

        const authorStats = await db
          .select({ 
            author: blogPosts.author, 
            count: count() 
          })
          .from(blogPosts)
          .groupBy(blogPosts.author);

        // Get all tags and count their occurrences
        const tagResults = await db
          .select({ tags: blogPosts.tags })
          .from(blogPosts)
          .where(sql`array_length(${blogPosts.tags}, 1) > 0`);

        // Count tag frequencies
        const tagCounts: Record<string, number> = {};
        tagResults.forEach(result => {
          result.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });

        // Get top 10 most popular tags
        const popularTags = Object.entries(tagCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([tag, count]) => ({ tag, count }));

        return {
          total: totalPosts[0]?.count || 0,
          byStatus: statusStats.reduce((acc, stat) => ({
            ...acc,
            [stat.status]: stat.count
          }), {
            draft: 0,
            published: 0,
            archived: 0,
          }),
          byAuthor: authorStats.reduce((acc, stat) => ({
            ...acc,
            [stat.author]: stat.count
          }), {}),
          popularTags,
        };
      } catch (error) {
        console.error('Error fetching blog stats:', error);
        throw new Error('Failed to fetch blog statistics');
      }
    }),

  // Generate AI blog post
  generatePost: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      keywords: z.array(z.string()).default([]),
      tone: z.enum(['professional', 'casual', 'technical']).default('professional'),
      length: z.enum(['short', 'medium', 'long']).default('medium'),
      audience: z.enum(['investors', 'developers', 'general']).default('investors'),
      includeStats: z.boolean().default(true),
      includeExamples: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      try {
        const aiService = await import('../lib/ai');
        const generatedContent = await aiService.generateBlogPost(input);
        
        // Create the blog post in the database
        const slug = generatedContent.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const [newPost] = await db
          .insert(blogPosts)
          .values({
            title: generatedContent.title,
            slug,
            content: generatedContent.content,
            excerpt: generatedContent.excerpt,
            author: 'AI Assistant (Reviewed by Ethan Blumenthal)',
            status: 'draft',
            tags: generatedContent.tags,
            featuredImage: generatedContent.featuredImage,
          })
          .returning();

        return {
          ...newPost,
          generationMetadata: {
            prompt: generatedContent.prompt,
            wordCount: generatedContent.wordCount,
            readingTime: Math.ceil(generatedContent.wordCount / 200) + ' min read',
          },
        };
      } catch (error) {
        console.error('AI blog generation failed:', error);
        throw new Error('Failed to generate blog post. Please try again.');
      }
    }),

  // Generate blog post ideas
  generateIdeas: publicProcedure
    .input(z.object({
      industry: z.string().default('PropTech'),
      audience: z.string().default('investors'),
      count: z.number().min(1).max(10).default(5),
    }))
    .mutation(async ({ input }) => {
      try {
        const aiService = await import('../lib/ai');
        const ideas = await aiService.generateBlogIdeas(input);
        return { ideas };
      } catch (error) {
        console.error('AI idea generation failed:', error);
        throw new Error('Failed to generate blog ideas. Please try again.');
      }
    }),

  // Generate email subject lines
  generateEmailSubjects: publicProcedure
    .input(z.object({
      topic: z.string().min(1, 'Topic is required'),
      audience: z.string().default('investors'),
      count: z.number().min(1).max(10).default(5),
    }))
    .mutation(async ({ input }) => {
      try {
        const aiService = await import('../lib/ai');
        const subjects = await aiService.generateEmailSubjects(input);
        return { subjects };
      } catch (error) {
        console.error('AI subject generation failed:', error);
        throw new Error('Failed to generate email subjects. Please try again.');
      }
    }),
});