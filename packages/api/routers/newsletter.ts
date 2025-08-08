import { z } from 'zod';
import { eq, count, sql } from 'drizzle-orm';
import { router, publicProcedure } from '../trpc';
import { db, contacts } from '@personal-app/db';
import { emailService } from '@personal-app/email';

const newsletterSignupSchema = z.object({
  email: z.string().email('Valid email is required'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  topics: z.array(z.string()).default(['proptech']),
  source: z.string().default('newsletter'),
});

export const newsletterRouter = router({
  // Newsletter signup
  signup: publicProcedure
    .input(newsletterSignupSchema)
    .mutation(async ({ input }) => {
      // Check if contact already exists
      const existingContact = await db
        .select()
        .from(contacts)
        .where(eq(contacts.email, input.email))
        .limit(1);

      let contact;

      if (existingContact.length > 0) {
        // Update existing contact with newsletter preferences
        const [updatedContact] = await db
          .update(contacts)
          .set({
            firstName: input.firstName || existingContact[0].firstName,
            lastName: input.lastName || existingContact[0].lastName,
            labels: [...new Set([...existingContact[0].labels, ...input.topics])],
            notes: existingContact[0].notes 
              ? `${existingContact[0].notes}\n\nNewsletter signup - Topics: ${input.topics.join(', ')}`
              : `Newsletter signup - Topics: ${input.topics.join(', ')}`,
            updatedAt: new Date(),
          })
          .where(eq(contacts.id, existingContact[0].id))
          .returning();

        contact = updatedContact;
      } else {
        // Create new contact
        const [newContact] = await db
          .insert(contacts)
          .values({
            firstName: input.firstName || '',
            lastName: input.lastName || '',
            email: input.email,
            status: 'prospect',
            group: undefined,
            labels: input.topics as any,
            notes: `Newsletter signup - Topics: ${input.topics.join(', ')}`,
            source: input.source as any,
            leadScore: 10, // Base score for newsletter signup
          })
          .returning();

        contact = newContact;
      }

      // Send welcome email (don't await to avoid blocking response)
      emailService.sendNewsletterWelcome(
        {
          firstName: input.firstName,
          topics: input.topics,
        },
        { to: input.email }
      ).catch(error => 
        console.error('Failed to send newsletter welcome email:', error)
      );

      return {
        success: true,
        contact: Array.isArray(contact) ? contact[0] : contact,
        isNewContact: existingContact.length === 0,
      };
    }),

  // Get newsletter statistics
  getStats: publicProcedure
    .query(async () => {
      // Get total newsletter subscribers (contacts with newsletter-related notes)
      const totalSubscribers = await db
        .select({ count: count() })
        .from(contacts)
        .where(sql`${contacts.notes} LIKE '%Newsletter signup%'`);

      // Get topic distribution
      const topicStats = await db
        .select({ 
          labels: contacts.labels,
          count: count()
        })
        .from(contacts)
        .where(sql`${contacts.notes} LIKE '%Newsletter signup%'`)
        .groupBy(contacts.labels);

      // Calculate topic frequencies
      const topicCounts: Record<string, number> = {};
      topicStats.forEach((stat: any) => {
        stat.labels.forEach((label: string) => {
          topicCounts[label] = (topicCounts[label] || 0) + stat.count;
        });
      });

      // Get recent signups (last 30 days)
      const recentSignupsCount = await db
        .select({ count: count() })
        .from(contacts)
        .where(sql`${contacts.notes} LIKE '%Newsletter signup%' AND ${contacts.createdAt} > NOW() - INTERVAL '30 days'`);

      return {
        total: totalSubscribers[0]?.count || 0,
        recentSignups: recentSignupsCount[0]?.count || 0,
        topicDistribution: Object.entries(topicCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([topic, count]) => ({ topic, count })),
      };
    }),
});