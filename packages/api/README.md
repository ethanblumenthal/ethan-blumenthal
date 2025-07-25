# @cre-platform/api

The API package provides the backend services and tRPC router configuration for the CRE Platform. This package handles all server-side business logic, external API integrations, and data processing operations.

## Overview

This package serves as the central API layer for the CRE Platform, providing type-safe APIs through tRPC that connect the web and admin applications to the database, AI services, and external integrations.

## Architecture

```
packages/api/
├── index.ts              # Main API exports
├── trpc.ts              # tRPC configuration and context
├── routers/             # API route handlers
│   ├── index.ts         # Main router combining all sub-routers
│   ├── blog.ts          # Blog management endpoints
│   ├── contact.ts       # Contact form and CRM endpoints
│   ├── lead.ts          # Lead scoring and discovery endpoints
│   ├── newsletter.ts    # Newsletter subscription endpoints
│   └── social.ts        # Social media automation endpoints
├── schemas/             # Zod validation schemas
│   ├── index.ts         # Schema exports
│   ├── blog.ts          # Blog-related schemas
│   ├── client.ts        # Client/contact schemas
│   ├── contact.ts       # Contact form schemas
│   └── lead.ts          # Lead management schemas
└── lib/                 # Utility libraries
    ├── ai.ts            # AI/OpenAI integration utilities
    └── social-media.ts  # Social media API integrations
```

## Features

### 🤖 AI Integration
- **Content Generation**: GPT-4 powered blog post and social media content creation
- **Sentiment Analysis**: Real-time analysis of social media mentions
- **Lead Scoring**: AI-driven qualification of potential prospects
- **Content Optimization**: LLM-powered content enhancement for engagement

### 📱 Social Media Automation
- **Twitter Integration**: Real-time feed monitoring and automated posting
- **LinkedIn Integration**: Professional network lead discovery
- **Content Pipeline**: AI-generated content with approval workflows
- **Sentiment Tracking**: Automated sentiment analysis of brand mentions

### 📧 CRM & Lead Management
- **Contact Management**: Full lifecycle contact management
- **Lead Scoring**: Automated scoring based on engagement and profile data
- **Activity Tracking**: Comprehensive interaction history
- **Email Integration**: Automated follow-up sequences

### 📝 Content Management
- **Blog Management**: Full CRUD operations for blog posts
- **SEO Optimization**: Automated meta tag and content optimization
- **Publication Workflow**: Draft → Review → Publish pipeline
- **Analytics Integration**: Content performance tracking

## Dependencies

### Core Dependencies
- **@trpc/server**: Type-safe API framework
- **zod**: Runtime schema validation
- **@cre-platform/db**: Database access layer
- **@cre-platform/email**: Email service integration

### AI & External Services
- **@ai-sdk/openai**: OpenAI integration for content generation
- **openai**: Direct OpenAI API access
- **twitter-api-v2**: Twitter API v2 integration
- **linkedin-api-client**: LinkedIn API integration

## Environment Variables

```bash
# AI Services
OPENAI_API_KEY=your_openai_api_key

# Social Media APIs
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Database (inherited from db package)
DATABASE_URL=your_supabase_connection_string
```

## API Routers

### Blog Router (`routers/blog.ts`)
Handles blog post management and AI-powered content generation.

**Key Endpoints:**
- `getAll` - Retrieve all blog posts with pagination
- `getBySlug` - Get specific blog post by slug
- `create` - Create new blog post with AI assistance
- `update` - Update existing blog post
- `delete` - Remove blog post
- `generateContent` - AI-powered content generation

### Contact Router (`routers/contact.ts`)
Manages contact forms, CRM operations, and lead processing.

**Key Endpoints:**
- `submit` - Process contact form submissions  
- `getAll` - Retrieve all contacts with filtering
- `getById` - Get specific contact details
- `updateStatus` - Update contact status/stage
- `addNote` - Add interaction notes

### Lead Router (`routers/lead.ts`)
Handles lead discovery, scoring, and qualification processes.

**Key Endpoints:**
- `discover` - AI-powered lead discovery from social media
- `score` - Calculate lead scores based on profile data
- `qualify` - Automated lead qualification
- `getHighValue` - Retrieve high-value prospects
- `updateScore` - Manual score adjustments

