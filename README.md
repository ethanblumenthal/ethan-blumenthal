# Ethan Blumenthal's Personal App - Website, CMS, & CRM

A comprehensive commercial real estate platform specializing in AI, Bitcoin, and Tokenization applications. Built as a modern monorepo with advanced social media automation, intelligent lead discovery, and AI-powered content generation.

## 🏢 Platform Overview

The CRE Platform combines portfolio website management, CRM functionality, blog management, admin dashboard, social media automation, and AI-powered content generation into a unified system designed specifically for the commercial real estate industry's digital transformation.

### 🎯 Key Focus Areas
- **AI in Commercial Real Estate**: Automated property analysis, investment insights, and market predictions
- **Bitcoin & Cryptocurrency**: BTC-backed loans, crypto payment integration, and digital asset management
- **Real Estate Tokenization**: Fractional ownership, blockchain integration, and regulatory compliance

## 🚀 Features

### 🧠 AI-Powered Automation
- **Content Generation**: GPT-4 powered blog posts, social media content, and email campaigns
- **Sentiment Analysis**: Real-time social media sentiment tracking and analysis
- **Lead Discovery**: AI identification of potential clients from social platforms
- **Smart Scoring**: Automated lead qualification and scoring algorithms

### 📱 Social Media Intelligence
- **Multi-Platform Integration**: Twitter, LinkedIn feed monitoring and posting
- **Trend Analysis**: Automated identification of trending CRE topics
- **Content Pipeline**: AI-generated content with human approval workflow
- **Performance Analytics**: Comprehensive engagement and reach metrics

### 🎯 CRM & Lead Management
- **Contact Lifecycle**: Full pipeline from prospect to conversion
- **Automated Scoring**: Dynamic lead scoring based on engagement and profile data
- **Social Integration**: Convert social media interactions to CRM contacts
- **Campaign Management**: Sophisticated email and social media campaigns

### 📝 Content Management
- **AI Blog Generation**: Automated article creation focused on CRE trends
- **SEO Optimization**: Smart meta tags and content optimization
- **Publication Workflow**: Draft → Review → Publish pipeline
- **Performance Tracking**: Traffic and engagement analytics

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - App Router with React 19 RC
- **TypeScript** - Full type safety across the stack
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions

### Backend
- **tRPC** - End-to-end type-safe APIs
- **PostgreSQL** - Primary database via Supabase
- **Drizzle ORM** - Type-safe database operations
- **Better Auth** - Secure authentication and session management

### AI & Integrations
- **OpenAI GPT-4** - Content generation and analysis
- **Twitter API v2** - Social media monitoring and posting
- **LinkedIn API** - Professional network integration
- **Resend** - Transactional email delivery

### Development
- **Turborepo** - Monorepo build orchestration
- **Bun** - Fast JavaScript runtime and package manager
- **ESLint & Prettier** - Code quality and formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
├── apps/
│   ├── web/                 # Main portfolio website
│   │   ├── app/            # Next.js App Router pages
│   │   ├── components/     # React components
│   │   └── lib/            # Utilities and constants
│   └── admin/               # Admin dashboard
│       ├── app/            # Admin app pages
│       ├── components/     # Admin-specific components
│       └── lib/            # Admin utilities
├── packages/
│   ├── api/                 # tRPC API layer
│   │   ├── routers/        # API route handlers
│   │   ├── lib/            # Business logic and services
│   │   └── types/          # Shared type definitions
│   ├── db/                  # Database layer
│   │   ├── schema/         # Drizzle schema definitions
│   │   ├── migrations/     # Database migrations
│   │   └── seed/           # Seed data and scripts
│   ├── ui/                  # Shared UI components
│   │   ├── components/     # Reusable React components
│   │   └── styles/         # Global styles and themes
│   ├── auth/                # Authentication configuration
│   └── eslint-config/       # Shared linting rules
└── docs/                    # Documentation and guides
```

## 🚀 Quick Start

### Prerequisites
- **Bun** >= 1.0
- **Node.js** >= 18
- **PostgreSQL** database (Supabase recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cre-platform
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment setup**
   ```bash
   # Copy environment files (or use the provided examples)
   cp apps/web/.env.local.example apps/web/.env.local
   cp apps/admin/.env.local.example apps/admin/.env.local
   
   # Configure your environment variables
   # See Environment Variables section below
   ```

4. **Database setup**
   
   **IMPORTANT**: The application requires a PostgreSQL database to function.
   
   See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.
   
   Quick setup with Supabase:
   - Create a free account at https://supabase.com
   - Create a new project
   - Copy your database URL from Settings > Database
   - Add to both .env.local files:
     ```env
     DATABASE_URL=your_connection_string_here
     ```
   
   Then run:
   ```bash
   cd packages/db
   bun db:push
   ```

5. **Start development servers**
   ```bash
   # Start all applications
   bun dev
   
   # Or start individual apps
   bun dev:web      # Web app on http://localhost:3000
   bun dev:admin    # Admin app on http://localhost:3002
   ```

## ⚙️ Environment Variables

### Database
```bash
DATABASE_URL=your_supabase_connection_string
```

### Authentication
```bash
BETTER_AUTH_SECRET=your_secure_random_string
BETTER_AUTH_URL=http://localhost:3000
```

### AI Services
```bash
OPENAI_API_KEY=your_openai_api_key
```

### Social Media APIs
```bash
# Twitter API v2
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# LinkedIn API
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

