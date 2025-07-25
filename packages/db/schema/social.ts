import { pgTable, serial, text, timestamp, pgEnum, integer, boolean, json } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums for social media functionality
export const socialPlatformEnum = pgEnum('social_platform', ['twitter', 'linkedin', 'facebook', 'instagram']);
export const postStatusEnum = pgEnum('post_status', ['pending_approval', 'approved', 'rejected', 'scheduled', 'posted', 'failed']);
export const sentimentEnum = pgEnum('sentiment', ['positive', 'negative', 'neutral']);

// Social media accounts table (for connecting user accounts)
export const socialAccounts = pgTable('social_accounts', {
  id: serial('id').primaryKey(),
  platform: socialPlatformEnum('platform').notNull(),
  username: text('username').notNull(),
  displayName: text('display_name').notNull(),
  profileUrl: text('profile_url').notNull(),
  accessToken: text('access_token'), // Encrypted access token
  refreshToken: text('refresh_token'), // Encrypted refresh token
  tokenExpiresAt: timestamp('token_expires_at', { withTimezone: true }),
  followers: integer('followers').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Pending social media posts awaiting approval
export const pendingSocialPosts = pgTable('pending_social_posts', {
  id: serial('id').primaryKey(),
  platform: socialPlatformEnum('platform').notNull(),
  content: text('content').notNull(),
  hashtags: text('hashtags').array().default(sql`'{}'`).notNull(),
  callToAction: text('call_to_action'),
  mediaType: text('media_type'), // 'image', 'video', 'article', etc.
  mediaUrl: text('media_url'),
  status: postStatusEnum('status').default('pending_approval').notNull(),
  scheduledFor: timestamp('scheduled_for', { withTimezone: true }),
  postedAt: timestamp('posted_at', { withTimezone: true }),
  postedId: text('posted_id'), // ID from the social platform
  tone: text('tone').notNull(), // 'professional', 'casual', 'thought-leadership'
  focus: text('focus').notNull(), // 'proptech', 'bitcoin', 'tokenization', 'cre-trends'
  inspirationPosts: json('inspiration_posts'), // Array of posts that inspired this content
  estimatedEngagement: integer('estimated_engagement').default(0),
  actualEngagement: integer('actual_engagement'),
  modifications: text('modifications'), // Admin feedback/modifications
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Social media feed cache (to avoid excessive API calls)
export const socialFeedCache = pgTable('social_feed_cache', {
  id: serial('id').primaryKey(),
  platform: socialPlatformEnum('platform').notNull(),
  postId: text('post_id').notNull(), // Platform-specific post ID
  content: text('content').notNull(),
  authorUsername: text('author_username').notNull(),
  authorDisplayName: text('author_display_name').notNull(),
  authorProfileImage: text('author_profile_image'),
  authorFollowers: integer('author_followers').default(0),
  likes: integer('likes').default(0),
  shares: integer('shares').default(0),
  comments: integer('comments').default(0),
  postUrl: text('post_url').notNull(),
  mediaUrls: text('media_urls').array().default(sql`'{}'`),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  cacheExpiresAt: timestamp('cache_expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Sentiment analysis results for social media posts
export const sentimentAnalysis = pgTable('sentiment_analysis', {
  id: serial('id').primaryKey(),
  postId: text('post_id').notNull(), // References social_feed_cache.post_id
  platform: socialPlatformEnum('platform').notNull(),
  sentiment: sentimentEnum('sentiment').notNull(),
  confidence: integer('confidence').notNull(), // 0-100
  relevanceScore: integer('relevance_score').notNull(), // 0-100
  topics: text('topics').array().default(sql`'{}'`).notNull(),
  insights: text('insights').array().default(sql`'{}'`).notNull(),
  analysisDate: timestamp('analysis_date', { withTimezone: true }).defaultNow().notNull(),
});

// Discovered leads from social media
export const discoveredLeads = pgTable('discovered_leads', {
  id: serial('id').primaryKey(),
  platform: socialPlatformEnum('platform').notNull(),
  username: text('username').notNull(),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  profileUrl: text('profile_url').notNull(),
  profileImage: text('profile_image'),
  followers: integer('followers').default(0),
  following: integer('following').default(0),
  posts: integer('posts').default(0),
  avgEngagement: integer('avg_engagement').default(0),
  leadScore: integer('lead_score').default(0), // 0-100
  topics: text('topics').array().default(sql`'{}'`).notNull(),
  sentiment: sentimentEnum('sentiment').default('neutral'),
  relevantPosts: json('relevant_posts'), // Array of their relevant posts
  discoveryKeywords: text('discovery_keywords').array().default(sql`'{}'`).notNull(),
  lastAnalyzed: timestamp('last_analyzed', { withTimezone: true }).defaultNow().notNull(),
  convertedToContact: boolean('converted_to_contact').default(false),
  contactId: integer('contact_id'), // References contacts.id when converted
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Content performance tracking
export const contentPerformance = pgTable('content_performance', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => pendingSocialPosts.id),
  platform: socialPlatformEnum('platform').notNull(),
  platformPostId: text('platform_post_id').notNull(),
  impressions: integer('impressions').default(0),
  reach: integer('reach').default(0),
  likes: integer('likes').default(0),
  shares: integer('shares').default(0),
  comments: integer('comments').default(0),
  clicks: integer('clicks').default(0),
  engagementRate: integer('engagement_rate').default(0), // Percentage * 100
  bestPerformingTime: timestamp('best_performing_time', { withTimezone: true }),
  demographics: json('demographics'), // Audience demographics data
  lastUpdated: timestamp('last_updated', { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Social media insights and trends
export const socialInsights = pgTable('social_insights', {
  id: serial('id').primaryKey(),
  platform: socialPlatformEnum('platform').notNull(),
  dateRange: text('date_range').notNull(), // '7d', '30d', '90d'
  trendingTopics: text('trending_topics').array().default(sql`'{}'`).notNull(),
  sentimentDistribution: json('sentiment_distribution'), // {positive: 40, negative: 10, neutral: 50}
  avgEngagementRate: integer('avg_engagement_rate').default(0),
  bestPostingTimes: json('best_posting_times'), // Array of optimal posting times
  topPerformingContent: json('top_performing_content'), // Array of best performing posts
  competitorAnalysis: json('competitor_analysis'), // Competitor performance data
  generatedAt: timestamp('generated_at', { withTimezone: true }).defaultNow().notNull(),
});

// Export types
export type SocialAccount = typeof socialAccounts.$inferSelect;
export type NewSocialAccount = typeof socialAccounts.$inferInsert;

export type PendingSocialPost = typeof pendingSocialPosts.$inferSelect;
export type NewPendingSocialPost = typeof pendingSocialPosts.$inferInsert;

export type SocialFeedCache = typeof socialFeedCache.$inferSelect;
export type NewSocialFeedCache = typeof socialFeedCache.$inferInsert;

export type SentimentAnalysis = typeof sentimentAnalysis.$inferSelect;
export type NewSentimentAnalysis = typeof sentimentAnalysis.$inferInsert;

export type DiscoveredLead = typeof discoveredLeads.$inferSelect;
export type NewDiscoveredLead = typeof discoveredLeads.$inferInsert;

export type ContentPerformance = typeof contentPerformance.$inferSelect;
export type NewContentPerformance = typeof contentPerformance.$inferInsert;

export type SocialInsights = typeof socialInsights.$inferSelect;
export type NewSocialInsights = typeof socialInsights.$inferInsert;