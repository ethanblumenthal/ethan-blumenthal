import { z } from 'zod';
import { eq, desc, and, or, like, count, sql } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { createContactSchema, updateContactSchema } from '../schemas/contact';
import { db, contacts } from '@personal-app/db';

export const contactRouter = router({
  // Test database connection
  testConnection: publicProcedure.query(async () => {
    try {
      const result = await db.select({ count: count() }).from(contacts);
      return {
        success: true,
        count: result[0]?.count || 0,
        message: 'Database connection successful',
      };
    } catch (error) {
      console.error('Database connection error:', error);
      return {
        success: false,
        count: 0,
        message: error instanceof Error ? error.message : 'Unknown database error',
      };
    }
  }),
  // Get all contacts with optional filtering
  getAll: publicProcedure
    .input(
      z
        .object({
          status: z.enum(['prospect', 'qualified', 'engaged', 'converted', 'lost']).optional(),
          group: z
            .enum(['venture_capital', 'private_equity', 'angel_investor', 'lender', 'broker'])
            .optional(),
          labels: z.array(z.string()).optional(),
          limit: z.number().min(1).max(1000).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { status, group, labels, limit = 50, offset = 0 } = input || {};

        const conditions = [];

        if (status) {
          conditions.push(eq(contacts.status, status));
        }
        if (group) {
          conditions.push(eq(contacts.group, group));
        }
        if (labels && labels.length > 0) {
          // Check if any of the provided labels are in the contact's labels array
          conditions.push(or(...labels.map((label) => like(contacts.labels, `%${label}%`))));
        }

        // Execute queries
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        const [contactResults, totalResult] = await Promise.all([
          db
            .select()
            .from(contacts)
            .where(whereClause)
            .orderBy(desc(contacts.createdAt))
            .limit(limit)
            .offset(offset),
          db.select({ count: count() }).from(contacts).where(whereClause),
        ]);

        return {
          contacts: contactResults,
          total: totalResult[0]?.count || 0,
        };
      } catch (error) {
        console.error('Error fetching contacts:', error);
        throw new Error('Failed to fetch contacts');
      }
    }),

  // Get single contact by ID
  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    const contact = await db.select().from(contacts).where(eq(contacts.id, input.id)).limit(1);

    return contact[0] || null;
  }),

  // Create new contact
  create: publicProcedure.input(createContactSchema).mutation(async ({ input }) => {
    // Calculate lead score based on completeness
    let leadScore = 10; // Base score for form submission
    if (input.phone) leadScore += 5;
    if (input.company) leadScore += 5;
    if (input.website) leadScore += 5;
    if (input.labels.length > 0) leadScore += 5;

    const [newContact] = await db
      .insert(contacts)
      .values({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        company: input.company,
        website: input.website,
        status: input.status,
        group: input.group,
        labels: input.labels,
        notes: input.notes,
        xProfile: input.xProfile,
        linkedinProfile: input.linkedinProfile,
        source: input.source,
        leadScore,
      })
      .returning();

    // Email service temporarily disabled - uncomment when email package is configured
    // const emailData = {
    //   firstName: input.firstName,
    //   lastName: input.lastName,
    //   email: input.email,
    //   company: input.company,
    //   message: input.notes,
    //   source: input.source,
    //   group: input.group,
    //   labels: input.labels,
    // };

    // // Send admin notification
    // emailService.sendContactNotification(emailData).catch(error =>
    //   console.error('Failed to send admin notification:', error)
    // );

    // // Send follow-up email to contact
    // if (input.source === 'website' || input.source.startsWith('campaign')) {
    //   emailService.sendContactFollowUp(
    //     { firstName: input.firstName },
    //     { to: input.email }
    //   ).catch(error =>
    //     console.error('Failed to send contact follow-up:', error)
    //   );
    // }

    // // Send campaign-specific follow-up if from a campaign
    // if (input.notes?.includes('Campaign:')) {
    //   const campaignMatch = input.notes.match(/Campaign: (\w+)/);
    //   if (campaignMatch && ['proptech', 'bitcoin', 'cre'].includes(campaignMatch[1])) {
    //     const campaign = campaignMatch[1] as 'proptech' | 'bitcoin' | 'cre';
    //     emailService.sendCampaignFollowUp(
    //       { firstName: input.firstName, campaign },
    //       { to: input.email }
    //     ).catch(error =>
    //       console.error('Failed to send campaign follow-up:', error)
    //     );
    //   }
    // }

    return newContact;
  }),

  // Update existing contact
  update: publicProcedure
    .input(updateContactSchema.extend({ id: z.number() }))
    .mutation(async ({ input }) => {
      const { id, ...updateData } = input;

      const [updatedContact] = await db
        .update(contacts)
        .set(updateData)
        .where(eq(contacts.id, id))
        .returning();

      return updatedContact;
    }),

  // Delete contact
  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    await db.delete(contacts).where(eq(contacts.id, input.id));

    return { success: true };
  }),

  // Get contact statistics
  getStats: publicProcedure.query(async () => {
    try {
      const totalContacts = await db.select({ count: count() }).from(contacts);

      const statusStats = await db
        .select({
          status: contacts.status,
          count: count(),
        })
        .from(contacts)
        .groupBy(contacts.status);

      const groupStats = await db
        .select({
          group: contacts.group,
          count: count(),
        })
        .from(contacts)
        .where(sql`${contacts.group} IS NOT NULL`)
        .groupBy(contacts.group);

      const avgScoreResult = await db
        .select({
          avg: sql<number>`AVG(${contacts.leadScore})`,
        })
        .from(contacts);

      return {
        total: totalContacts[0]?.count || 0,
        byStatus: statusStats.reduce(
          (acc: any, stat: any) => ({
            ...acc,
            [stat.status]: stat.count,
          }),
          {
            prospect: 0,
            qualified: 0,
            engaged: 0,
            converted: 0,
            lost: 0,
          }
        ),
        byGroup: groupStats.reduce(
          (acc: any, stat: any) => ({
            ...acc,
            [stat.group || 'unknown']: stat.count,
          }),
          {
            venture_capital: 0,
            private_equity: 0,
            angel_investor: 0,
            lender: 0,
            broker: 0,
          }
        ),
        averageLeadScore: avgScoreResult[0]?.avg || 0,
      };
    } catch (error) {
      console.error('Error fetching contact stats:', error);
      throw new Error('Failed to fetch contact statistics');
    }
  }),
});
