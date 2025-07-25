# CLAUDE.md

This file provides comprehensive guidance to Claude Code when working with the CRE Platform - a sophisticated commercial real estate CMS and CRM system focused on AI, Bitcoin, and Tokenization.

## Development Commands

**Development servers (from root):**
```bash
bun dev              # Starts all apps in development mode
bun dev:web          # Web app only
bun dev:admin        # Admin app only
```

**Build and deployment:**
```bash
bun build            # Build all apps and packages
bun build:web        # Build web app only
bun build:admin      # Build admin app only
```

**Code quality:**
```bash
bun lint             # Lint all packages
bun type-check       # TypeScript checking
bun format           # Format with Prettier
```

**Database management:**
```bash
bun db:push          # Push schema changes to database
bun db:migrate       # Run pending migrations
bun db:seed          # Seed database with sample data
```

## Architecture Overview

This is a comprehensive **CRE-focused CMS and CRM platform** built as a **Turborepo monorepo** specializing in AI, Bitcoin, and Tokenization applications for commercial real estate. The system combines portfolio website management, CRM functionality, blog management, admin dashboard, social media automation, and AI-powered content generation.

### Core Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19 RC, TypeScript
- **Backend**: tRPC for end-to-end type-safe APIs
- **Database**: PostgreSQL with Supabase, Drizzle ORM
- **Authentication**: Better Auth with session management
- **AI Integration**: OpenAI GPT-4 via Vercel AI SDK
- **Social Media**: Twitter API v2, LinkedIn API integration
- **Email**: Resend for automated email campaigns
- **Styling**: Tailwind CSS, Radix UI components
- **Package Management**: Bun runtime and package manager

### Monorepo Structure

```
├── apps/
│   ├── web/                 # Main portfolio website (Next.js 15)
│   └── admin/               # Admin dashboard (Next.js 15)
├── packages/
│   ├── api/                 # tRPC API routers and services
│   ├── db/                  # Database schema, migrations, and utilities
│   ├── ui/                  # Shared UI components (Radix + Tailwind)
│   ├── auth/                # Authentication configuration
│   └── eslint-config/       # Shared ESLint configuration
└── turbo.json               # Turborepo configuration
```

### Key Architecture Patterns

- **Monorepo Architecture**: Turborepo for coordinated builds and development
- **Full-Stack Type Safety**: tRPC for end-to-end TypeScript safety
- **Database-First Design**: Comprehensive PostgreSQL schema with automated triggers
- **AI-Powered Automation**: GPT-4 integration for content generation and analysis
- **Real-Time Social Media**: Live feed monitoring and sentiment analysis
- **Automated Lead Scoring**: AI-driven lead discovery and qualification
- **Campaign Management**: Sophisticated email and social media campaigns

### Application Structure

#### Web App (`apps/web/`)
- **Portfolio Website**: Professional CRE-focused showcase
- **Blog System**: AI-enhanced content management
- **Landing Pages**: Specialized campaigns for PropTech and Bitcoin
- **Contact Integration**: Direct CRM pipeline from website

#### Admin App (`apps/admin/`)
- **Dashboard**: Comprehensive analytics and KPIs
- **CRM Management**: Contact lifecycle and lead scoring
- **Blog Management**: Content creation with AI assistance
- **Social Media Hub**: Feed monitoring, content generation, and approval workflow
- **Email Campaigns**: Automated newsletter and campaign management
- **Lead Discovery**: AI-powered social media lead identification

### Database Architecture

#### Core Entities
- **Contacts**: CRM with automated lead scoring and lifecycle management
- **Blog Posts**: Full content management with AI generation capabilities
- **Social Media**: Comprehensive social platform integration and automation
- **Email Campaigns**: Advanced campaign management and analytics

#### Advanced Features
- **Automated Triggers**: Lead scoring, status updates, and notifications
- **Sentiment Analysis**: Real-time social media sentiment tracking
- **Performance Analytics**: Content and campaign effectiveness metrics
- **Lead Discovery**: AI-powered identification of potential clients

### AI Integration Features

#### Content Generation
- **Blog Posts**: AI-powered article creation focused on CRE, AI, Bitcoin, and Tokenization
- **Social Media**: Platform-optimized content generation from trending topics
- **Email Campaigns**: Personalized campaign content based on contact data

#### Social Media Intelligence
- **Sentiment Analysis**: Real-time analysis of social media discussions
- **Lead Discovery**: AI identification of potential clients from social platforms
- **Content Optimization**: LLM-powered content creation for maximum engagement
- **Trend Analysis**: Automated identification of trending topics in CRE space

