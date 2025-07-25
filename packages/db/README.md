# @cre-platform/db

The database package provides PostgreSQL schema definitions, migrations, and database utilities for the CRE Platform. Built with Drizzle ORM and Supabase, this package handles all data persistence and database operations.

## Overview

This package serves as the data layer for the CRE Platform, providing type-safe database operations, automated migrations, and comprehensive schema definitions optimized for commercial real estate CRM and content management.

## Architecture

```
packages/db/
├── index.ts              # Main database exports
├── client.ts             # Database client configuration
├── drizzle.config.ts     # Drizzle ORM configuration
├── schema/               # Database schema definitions
│   ├── index.ts          # Schema exports
│   ├── blog.ts           # Blog posts and content tables
│   ├── contacts.ts       # CRM contact management tables
│   ├── leads.ts          # Lead scoring and discovery tables
│   └── social.ts         # Social media automation tables
└── migrations/           # SQL migration files
    ├── 0001_initial_schema.sql        # Core tables and relationships
    ├── 0002_rls_policies.sql          # Row Level Security policies
    ├── 0003_lead_scoring_system.sql   # Lead scoring automation
    └── 0004_social_media_system.sql   # Social media integration
```

## Technology Stack

- **PostgreSQL**: Primary database with advanced features
- **Supabase**: Hosted PostgreSQL with real-time features
- **Drizzle ORM**: Type-safe database operations
- **Drizzle Kit**: Schema management and migrations

## Database Schema

### Core Entities

#### Contacts (`schema/contacts.ts`)
Central CRM entity for managing prospects and clients.

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  title VARCHAR(255),
  website VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_handle VARCHAR(100),
  
  -- CRM Fields
  status contact_status DEFAULT 'new',
  lead_source VARCHAR(100),
  lead_score INTEGER DEFAULT 0,
  lifecycle_stage VARCHAR(50) DEFAULT 'subscriber',
  
  -- Interaction Tracking
  last_contacted_at TIMESTAMP,
  last_activity_at TIMESTAMP,
  total_interactions INTEGER DEFAULT 0,
  
  -- Metadata
  notes TEXT,
  tags VARCHAR(255)[],
  custom_fields JSONB,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Contact Status Types:**
- `new` - Recently acquired contact
- `qualified` - Vetted and qualified prospect  
- `opportunity` - Active sales opportunity
- `customer` - Converted client
- `unqualified` - Not a good fit

#### Blog Posts (`schema/blog.ts`)
Content management system for blog articles and SEO.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  
  -- SEO & Meta
  meta_title VARCHAR(500),
  meta_description TEXT,
  keywords VARCHAR(255)[],
  featured_image VARCHAR(500),
  
  -- Publishing
  status post_status DEFAULT 'draft',
  published_at TIMESTAMP,
  author_id UUID,
  
  -- AI Generation Tracking
  ai_generated BOOLEAN DEFAULT FALSE,
  generation_prompt TEXT,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  reading_time INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Lead Discovery (`schema/leads.ts`)
AI-powered lead identification and scoring system.

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id),
  
  -- Discovery Source
  source_platform VARCHAR(50), -- 'twitter', 'linkedin', 'website'
  source_url VARCHAR(500),
  discovery_method VARCHAR(100), -- 'ai_discovery', 'manual', 'referral'
  
  -- Scoring
  lead_score INTEGER DEFAULT 0,
  score_breakdown JSONB, -- Detailed scoring factors
  qualification_status VARCHAR(50) DEFAULT 'unqualified',
  
  -- AI Analysis
  ai_analysis JSONB, -- AI-generated insights
  sentiment_score DECIMAL(3,2), -- -1.0 to 1.0
  intent_signals VARCHAR(255)[],
  
  -- Engagement Tracking
  interactions_count INTEGER DEFAULT 0,
  last_engagement_at TIMESTAMP,
  engagement_score INTEGER DEFAULT 0,
  
  -- Timestamps
  discovered_at TIMESTAMP DEFAULT NOW(),
  qualified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Social Media (`schema/social.ts`)