### Social Router (`routers/social.ts`)
Manages social media automation, content generation, and monitoring.

**Key Endpoints:**
- `generateContent` - AI-powered social media content creation
- `schedulePost` - Schedule social media posts
- `getFeeds` - Retrieve monitored social media feeds
- `analyzeSentiment` - Perform sentiment analysis
- `approvePosts` - Content approval workflow

### Newsletter Router (`routers/newsletter.ts`)
Handles newsletter subscriptions and email campaign management.

**Key Endpoints:**
- `subscribe` - Process newsletter subscriptions
- `unsubscribe` - Handle unsubscription requests
- `getSubscribers` - Retrieve subscriber lists
- `sendCampaign` - Dispatch email campaigns

## AI Integration (`lib/ai.ts`)

The AI integration module provides sophisticated content generation and analysis capabilities:

### Content Generation
```typescript
// Generate blog post content
const blogContent = await generateBlogPost({
  topic: "PropTech Trends 2024",
  keywords: ["AI", "Commercial Real Estate", "Technology"],
  tone: "professional",
  length: "long-form"
});

// Generate social media content
const socialContent = await generateSocialPost({
  platform: "twitter",
  topic: "Bitcoin in CRE",
  hashtags: ["#Bitcoin", "#CRE", "#PropTech"]
});
```

### Sentiment Analysis
```typescript
// Analyze social media sentiment
const sentiment = await analyzeSentiment({
  text: "Great insights on Bitcoin adoption in commercial real estate!",
  context: "social_media"
});
```

### Lead Scoring
```typescript
// AI-powered lead qualification
const leadScore = await scoreProspect({
  profile: prospectData,
  interactions: interactionHistory,
  socialActivity: socialMediaData
});
```

## Social Media Integration (`lib/social-media.ts`)

### Twitter Integration
- Real-time feed monitoring for CRE-related discussions
- Automated posting with approval workflows
- Sentiment analysis of brand mentions
- Lead discovery from Twitter interactions

### LinkedIn Integration
- Professional network lead discovery
- Company research and prospect identification
- Automated connection and outreach workflows
- Industry trend monitoring

## Usage Examples

### Setting up the API in Next.js Apps

```typescript
// In your Next.js app (apps/web or apps/admin)
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@cre-platform/api';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
    };
  },
});
```

### Using API Endpoints

```typescript
// Blog operations
const posts = await trpc.blog.getAll.query({
  limit: 10,
  offset: 0
});

// Contact management
const contact = await trpc.contact.submit.mutate({
  name: "John Doe",
  email: "john@example.com",
  message: "Interested in PropTech solutions"
});

// AI content generation
const content = await trpc.social.generateContent.mutate({
  platform: "linkedin",
  topic: "Commercial Real Estate Technology",
  tone: "professional"
});
```

## Development

### Scripts
```bash
# Type checking
bun run type-check

# Linting
bun run lint
```

### Adding New Routers

1. Create router file in `routers/` directory
2. Define procedures with proper Zod schemas
3. Export router from `routers/index.ts`
4. Add schemas to `schemas/` directory if needed

### AI Integration Guidelines

- Always validate AI-generated content before saving
- Implement proper rate limiting for AI API calls
- Use structured prompts for consistent output
- Handle AI service failures gracefully with fallbacks

### Social Media Best Practices

- Respect platform API rate limits
- Implement proper error handling for API failures
- Use queuing systems for high-volume operations
- Ensure compliance with platform terms of service

## Integration with Other Packages

- **@cre-platform/db**: Database operations and schema definitions
- **@cre-platform/email**: Email notifications and campaigns
- **apps/web**: Public-facing portfolio website API consumption
- **apps/admin**: Admin dashboard API consumption

## Type Safety

This package provides full end-to-end type safety through tRPC:
- Input validation with Zod schemas
- Type-safe API calls in client applications
- Automatic TypeScript inference for API responses
- Compile-time error checking for API usage

## Performance Considerations

- AI API calls are rate-limited and cached where appropriate
- Social media feeds are cached to reduce API usage
- Database queries are optimized with proper indexing
- Pagination implemented for large data sets

The API package serves as the backbone of the CRE Platform, providing robust, type-safe, and AI-enhanced backend services that power both the public website and admin dashboard.