### Email Service
```bash
RESEND_API_KEY=your_resend_api_key
```

## 📚 Development Commands

### Development
```bash
bun dev              # Start all apps in development
bun dev:web          # Start web app only
bun dev:admin        # Start admin app only
```

### Building
```bash
bun build            # Build all apps and packages
bun build:web        # Build web app only
bun build:admin      # Build admin app only
```

### Code Quality
```bash
bun lint             # Lint all packages
bun type-check       # TypeScript type checking
bun format           # Format code with Prettier
```

### Database
```bash
bun db:push          # Push schema changes
bun db:migrate       # Run migrations
bun db:seed          # Seed database
bun db:studio        # Open Drizzle Studio
```

## 🏗 Architecture Highlights

### Type-Safe APIs with tRPC
All API communication is fully type-safe from database to frontend, eliminating runtime errors and improving developer experience.

### AI-First Design
Every content creation workflow integrates AI assistance, from blog post generation to social media content optimization.

### Social Media Automation
Comprehensive social media management with real-time sentiment analysis, automated content generation, and intelligent lead discovery.

### Modern Database Design
PostgreSQL with advanced features including triggers, views, and functions for automated business logic and performance optimization.

### Monorepo Benefits
Shared code, coordinated deployments, and unified development experience across all applications.

## 🎯 Use Cases

### Real Estate Professionals
- **Portfolio Management**: Showcase properties and track performance
- **Lead Generation**: Automated discovery and qualification of prospects
- **Content Marketing**: AI-powered blog and social media content
- **Client Communication**: Automated email campaigns and follow-ups

### PropTech Companies
- **Market Analysis**: AI-powered insights and trend identification  
- **Social Listening**: Monitor industry conversations and sentiment
- **Thought Leadership**: Automated content creation and distribution
- **Network Building**: Intelligent connection and relationship management

### Crypto-Real Estate Ventures
- **Education Content**: AI-generated articles on Bitcoin and tokenization
- **Community Building**: Social media automation and engagement
- **Lead Qualification**: Identify crypto-savvy real estate investors
- **Market Intelligence**: Track sentiment around digital assets in CRE

## 📈 Performance & Scalability

- **Database Optimization**: Proper indexing and query optimization
- **Caching Strategy**: Multi-level caching for API and social media data
- **AI Rate Limiting**: Intelligent queuing and rate limiting for AI services
- **Monitoring**: Comprehensive application performance monitoring

## 🔒 Security Features

- **Authentication**: Secure session management with Better Auth
- **API Security**: Rate limiting and input validation
- **Data Privacy**: GDPR and data protection compliance
- **Token Security**: Encrypted storage of social media and API tokens
- **Content Moderation**: Human approval workflow for AI-generated content

## 📱 Social Media Integration

### Supported Platforms
- **Twitter/X**: Real-time feed monitoring, posting, and analytics
- **LinkedIn**: Professional network integration and lead discovery

### Features
- **Feed Monitoring**: Real-time tracking of industry conversations
- **Sentiment Analysis**: AI-powered sentiment classification
- **Content Generation**: Platform-optimized post creation
- **Lead Discovery**: Automated identification of potential prospects
- **Performance Analytics**: Comprehensive engagement metrics

## 🤖 AI Capabilities

### Content Generation
- **Blog Posts**: Full articles on CRE, AI, Bitcoin, and Tokenization
- **Social Media**: Platform-optimized posts with hashtags and CTAs
- **Email Campaigns**: Personalized campaign content and subject lines

### Analysis & Intelligence
- **Sentiment Analysis**: Real-time social media sentiment tracking
- **Trend Identification**: Automated discovery of trending topics
- **Lead Scoring**: AI-powered qualification and scoring algorithms
- **Market Insights**: Automated analysis of industry trends and opportunities

## 🚀 Deployment

The platform is designed for modern deployment environments with:

- **Container Support**: Docker and containerized deployments
- **Environment Management**: Separate staging and production configurations
- **Database Migrations**: Automated schema updates and rollbacks
- **Monitoring**: Application performance and error tracking
- **Backup Strategy**: Automated database backups and disaster recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, questions, or feature requests, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the future of commercial real estate**