Social media automation and content management.

```sql
CREATE TABLE social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(50) NOT NULL, -- 'twitter', 'linkedin'
  content TEXT NOT NULL,
  media_urls VARCHAR(500)[],
  hashtags VARCHAR(255)[],
  
  -- Scheduling
  status post_status DEFAULT 'draft',
  scheduled_for TIMESTAMP,
  published_at TIMESTAMP,
  
  -- AI Generation
  ai_generated BOOLEAN DEFAULT FALSE,
  generation_prompt TEXT,
  topic VARCHAR(255),
  
  -- Performance
  engagement_score INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  
  -- Platform IDs
  platform_post_id VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE social_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(50) NOT NULL,
  platform_id VARCHAR(255) UNIQUE NOT NULL,
  author_handle VARCHAR(255),
  author_name VARCHAR(255),
  content TEXT NOT NULL,
  url VARCHAR(500),
  
  -- Analysis
  sentiment sentiment_type, -- 'positive', 'negative', 'neutral'
  sentiment_score DECIMAL(3,2),
  is_lead_opportunity BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  mentioned_at TIMESTAMP NOT NULL,
  follower_count INTEGER,
  engagement_count INTEGER,
  
  -- Processing
  processed BOOLEAN DEFAULT FALSE,
  lead_created BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Database Features

### 🔐 Row Level Security (RLS)
Comprehensive security policies ensuring data isolation and access control.

```sql
-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- Example policy for contact access
CREATE POLICY "Users can view their own contacts" ON contacts
  FOR SELECT USING (auth.uid() = user_id);
```

### ⚡ Automated Triggers
Database triggers for automated business logic and data consistency.

```sql
-- Auto-update lead scores based on interactions
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE leads 
  SET lead_score = calculate_lead_score(NEW.contact_id),
      updated_at = NOW()
  WHERE contact_id = NEW.contact_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-update contact activity timestamps
CREATE OR REPLACE FUNCTION update_contact_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE contacts 
  SET last_activity_at = NOW(),
      total_interactions = total_interactions + 1,
      updated_at = NOW()
  WHERE id = NEW.contact_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 📊 Advanced Indexing
Optimized indexes for high-performance queries.

```sql
-- Contact search and filtering indexes
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_lead_score ON contacts(lead_score DESC);
CREATE INDEX idx_contacts_lifecycle_stage ON contacts(lifecycle_stage);

-- Blog post indexes for SEO and search
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status_published ON blog_posts(status, published_at DESC);
CREATE INDEX idx_blog_posts_keywords ON blog_posts USING GIN(keywords);

-- Lead discovery and scoring indexes
CREATE INDEX idx_leads_score ON leads(lead_score DESC);
CREATE INDEX idx_leads_platform_discovered ON leads(source_platform, discovered_at DESC);
CREATE INDEX idx_leads_qualification ON leads(qualification_status, discovered_at DESC);

-- Social media performance indexes
CREATE INDEX idx_social_posts_platform_status ON social_posts(platform, status);
CREATE INDEX idx_social_mentions_sentiment ON social_mentions(sentiment, mentioned_at DESC);
CREATE INDEX idx_social_mentions_processing ON social_mentions(processed, is_lead_opportunity);
```

## Environment Configuration

```bash
# Primary Database
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]?pgbouncer=true&connection_limit=1

# Supabase Configuration (optional for additional features)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Scripts & Commands

### Development
```bash
# Type checking
bun run type-check

# Linting
bun run lint

# Generate database types from schema
bun run db:generate

# Apply pending migrations
bun run db:migrate

# Push schema changes directly (development only)
bun run db:push

# Launch Drizzle Studio for database inspection
bun run db:studio
```

### Migration Management
```bash
# Generate new migration from schema changes
bunx drizzle-kit generate:pg

# Apply migrations to database
bunx drizzle-kit migrate

# Push schema directly (skip migrations)
bunx drizzle-kit push:pg

