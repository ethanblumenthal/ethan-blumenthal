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
  // ACCOUNT MANAGEMENT
  // ======================
  
  // Get connected social accounts
  getAccounts: publicProcedure
    .query(async () => {
      try {
        const accounts = await db
          .select()
          .from(sql`social_accounts`)
          .where(sql`is_active = true`)
          .orderBy(sql`platform`);
        
        return {
          success: true,
          accounts,
        };
      } catch (error) {
        console.error('Error fetching social accounts:', error);
        return {
          success: false,
          accounts: [],
        };
      }
    }),

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
        // Mock content generation based on platform and settings
        const contentTemplates = {
          twitter: {
            proptech: {
              professional: [
                "🏢 PropTech is revolutionizing CRE: AI-powered underwriting reduces due diligence time by 75%, while blockchain enables fractional ownership. The future of commercial real estate is digital. What innovations are transforming your market? #PropTech #CRE #Innovation",
                "Breaking: New study shows PropTech adoption in CRE increased 300% in 2024. Smart buildings, automated property management, and predictive analytics leading the charge. Is your portfolio ready for the digital transformation? #CREtech #DigitalTransformation",
              ],
              casual: [
                "Mind = blown 🤯 Just saw a demo of AI analyzing 100 properties in 30 seconds. Remember when this took weeks? PropTech is changing the game faster than we can keep up! Who else is excited about the future of CRE? #PropTech #Innovation",
                "Hot take: In 5 years, any CRE firm not using PropTech will be like using a flip phone in 2024. The tools available today are insane - from VR tours to AI valuations. What's your favorite PropTech tool? 🚀 #CRE #Technology",
              ],
            },
            bitcoin: {
              professional: [
                "💰 Bitcoin as collateral for CRE loans is gaining mainstream adoption. Major lenders now accepting BTC at 65% LTV ratios. Lower rates than traditional financing + instant liquidity. The convergence of crypto and real estate is here. #Bitcoin #CRE #DeFi",
                "Case study: $50M commercial property in Miami financed with Bitcoin collateral at 5.5% rate. Traditional banks offered 7.2%. The crypto-real estate revolution isn't coming - it's already here. #BitcoinRealEstate #CRE",
              ],
              'thought-leadership': [
                "The tokenization of real estate on Bitcoin's Lightning Network could unlock $16 trillion in global property value. Imagine instant, global, 24/7 real estate transactions with near-zero fees. We're building the future of property ownership. #Bitcoin #RealEstateTokenization",
              ],
            },
            tokenization: {
              professional: [
                "🔗 Real estate tokenization hit $3.8B in 2024. Fractional ownership, instant liquidity, global access. We're democratizing commercial property investment one token at a time. Your thoughts on the regulatory landscape? #Tokenization #CRE #Blockchain",
              ],
            },
            'cre-trends': {
              professional: [
                "📊 Q1 2025 CRE trends: Office-to-residential conversions up 150%, adaptive reuse projects dominating urban markets, and ESG compliance becoming non-negotiable. What trends are you seeing in your market? #CRE #RealEstateTrends",
              ],
            },
          },
          linkedin: {
            proptech: {
              professional: [
                "The PropTech revolution in commercial real estate is accelerating beyond predictions.\n\nKey developments I'm tracking:\n\n→ AI-powered underwriting reducing due diligence from weeks to hours\n→ IoT sensors optimizing building operations, cutting costs by 30%\n→ Blockchain enabling instant, transparent property transactions\n→ Digital twins revolutionizing property management\n\nWe're not just digitizing real estate - we're fundamentally reimagining how properties are bought, sold, and managed.\n\nWhat PropTech innovations are you most excited about?\n\n#PropTech #CommercialRealEstate #Innovation #DigitalTransformation",
              ],
              'thought-leadership': [
                "After 15 years in CRE, I've never seen transformation this rapid.\n\nThe convergence of AI, blockchain, and IoT isn't just changing how we do business - it's redefining what's possible in commercial real estate.\n\nConsider this: A property that took 6 months to analyze, finance, and close can now be tokenized, analyzed by AI, and traded globally in days.\n\nThe firms that embrace this shift will thrive. Those that don't risk becoming obsolete.\n\nThe question isn't whether to adopt PropTech, but how fast you can integrate it into your operations.\n\nHow is your organization preparing for the digital future of CRE?\n\n#PropTech #CommercialRealEstate #DigitalTransformation #ThoughtLeadership",
              ],
            },
            bitcoin: {
              professional: [
                "Bitcoin is transforming commercial real estate financing in ways we couldn't imagine 5 years ago.\n\nReal example from last week:\n\n→ $75M office building in Austin\n→ Traditional bank loan: 7.5% interest, 60 days to close\n→ Bitcoin-backed loan: 5.2% interest, 5 days to close\n\nThe borrower used $100M in Bitcoin as collateral without selling (no tax event), accessed better rates, and closed 10x faster.\n\nThis isn't experimental anymore. Major institutions are building Bitcoin lending infrastructure for CRE.\n\nThe convergence of digital assets and real estate is creating unprecedented opportunities for sophisticated investors.\n\nHave you explored Bitcoin-backed financing for your properties?\n\n#Bitcoin #CommercialRealEstate #RealEstateFinance #Innovation",
              ],
            },
          },
        };

        // Select random content based on parameters
        const platformTemplates = contentTemplates[input.platform];
        const focusTemplates = platformTemplates?.[input.focus as keyof typeof platformTemplates];
        const toneTemplates = focusTemplates?.[input.tone as keyof typeof focusTemplates] || focusTemplates?.['professional' as keyof typeof focusTemplates] || [];
        
        const selectedContent = toneTemplates[Math.floor(Math.random() * toneTemplates.length)] || 
          "Exciting developments in commercial real estate! The intersection of technology and property investment is creating unprecedented opportunities. What trends are you following? #CRE #Innovation";

        // Extract hashtags
        const hashtags = selectedContent.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
        const contentWithoutTags = selectedContent.replace(/#\w+/g, '').trim();

        // Add CTA if requested
        let finalContent = contentWithoutTags;
        if (input.includeCTA && !contentWithoutTags.includes('?')) {
          finalContent += '\n\nWhat are your thoughts on this? Share your insights below 👇';
        }

        // Mock data inclusion
        if (input.includeData && Math.random() > 0.5) {
          const dataPoint = [
            '\n\n📊 Recent data: 73% of CRE investors plan to increase PropTech spending in 2025.',
            '\n\n💡 Fact: Properties using smart building tech see 25% reduction in operating costs.',
            '\n\n🚀 Market insight: CRE tokenization volume grew 400% YoY.',
          ][Math.floor(Math.random() * 3)];
          finalContent = dataPoint + '\n' + finalContent;
        }

        const generatedPost = {
          platform: input.platform,
          content: finalContent,
          hashtags,
          callToAction: input.includeCTA ? 'Share your insights' : undefined,
          tone: input.tone,
          focus: input.focus,
          estimatedEngagement: Math.floor(Math.random() * 30) + 70, // 70-100%
        };

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
          inspirationUsed: 3,
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