import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const contactStatusEnum = pgEnum('contact_status', [
  'prospect',
  'qualified',
  'engaged',
  'converted',
  'lost',
]);

export const contactGroupEnum = pgEnum('contact_group', [
  'venture_capital',
  'private_equity',
  'angel_investor',
  'lender',
  'broker',
]);

export const contactSourceEnum = pgEnum('contact_source', [
  'website',
  'linkedin',
  'twitter',
  'manual',
]);

export const contactLabelEnum = pgEnum('contact_label', [
  'multifamily',
  'office',
  'retail',
  'industrial',
  'prop_tech',
  'crypto',
  'bitcoin',
  'vertical_saas',
  'early_stage',
  'generalist',
  'accelerator',
]);

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  company: text('company'),
  website: text('website'),
  status: contactStatusEnum('status').default('prospect').notNull(),
  group: contactGroupEnum('group_type'),
  labels: text('labels').array().default(sql`'{}'`).notNull(),
  notes: text('notes'),
  xProfile: text('x_profile'),
  linkedinProfile: text('linkedin_profile'),
  source: contactSourceEnum('source').default('website').notNull(),
  leadScore: integer('lead_score').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