# View current schema state
bunx drizzle-kit introspect:pg
```

## Usage Examples

### Database Client Setup
```typescript
import { db } from '@cre-platform/db';
import { contacts, blogPosts, leads } from '@cre-platform/db/schema';

// Type-safe database operations
const allContacts = await db.select().from(contacts);
const publishedPosts = await db
  .select()
  .from(blogPosts)
  .where(eq(blogPosts.status, 'published'));
```

### Complex Queries
```typescript
// Join contacts with their lead data
const contactsWithLeads = await db
  .select({
    contact: contacts,
    leadScore: leads.leadScore,
    lastEngagement: leads.lastEngagementAt
  })
  .from(contacts)
  .leftJoin(leads, eq(contacts.id, leads.contactId))
  .where(gte(contacts.leadScore, 75))
  .orderBy(desc(contacts.leadScore));

// Blog posts with performance metrics
const topPerformingPosts = await db
  .select()
  .from(blogPosts)
  .where(and(
    eq(blogPosts.status, 'published'),
    gte(blogPosts.viewCount, 1000)
  ))
  .orderBy(desc(blogPosts.viewCount))
  .limit(10);
```

### Transactions
```typescript
// Atomic operations with transactions
await db.transaction(async (tx) => {
  // Create contact
  const [contact] = await tx
    .insert(contacts)
    .values(newContactData)
    .returning();

  // Create associated lead record
  await tx
    .insert(leads)
    .values({
      contactId: contact.id,
      leadScore: 50,
      discoveryMethod: 'website_form'
    });
});
```

## Database Migrations

### Migration Structure
Each migration is a SQL file that handles:
- Schema changes (tables, columns, indexes)
- Data transformations
- Constraint updates
- Performance optimizations

### Migration Best Practices
1. **Always test migrations** on development data first
2. **Create rollback scripts** for production migrations
3. **Use transactions** for atomic schema changes
4. **Backup database** before major migrations
5. **Monitor performance** after index changes

### Example Migration
```sql
-- 0005_add_campaign_tracking.sql
BEGIN;

-- Add campaign tracking to contacts
ALTER TABLE contacts 
ADD COLUMN campaign_source VARCHAR(100),
ADD COLUMN utm_campaign VARCHAR(255),
ADD COLUMN utm_medium VARCHAR(100),
ADD COLUMN utm_source VARCHAR(100);

-- Create index for campaign analysis
CREATE INDEX idx_contacts_campaign_source 
ON contacts(campaign_source) 
WHERE campaign_source IS NOT NULL;

-- Update existing contacts with default values
UPDATE contacts 
SET campaign_source = 'organic' 
WHERE lead_source IS NULL;

COMMIT;
```

## Performance Optimization

### Query Optimization
- Use appropriate indexes for frequent queries
- Implement pagination for large datasets
- Use `EXPLAIN ANALYZE` to identify slow queries
- Optimize JOIN operations with proper indexes

### Connection Management
- Use connection pooling with PgBouncer
- Configure appropriate connection limits
- Monitor connection usage and leaks
- Implement connection retry logic

### Data Archiving
- Archive old blog posts and interactions
- Implement soft deletes for audit trails
- Use partitioning for large time-series data
- Regular database maintenance and vacuuming

## Security Considerations

### Access Control
- Row Level Security (RLS) policies
- API key rotation and management
- Database user privilege limitation
- Audit logging for sensitive operations

### Data Protection
- Encryption at rest and in transit
- PII data handling compliance
- Regular security updates
- Backup encryption

## Integration with Other Packages

- **@cre-platform/api**: Provides database operations through tRPC
- **Better Auth**: Automatic user/session table management
- **apps/web & apps/admin**: Database schema types and operations

## Monitoring & Maintenance

### Health Checks
- Database connection monitoring
- Query performance tracking
- Storage usage alerts
- Migration status verification

### Backup Strategy
- Automated daily backups
- Point-in-time recovery capability
- Cross-region backup replication
- Regular restore testing

The database package provides a robust, scalable, and secure foundation for the CRE Platform's data layer, with advanced features for CRM, content management, and AI-powered lead discovery.