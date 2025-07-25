import { pgTable, serial, text, integer, real, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const leadPlatformEnum = pgEnum('lead_platform', ['twitter', 'linkedin']);

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  platform: leadPlatformEnum('platform').notNull(),
  profileUrl: text('profile_url').notNull(),
  xProfile: text('x_profile'),
  linkedinProfile: text('linkedin_profile'),
  followerCount: integer('follower_count'),
  engagementScore: real('engagement_score'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;