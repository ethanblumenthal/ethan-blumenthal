# CRE Platform - Web Application

The public-facing website for the CRE Platform, showcasing commercial real estate expertise, PropTech insights, and AI-powered solutions. Built with Next.js 15, React 19, and modern web technologies.

## Overview

This application serves as the primary marketing website and portfolio for the CRE Platform, featuring a professional showcase of commercial real estate expertise, thought leadership in PropTech and Bitcoin adoption, and lead generation capabilities.

## Architecture

```
apps/web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Homepage with hero and key sections
│   ├── about/
│   │   └── page.tsx             # Professional background and experience
│   ├── ai/
│   │   └── generate/
│   │       └── page.tsx         # AI content generation demo
│   ├── blog/
│   │   ├── page.tsx             # Blog listing with pagination
│   │   └── [slug]/
│   │       └── page.tsx         # Individual blog posts
│   ├── campaigns/
│   │   ├── bitcoin/
│   │   │   └── page.tsx         # Bitcoin in CRE landing page
│   │   └── proptech/
│   │       └── page.tsx         # PropTech solutions landing page
│   ├── contact/
│   │   └── page.tsx             # Contact form and information
│   ├── projects/
│   │   ├── page.tsx             # Portfolio showcase
│   │   └── [slug]/
│   │       └── page.tsx         # Individual project details
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts     # tRPC API handler
├── components/                   # React components
│   ├── about/                   # About page components
│   ├── ai/                      # AI generation components
│   ├── blog/                    # Blog-related components
│   ├── campaigns/               # Landing page components
│   ├── contact/                 # Contact form components
│   ├── projects/                # Portfolio components
│   └── [shared]/                # Reusable components
├── content/                     # MDX content files
│   └── blog/                    # Blog posts in MDX format
├── lib/                         # Utility libraries
│   ├── blog.ts                  # Blog content management
│   ├── constants.ts             # Site-wide constants
│   ├── trpc.ts                  # tRPC client configuration
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets
    ├── tech-stack/              # Technology logos
    ├── cityfunds/               # Project screenshots
    └── ownprop/                 # Project screenshots
```

## Technology Stack

### Core Framework
- **Next.js 15**: App Router, Server Components, and modern React features
- **React 19 RC**: Latest React features including concurrent rendering
- **TypeScript**: Full type safety across the application

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **@cre-platform/ui**: Shared component library with Radix UI
- **Framer Motion**: Smooth animations and interactions
- **next-themes**: Dark/light theme support

### Content Management
- **MDX**: Markdown with JSX for rich blog content
- **@next/mdx**: Native MDX support in Next.js
- **gray-matter**: Front matter parsing for blog posts
- **reading-time**: Automatic reading time calculation

### APIs & Data
- **tRPC**: Type-safe API integration with backend
- **@tanstack/react-query**: Data fetching and caching
- **@cre-platform/api**: Shared API layer

### Analytics & Monitoring
- **@vercel/analytics**: Performance and user analytics
- **Next.js Built-in Analytics**: Core Web Vitals tracking

## Key Features

### 🏢 Professional Portfolio
- **Company Showcase**: Highlighting CRE expertise and experience
- **Project Portfolio**: Detailed case studies of commercial real estate projects
- **Technology Stack**: Visual representation of technical capabilities
- **Work Experience**: Professional background and achievements

### 📝 Content Management System
- **MDX Blog**: Rich content creation with embedded components
- **SEO Optimization**: Automatic meta tags, structured data, and sitemaps
- **Reading Time**: Automatic calculation for user experience
- **Social Sharing**: Built-in social media sharing capabilities

### 🤖 AI Integration
- **Content Generation**: Interactive AI-powered content creation demo
- **Lead Qualification**: AI-enhanced contact form processing
- **Personalization**: Dynamic content based on user behavior
- **Performance Analytics**: AI-driven insights into content performance

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Fast Loading**: Optimized images, fonts, and assets
- **Accessibility**: WCAG compliant with screen reader support
- **Theme Support**: Light and dark mode switching

### 🎯 Lead Generation
- **Contact Forms**: Multiple conversion points throughout the site
- **Newsletter Signup**: Email list building with automation
- **Campaign Landing Pages**: Targeted pages for specific audiences
- **Call-to-Action Optimization**: Strategic placement and A/B testing

