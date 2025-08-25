import { z } from 'zod';
import { eq, desc, count, avg, sql } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { createLeadSchema, updateLeadSchema } from '../schemas/lead';
import { db, leads, contacts } from '@personal-app/db';
// Email service integration removed - using direct email package import

export const leadRouter = router({
  // Get all leads with optional filtering
  getAll: publicProcedure
    .input(
      z
        .object({
          platform: z.enum(['twitter', 'linkedin']).optional(),
          limit: z.number().min(1).max(1000).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const { platform, limit = 50, offset = 0 } = input || {};

      const whereClause = platform ? eq(leads.platform, platform) : undefined;

      const [leadResults, totalResult] = await Promise.all([
        db
          .select()
          .from(leads)
          .where(whereClause)
          .orderBy(desc(leads.createdAt))
          .limit(limit)
          .offset(offset),
        db.select({ count: count() }).from(leads).where(whereClause),
      ]);

      return {
        leads: leadResults,
        total: totalResult[0]?.count || 0,
      };
    }),

  // Get single lead by ID
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const lead = await db
      .select()
      .from(leads)
      .where(eq(leads.id, parseInt(input.id)))
      .limit(1);

    return lead[0] || null;
  }),

  // Create new lead
  create: publicProcedure.input(createLeadSchema).mutation(async ({ input }) => {
    const [newLead] = await db
      .insert(leads)
      .values({
        name: input.name,
        platform: input.platform,
        profileUrl: input.profileUrl,
        xProfile: input.xProfile,
        linkedinProfile: input.linkedinProfile,
        followerCount: input.followerCount,
        engagementScore: input.engagementScore,
      })
      .returning();

    return newLead;
  }),

  // Update existing lead
  update: publicProcedure.input(updateLeadSchema).mutation(async ({ input }) => {
    const { id, ...updateData } = input;

    const [updatedLead] = await db
      .update(leads)
      .set(updateData)
      .where(eq(leads.id, parseInt(id!)))
      .returning();

    return updatedLead;
  }),

  // Delete lead
  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    await db.delete(leads).where(eq(leads.id, parseInt(input.id)));

    return { success: true };
  }),

  // Convert lead to contact
  convertToContact: publicProcedure
    .input(
      z.object({
        leadId: z.string(),
        additionalInfo: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          company: z.string().optional(),
          website: z.string().optional(),
          group: z
            .enum(['venture_capital', 'private_equity', 'angel_investor', 'lender', 'broker'])
            .optional(),
          labels: z.array(z.string()).default([]),
          notes: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { leadId, additionalInfo } = input;

      // 1. Get lead data
      const lead = await db
        .select()
        .from(leads)
        .where(eq(leads.id, parseInt(leadId)))
        .limit(1);

      if (!lead[0]) {
        throw new Error('Lead not found');
      }

      const leadData = lead[0];

      // 2. Calculate lead score based on completeness
      let leadScore = 20; // Base score for lead conversion
      if (additionalInfo.phone) leadScore += 5;
      if (additionalInfo.company) leadScore += 5;
      if (additionalInfo.website) leadScore += 5;
      if (additionalInfo.labels.length > 0) leadScore += 5;
      if (leadData.followerCount && leadData.followerCount > 1000) leadScore += 10;
      if (leadData.engagementScore && leadData.engagementScore > 0.5) leadScore += 10;

      // 3. Create contact with combined data
      const [newContact] = await db
        .insert(contacts)
        .values({
          firstName: additionalInfo.firstName,
          lastName: additionalInfo.lastName,
          email: additionalInfo.email,
          phone: additionalInfo.phone,
          company: additionalInfo.company,
          website: additionalInfo.website,
          status: 'prospect',
          group: additionalInfo.group,
          labels: additionalInfo.labels,
          notes: additionalInfo.notes,
          xProfile: leadData.xProfile,
          linkedinProfile: leadData.linkedinProfile,
          source: leadData.platform === 'twitter' ? 'twitter' : 'linkedin',
          leadScore,
        })
        .returning();

      // 4. Delete the lead after successful conversion
      await db.delete(leads).where(eq(leads.id, parseInt(leadId)));

      return { success: true, contactId: newContact.id.toString() };
    }),

  // Get lead statistics
  getStats: publicProcedure.query(async () => {
    try {
      const totalLeads = await db.select({ count: count() }).from(leads);

      const platformStats = await db
        .select({
          platform: leads.platform,
          count: count(),
        })
        .from(leads)
        .groupBy(leads.platform);

      const avgEngagementResult = await db
        .select({
          avg: avg(leads.engagementScore),
        })
        .from(leads)
        .where(sql`${leads.engagementScore} IS NOT NULL`);

      const avgFollowerResult = await db
        .select({
          avg: avg(leads.followerCount),
        })
        .from(leads)
        .where(sql`${leads.followerCount} IS NOT NULL`);

      return {
        total: totalLeads[0]?.count || 0,
        byPlatform: platformStats.reduce(
          (acc: any, stat: any) => ({
            ...acc,
            [stat.platform]: stat.count,
          }),
          {
            twitter: 0,
            linkedin: 0,
          }
        ),
        averageEngagementScore: parseFloat(avgEngagementResult[0]?.avg || '0'),
        averageFollowerCount: parseFloat(avgFollowerResult[0]?.avg || '0'),
      };
    } catch (error) {
      console.error('Error fetching lead stats:', error);
      throw new Error('Failed to fetch lead statistics');
    }
  }),
});
