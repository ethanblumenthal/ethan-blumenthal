import { z } from 'zod';
import { desc, count, sql } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { socialMediaService } from '../lib/social-media';
import { db, leads } from '@personal-app/db';

// Schema definitions
const socialPlatformSchema = z.enum(['twitter', 'linkedin']);
// Sentiment schema removed - not currently used
const toneSchema = z.enum(['professional', 'casual', 'thought-leadership']);
const focusSchema = z.enum(['proptech', 'bitcoin', 'tokenization', 'cre-trends']);

const generateContentSchema = z.object({
  platform: socialPlatformSchema,
  tone: toneSchema.default('professional'),
  focus: focusSchema.default('proptech'),
  includeData: z.boolean().default(true),
  includeCTA: z.boolean().default(true),
  inspirationCount: z.number().min(1).max(10).default(5),
});

const leadDiscoverySchema = z.object({
  keywords: z.array(z.string()).min(1),
  platform: socialPlatformSchema,
  limit: z.number().min(1).max(50).default(20),
  minFollowers: z.number().default(1000),
  minEngagement: z.number().default(10),
});

const postApprovalSchema = z.object({
  id: z.string(),
  approved: z.boolean(),
  modifications: z.string().optional(),
  scheduledFor: z.date().optional(),
});

export const socialRouter = router({
  // ======================
  // FEED MANAGEMENT
  // ======================

  // Get Twitter feed for admin dashboard
  getTwitterFeed: publicProcedure
    .input(z.object({
      count: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ input }) => {
      try {
        const feed = await socialMediaService.getTwitterFeed(input.count);
        return { success: true, posts: feed };
      } catch (error) {
        console.error('Error fetching Twitter feed:', error);
        return { success: false, posts: [], error: 'Failed to fetch Twitter feed' };
      }
    }),

  // Get LinkedIn feed for admin dashboard
  getLinkedInFeed: publicProcedure
    .input(z.object({
      accessToken: z.string(),
      count: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ input }) => {
      try {
        const feed = await socialMediaService.getLinkedInFeed(input.accessToken, input.count);
        return { success: true, posts: feed };
      } catch (error) {
        console.error('Error fetching LinkedIn feed:', error);
        return { success: false, posts: [], error: 'Failed to fetch LinkedIn feed' };
      }
    }),

  // ======================
  // SENTIMENT ANALYSIS
  // ======================

  // Analyze sentiment of recent posts
  analyzeFeedSentiment: publicProcedure
    .input(z.object({
      platform: socialPlatformSchema,
      count: z.number().min(1).max(50).default(20),
    }))
    .mutation(async ({ input }) => {
      try {
        const posts = input.platform === 'twitter' 
          ? await socialMediaService.getTwitterFeed(input.count)
          : await socialMediaService.getLinkedInFeed('', input.count);

        const sentimentAnalysis = await socialMediaService.analyzeSentiment(posts);
        
        // Convert to array format for easier frontend consumption
        const analysisResults = Array.from(sentimentAnalysis.entries()).map(([postId, analysis]) => ({
          postId,
          ...analysis,
          post: posts.find(p => p.id === postId),
        }));

        // Calculate overall sentiment metrics
        const sentimentCounts = {
          positive: analysisResults.filter(a => a.sentiment === 'positive').length,
          negative: analysisResults.filter(a => a.sentiment === 'negative').length,
          neutral: analysisResults.filter(a => a.sentiment === 'neutral').length,
        };

        const avgRelevanceScore = analysisResults.reduce((sum, a) => sum + a.relevanceScore, 0) / analysisResults.length;
        // Extract top topics (simplified for now)
        const topTokens = analysisResults.map(a => a.relevanceScore > 0.5 ? 'proptech' : 'general');
        const topTopics = [...new Set(topTokens)].slice(0, 5);

        return {
          success: true,
          analysis: analysisResults,
          summary: {
            sentimentCounts,
            avgRelevanceScore,
            topTopics,
            totalAnalyzed: analysisResults.length,
          },
        };
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
        return { 
          success: false, 
          error: 'Failed to analyze sentiment',
          analysis: [],
          summary: null,
        };
      }
    }),

  // ======================
  // CONTENT GENERATION
  // ======================

  // Generate social media content based on trending topics
  generateContent: publicProcedure
    .input(generateContentSchema)
    .mutation(async ({ input }) => {
      try {
        // Get inspiration posts from the selected platform
        const inspirationPosts = input.platform === 'twitter'
          ? await socialMediaService.getTwitterFeed(input.inspirationCount)
          : await socialMediaService.getLinkedInFeed('', input.inspirationCount);

        // Filter for relevant posts using sentiment analysis
        const sentimentAnalysis = await socialMediaService.analyzeSentiment(inspirationPosts);
        const relevantPosts = inspirationPosts.filter(post => {
          const analysis = sentimentAnalysis.get(post.id);
          return analysis && analysis.relevanceScore > 0.3;
        });

        // Generate content
        const generatedPost = await socialMediaService.generateSocialContent(
          relevantPosts.slice(0, 3),
          input.platform,
          {
            tone: input.tone,
            focus: input.focus,
            includeData: input.includeData,
            includeCTA: input.includeCTA,
          }
        );

        // Store in database for approval workflow (simplified for now)
        const postId = `post_${Date.now()}`;

        return {
          success: true,
          post: {
            id: postId,
            ...generatedPost,
            status: 'pending_approval',
            createdAt: new Date(),
          },
          inspirationUsed: relevantPosts.length,
        };
      } catch (error) {
        console.error('Error generating content:', error);
        return { 
          success: false, 
          error: 'Failed to generate content',
          post: null,
        };
      }
    }),

  // Optimize existing content for better engagement
  optimizeContent: publicProcedure
    .input(z.object({
      content: z.string().min(1),
      platform: socialPlatformSchema,
      targetAudience: z.enum(['investors', 'developers', 'general']).default('investors'),
    }))
    .mutation(async ({ input }) => {
      try {
        const optimization = await socialMediaService.optimizeContentForEngagement(
          input.content,
          input.platform,
          input.targetAudience
        );

        return {
          success: true,
          ...optimization,
        };
      } catch (error) {
        console.error('Error optimizing content:', error);
        return {
          success: false,
          optimizedContent: input.content,
          improvements: [],
          estimatedEngagement: 0,
          error: 'Failed to optimize content',
        };
      }
    }),

  // ======================
  // LEAD DISCOVERY
  // ======================

  // Discover potential leads on social platforms
  discoverLeads: publicProcedure
    .input(leadDiscoverySchema)
    .mutation(async ({ input }) => {
      try {
        const discoveredLeads = await socialMediaService.discoverLeads(
          input.keywords,
          input.platform,
          input.limit
        );

        // Filter by minimum criteria
        const qualifiedLeads = discoveredLeads.filter(lead => 
          lead.followers >= input.minFollowers && 
          lead.engagement >= input.minEngagement &&
          lead.leadScore > 30
        );

        // Store qualified leads in database
        const storedLeads = [];
        for (const lead of qualifiedLeads) {
          try {
            const [newLead] = await db
              .insert(leads)
              .values({
                name: lead.displayName,
                platform: lead.platform,
                profileUrl: lead.profileUrl,
                xProfile: lead.platform === 'twitter' ? lead.username : undefined,
                linkedinProfile: lead.platform === 'linkedin' ? lead.username : undefined,
                followerCount: lead.followers,
                engagementScore: lead.engagement,
              })
              .returning();

            storedLeads.push({
              ...newLead,
              leadScore: lead.leadScore,
              topics: lead.topics,
              sentiment: lead.sentiment,
            });
          } catch (dbError) {
            console.error('Error storing lead:', dbError);
          }
        }

        return {
          success: true,
          discovered: discoveredLeads.length,
          qualified: qualifiedLeads.length,
          stored: storedLeads.length,
          leads: storedLeads,
        };
      } catch (error) {
        console.error('Error discovering leads:', error);
        return {
          success: false,
          discovered: 0,
          qualified: 0,
          stored: 0,
          leads: [],
          error: 'Failed to discover leads',
        };
      }
    }),

  // ======================
  // CONTENT APPROVAL & POSTING
  // ======================

  // Get pending posts for approval
  getPendingPosts: publicProcedure
    .query(async () => {
      try {
        // Query pending posts from database
        const pendingPosts = await db
          .select()
          .from(sql`pending_social_posts`)
          .where(sql`status = 'pending_approval'`)
          .orderBy(desc(sql`created_at`));

        return {
          success: true,
          posts: pendingPosts,
        };
      } catch (error) {
        console.error('Error fetching pending posts:', error);
        return {
          success: false,
          posts: [],
        };
      }
    }),

  // Approve or reject a pending post
  reviewPost: publicProcedure
    .input(postApprovalSchema)
    .mutation(async ({ input }) => {
      try {
        // TODO: Implement proper database operations for post review
        // For now, return mock response
        return {
          success: true,
          posted: input.approved,
          rejected: !input.approved,
          scheduled: !!input.scheduledFor,
        };
      } catch (error) {
        console.error('Error reviewing post:', error);
        return {
          success: false,
          error: 'Failed to review post',
        };
      }
    }),

  // ======================
  // ANALYTICS & INSIGHTS
  // ======================

  // Get social media analytics
  getAnalytics: publicProcedure
    .input(z.object({
      timeframe: z.enum(['7d', '30d', '90d']).default('30d'),
    }))
    .query(async ({ input }) => {
      try {
        // Calculate date range
        const days = parseInt(input.timeframe);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // TODO: Implement proper analytics queries
        // For now, return mock data
        const postAnalytics = [
          { platform: 'twitter', status: 'posted', count: 12 },
          { platform: 'linkedin', status: 'posted', count: 8 },
        ];

        const leadAnalytics = [
          { platform: 'twitter', count: 25, avgEngagement: 0.75 },
          { platform: 'linkedin', count: 18, avgEngagement: 0.65 },
        ];

        return {
          success: true,
          timeframe: input.timeframe,
          posts: postAnalytics,
          leads: leadAnalytics,
          summary: {
            totalPosts: postAnalytics.reduce((sum, p) => sum + p.count, 0),
            totalLeads: leadAnalytics.reduce((sum, l) => sum + l.count, 0),
            avgEngagement: leadAnalytics.reduce((sum, l) => sum + (l.avgEngagement || 0), 0) / leadAnalytics.length,
          },
        };
      } catch (error) {
        console.error('Error fetching analytics:', error);
        return {
          success: false,
          posts: [],
          leads: [],
          summary: null,
        };
      }
    }),

  // ======================
});

// Helper functions
async function storePendingPost(post: any, input: any): Promise<string> {
  // This would store in a pending_social_posts table
  // For now, return a mock ID
  return `pending_${Date.now()}`;
}

async function getPostDetails(postId: string): Promise<any> {
  // This would fetch post details from database
  // For now, return mock data
  return {
    content: 'Sample post content',
    platform: 'twitter',
  };
}