## Page Structure

### Homepage (`app/page.tsx`)
The main landing page featuring:
- **Hero Section**: Compelling value proposition and primary CTA
- **Selected Projects**: Featured commercial real estate projects
- **Technology Stack**: Visual showcase of technical expertise
- **Recent Blog Posts**: Latest thought leadership content
- **Newsletter Signup**: Email capture with value proposition

### About Page (`app/about/page.tsx`)
Professional background including:
- **Personal Bio**: Professional story and expertise
- **Work Experience**: Detailed career history
- **Statistics**: Key metrics and achievements
- **Skills & Certifications**: Technical and industry qualifications

### Blog System (`app/blog/`)
Content marketing hub featuring:
- **Article Listing**: Paginated blog post overview with search
- **Individual Posts**: Rich content with social sharing
- **Categories**: Organized by PropTech, AI, Bitcoin, and CRE topics
- **SEO Optimization**: Automatic meta tags and structured data

### Project Portfolio (`app/projects/`)
Case study showcase including:
- **Project Grid**: Visual overview of completed projects
- **Detailed Views**: In-depth project analysis and outcomes
- **Technology Used**: Technical implementation details
- **Results & Impact**: Measurable business outcomes

### Contact Page (`app/contact/page.tsx`)
Lead generation hub with:
- **Contact Form**: Multi-step form with validation
- **Company Information**: Location, contact details, and availability
- **FAQ Section**: Common questions and answers
- **Meeting Scheduler**: Direct calendar integration

### Campaign Landing Pages (`app/campaigns/`)
Targeted conversion pages:
- **Bitcoin in CRE**: Cryptocurrency integration in commercial real estate
- **PropTech Solutions**: Technology solutions for property management
- **Custom CTAs**: Tailored calls-to-action for each audience
- **Lead Magnets**: Downloadable resources and whitepapers

## Component Architecture

### Layout Components
```typescript
// Root layout with navigation and theme provider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <Newsletter />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Hero Component (`components/hero.tsx`)
```tsx
export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <FadeIn>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Commercial Real Estate Meets
            <span className="text-blue-600"> Cutting-Edge Technology</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Specializing in PropTech, AI integration, and Bitcoin adoption 
            for forward-thinking CRE professionals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
```

### Blog Components (`components/blog/`)
- **BlogCard**: Individual blog post preview with image, title, and excerpt
- **BlogHeader**: Page header with search and filtering capabilities
- **SocialShare**: Social media sharing buttons with platform optimization

### Contact Components (`components/contact/`)
- **ContactForm**: Multi-step form with validation and submission handling
- **EnhancedContactForm**: Advanced form with conditional fields
- **FAQSection**: Collapsible frequently asked questions

### Project Components (`components/projects/`)
- **ProjectCard**: Portfolio item with image, title, and technology tags
- **ProjectMetadata**: Detailed project information and specifications

## Content Management

### Blog Content (`content/blog/`)
MDX files with front matter for metadata:

```mdx
---
title: "Bitcoin and Commercial Real Estate: A Revolutionary Partnership"
excerpt: "Exploring how Bitcoin integration is transforming commercial real estate investment and transactions."
publishedAt: "2024-01-15"
image: "/blog/bitcoin-cre.jpg"
author: "Ethan Blumenthal"
tags: ["Bitcoin", "CRE", "PropTech", "Investment"]
---

# Introduction

Commercial real estate is undergoing a digital transformation...

<CallToAction 
  title="Ready to explore Bitcoin integration?" 
  href="/campaigns/bitcoin"
