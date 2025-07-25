-- Create enums
CREATE TYPE "contact_status" AS ENUM ('prospect', 'qualified', 'engaged', 'converted', 'lost');
CREATE TYPE "contact_group" AS ENUM ('venture_capital', 'private_equity', 'angel_investor', 'lender', 'broker');
CREATE TYPE "contact_source" AS ENUM ('website', 'linkedin', 'twitter', 'manual');
CREATE TYPE "lead_platform" AS ENUM ('twitter', 'linkedin');
CREATE TYPE "blog_status" AS ENUM ('draft', 'published', 'archived');

-- Create contacts table
CREATE TABLE "contacts" (
  "id" SERIAL PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "company" TEXT,
  "website" TEXT,
  "status" "contact_status" DEFAULT 'prospect' NOT NULL,
  "group_type" "contact_group",
  "labels" TEXT[] DEFAULT '{}' NOT NULL,
  "notes" TEXT,
  "x_profile" TEXT,
  "linkedin_profile" TEXT,
  "source" "contact_source" DEFAULT 'website' NOT NULL,
  "lead_score" INTEGER DEFAULT 0 NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create leads table
CREATE TABLE "leads" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "platform" "lead_platform" NOT NULL,
  "profile_url" TEXT NOT NULL,
  "x_profile" TEXT,
  "linkedin_profile" TEXT,
  "follower_count" INTEGER,
  "engagement_score" REAL,
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create blog_posts table
CREATE TABLE "blog_posts" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "content" TEXT NOT NULL,
  "excerpt" TEXT,
  "author" TEXT DEFAULT 'Ethan Blumenthal' NOT NULL,
  "status" "blog_status" DEFAULT 'draft' NOT NULL,
  "tags" TEXT[] DEFAULT '{}' NOT NULL,
  "featured_image" TEXT,
  "published_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX "idx_contacts_email" ON "contacts" ("email");
CREATE INDEX "idx_contacts_status" ON "contacts" ("status");
CREATE INDEX "idx_contacts_group" ON "contacts" ("group_type");
CREATE INDEX "idx_contacts_source" ON "contacts" ("source");
CREATE INDEX "idx_contacts_lead_score" ON "contacts" ("lead_score");
CREATE INDEX "idx_contacts_created_at" ON "contacts" ("created_at");

CREATE INDEX "idx_leads_platform" ON "leads" ("platform");
CREATE INDEX "idx_leads_engagement_score" ON "leads" ("engagement_score");
CREATE INDEX "idx_leads_created_at" ON "leads" ("created_at");

CREATE INDEX "idx_blog_posts_slug" ON "blog_posts" ("slug");
CREATE INDEX "idx_blog_posts_status" ON "blog_posts" ("status");
CREATE INDEX "idx_blog_posts_author" ON "blog_posts" ("author");
CREATE INDEX "idx_blog_posts_published_at" ON "blog_posts" ("published_at");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON "contacts" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON "blog_posts" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();