### Social Media Automation System

#### Platform Integration
- **Twitter API v2**: Real-time feed monitoring, posting, and analytics
- **LinkedIn API**: Professional network integration and lead discovery
- **Content Pipeline**: AI-generated content with approval workflow
- **Performance Tracking**: Comprehensive engagement and reach analytics

#### Lead Discovery Engine
- **Keyword Monitoring**: Automated discovery based on CRE, AI, Bitcoin topics
- **Profile Analysis**: AI-powered lead qualification and scoring
- **Engagement Tracking**: Monitoring of high-value prospect interactions
- **CRM Integration**: Seamless conversion of social leads to CRM contacts

## Development Guidelines

### Code Organization

- **Shared Components**: Place reusable UI in `packages/ui/components/`
- **API Logic**: All business logic in `packages/api/` with tRPC routers
- **Database Operations**: Use Drizzle ORM through `packages/db/`
- **Type Safety**: Leverage tRPC for full-stack type inference
- **Error Handling**: Comprehensive error boundaries and API error handling

### AI Integration Best Practices

- **Content Generation**: Always validate AI-generated content before publishing
- **Prompt Engineering**: Use detailed, context-aware prompts for optimal results
- **Rate Limiting**: Implement proper rate limiting for AI API calls
- **Fallback Strategies**: Handle AI service failures gracefully

### Social Media Integration

- **API Rate Limits**: Respect platform rate limits with proper queuing
- **Data Privacy**: Ensure compliance with platform data usage policies
- **Content Approval**: Implement mandatory human approval for generated content
- **Performance Monitoring**: Track engagement metrics for content optimization

### Database Management

- **Migrations**: Use `packages/db/migrations/` for schema changes
- **Triggers**: Leverage PostgreSQL triggers for automated business logic
- **Indexing**: Optimize queries with appropriate database indexes
- **Data Integrity**: Use foreign keys and constraints for data consistency

## Environment Setup

Required environment variables (see `.env.example` files):

```bash
# Database
DATABASE_URL=your_supabase_connection_string

# Authentication
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Social Media APIs
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Email Service
RESEND_API_KEY=your_resend_api_key
```

## Key Features Implementation

### CRM System
- **Contact Management**: Full lifecycle from lead to conversion
- **Lead Scoring**: Automated scoring based on engagement and profile data
- **Activity Tracking**: Comprehensive interaction history
- **Segmentation**: Dynamic contact segmentation for targeted campaigns

### Blog Management
- **AI Content Generation**: GPT-4 powered article creation
- **SEO Optimization**: Automated meta tags and content optimization
- **Publication Workflow**: Draft → Review → Publish pipeline
- **Performance Analytics**: Traffic and engagement tracking

### Social Media Automation
- **Feed Monitoring**: Real-time monitoring of Twitter and LinkedIn feeds
- **Sentiment Analysis**: AI-powered sentiment classification
- **Content Generation**: Platform-optimized post creation
- **Lead Discovery**: Automated identification of potential prospects
- **Approval Workflow**: Human oversight for all generated content

### Email Marketing
- **Campaign Management**: Sophisticated email campaign creation
- **List Segmentation**: Dynamic subscriber segmentation
- **Performance Tracking**: Open rates, click-through rates, conversions
- **Automation**: Trigger-based email sequences

## Testing Strategy

- **Unit Tests**: Core business logic and utilities
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Critical user workflows
- **AI Testing**: Validation of AI-generated content quality

## Security Considerations

- **Authentication**: Secure session management with Better Auth
- **API Security**: Rate limiting and input validation
- **Data Privacy**: Compliance with data protection regulations
- **Social Media**: Secure token storage and rotation
- **Content Moderation**: Review processes for AI-generated content

## Performance Optimization

- **Database**: Proper indexing and query optimization
- **Caching**: Strategic caching for frequently accessed data
- **API Optimization**: Efficient tRPC queries and mutations
- **Social Media**: Cached feed data to reduce API calls
- **AI Services**: Intelligent prompt caching and response optimization

## Deployment Architecture

- **Monorepo Deployment**: Coordinated deployment of all applications
- **Database Migrations**: Automated schema updates
- **Environment Management**: Separate staging and production environments
- **Monitoring**: Comprehensive application and performance monitoring
- **Backup Strategy**: Regular database backups and disaster recovery

This platform represents a sophisticated integration of modern web technologies, AI services, and social media automation specifically designed for the commercial real estate industry's evolving needs in the digital age.