/>
```

### Dynamic Content Loading
```typescript
// lib/blog.ts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));
  
  const posts = await Promise.all(
    files
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(process.cwd(), 'content/blog', filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        return {
          slug: filename.replace('.mdx', ''),
          frontmatter: data,
          content,
          readingTime: readingTime(content).text,
        };
      })
  );
  
  return posts.sort((a, b) => 
    new Date(b.frontmatter.publishedAt).getTime() - 
    new Date(a.frontmatter.publishedAt).getTime()
  );
}
```

## API Integration

### tRPC Client Setup (`lib/trpc.ts`)
```typescript
import { createTRPCNext } from '@trpc/next';
import { type AppRouter } from '@cre-platform/api';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      url: '/api/trpc',
      transformer: superjson,
    };
  },
});
```

### Contact Form Integration
```typescript
// components/contact/contact-form.tsx
export function ContactForm() {
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success('Thank you! We\'ll be in touch soon.');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitContact.mutate({
      ...data,
      source: 'website_contact_form',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## SEO & Performance

### Metadata Configuration
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'CRE Platform - Commercial Real Estate Technology Solutions',
    template: '%s | CRE Platform',
  },
  description: 'Leading commercial real estate technology solutions specializing in PropTech, AI integration, and Bitcoin adoption for forward-thinking CRE professionals.',
  keywords: ['Commercial Real Estate', 'PropTech', 'AI', 'Bitcoin', 'Technology'],
  authors: [{ name: 'Ethan Blumenthal' }],
  creator: 'CRE Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creplatform.com',
    siteName: 'CRE Platform',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@creplatform',
    creator: '@ethanblumenthal',
  },
};
```

### Performance Optimizations
- **Image Optimization**: Next.js Image component with WebP conversion
- **Font Optimization**: Local font hosting with font-display: swap
- **Code Splitting**: Automatic route-based code splitting
- **Prefetching**: Link prefetching for improved navigation
- **Caching**: Aggressive caching for static content

### Core Web Vitals
- **LCP**: Optimized hero images and critical path CSS
- **FID**: Minimal JavaScript on initial load
- **CLS**: Proper image dimensions and layout stability

## Development Workflow

### Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"app/**/*.+(ts|tsx|js|jsx|json)\" \"components/**/*.+(ts|tsx|js|jsx|json)\" \"lib/**/*.+(ts|tsx|js|jsx|json)\""
  }
}
```

### Development Server
```bash
# Start development server
bun dev

# Start with specific port
bun dev -- --port 3001

# Start with turbo mode
bun dev --turbo
```

### Build & Deployment
```bash
# Production build
bun build

# Analyze bundle size
bun build -- --analyze

# Start production server
bun start
```

## Environment Configuration

### Environment Variables
```bash
# App Configuration
NEXT_PUBLIC_APP_URL=https://creplatform.com
NEXT_PUBLIC_APP_NAME=CRE Platform

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# API Configuration
NEXT_PUBLIC_API_URL=https://api.creplatform.com

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_AI_DEMO=true
NEXT_PUBLIC_ENABLE_CAMPAIGNS=true
```

### Next.js Configuration (`next.config.ts`)
```typescript
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // App Router
  experimental: {
    appDir: true,
  },
  
  // MDX Support
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Image Optimization
  images: {
    domains: ['creplatform.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance
  compress: true,
  poweredByHeader: false,
  
  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

## Testing Strategy

### Component Testing
```typescript
// __tests__/components/hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/hero';

describe('Hero Component', () => {
  it('renders hero content correctly', () => {
    render(<Hero />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Commercial Real Estate Meets/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });
});
```

### Page Testing
```typescript
// __tests__/pages/about.test.tsx
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('About Page', () => {
  it('displays professional information', () => {
    render(<AboutPage />);
    
    expect(screen.getByText(/Professional Background/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
  });
});
```

## Accessibility Features

### WCAG Compliance
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Visible focus indicators

### Implementation Examples
```tsx
// Accessible navigation
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li>
      <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
        About
      </Link>
    </li>
  </ul>
</nav>

// Accessible form labels
<Label htmlFor="email">
  Email Address
  <span className="text-red-500" aria-label="required">*</span>
</Label>
<Input 
  id="email" 
  type="email" 
  required 
  aria-describedby="email-error"
/>
```

## Deployment & Hosting

### Vercel Deployment
The application is optimized for Vercel deployment with:
- **Edge Runtime**: Fast global content delivery
- **Automatic HTTPS**: SSL certificates and security headers
- **Preview Deployments**: Branch-based preview environments
- **Analytics Integration**: Built-in performance monitoring

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
    paths: ['apps/web/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: bun install
      - run: bun run build
      - uses: amondnet/vercel-action@v20
```

The web application serves as the primary marketing and lead generation platform for the CRE Platform, showcasing expertise while driving business growth through strategic content marketing and conversion optimization.