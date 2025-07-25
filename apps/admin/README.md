# CRE Platform - Admin Dashboard

The administrative interface for the CRE Platform, providing comprehensive CRM management, content creation, social media automation, and business intelligence tools for managing commercial real estate operations.

## Overview

This application serves as the command center for CRE Platform operations, offering powerful tools for contact management, lead scoring, content creation, social media automation, and campaign management. Built with Next.js 15 and optimized for administrative workflows.

## Architecture

```
apps/admin/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Admin layout with navigation
│   ├── page.tsx                 # Dashboard overview with KPIs
│   ├── social/
│   │   └── page.tsx             # Social media management hub
│   └── api/
│       └── trpc/
│           └── [trpc]/
│               └── route.ts     # tRPC API handler
├── components/                   # React components
│   ├── providers.tsx            # App-wide providers (tRPC, theme, etc.)
│   └── social/
│       └── social-dashboard.tsx # Social media dashboard component
├── lib/
│   └── trpc.ts                  # tRPC client configuration
├── next-env.d.ts                # Next.js TypeScript declarations
├── next.config.ts               # Next.js configuration
├── package.json                 # Package dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── tsconfig.tsbuildinfo         # TypeScript build cache
```

## Technology Stack

### Core Framework
- **Next.js 15**: App Router with advanced admin features
- **React 19 RC**: Latest React features for complex UI interactions
- **TypeScript**: Full type safety for administrative operations

### Backend Integration
- **tRPC**: Type-safe API integration with comprehensive error handling
- **@tanstack/react-query**: Advanced data fetching with caching and synchronization
- **@cre-platform/api**: Shared API layer with admin-specific endpoints

### UI & Styling
- **@cre-platform/ui**: Shared component library optimized for admin interfaces
- **Tailwind CSS**: Utility-first styling for rapid development
- **Framer Motion**: Smooth animations for improved user experience
- **next-themes**: Theme management for extended admin sessions

### Data Visualization
- **Charts & Analytics**: Integrated reporting and dashboard visualizations
- **Real-time Updates**: Live data feeds for social media and CRM activities
- **Export Capabilities**: Data export for reporting and analysis

## Key Features

### 📊 Dashboard Overview
- **KPI Metrics**: Key performance indicators for business operations
- **Real-time Analytics**: Live updates on leads, conversions, and engagement
- **Quick Actions**: Fast access to common administrative tasks
- **Recent Activity**: Timeline of system activities and updates

### 👥 CRM Management
- **Contact Database**: Comprehensive contact management with advanced filtering
- **Lead Scoring**: AI-powered lead qualification and prioritization  
- **Pipeline Management**: Visual sales pipeline with drag-and-drop functionality
- **Activity Tracking**: Complete interaction history and follow-up management
- **Bulk Operations**: Mass updates and campaign assignments

### 📱 Social Media Hub
- **Multi-Platform Management**: Twitter, LinkedIn, and other social platforms
- **Content Calendar**: Visual content scheduling and planning
- **Approval Workflow**: Review and approve AI-generated content
- **Performance Analytics**: Engagement metrics and ROI tracking
- **Lead Discovery**: Social media lead identification and qualification

### 📝 Content Management
- **Blog Administration**: Create, edit, and publish blog posts with AI assistance
- **SEO Tools**: Meta tag optimization and content analysis
- **Media Library**: Asset management for images, videos, and documents
- **Publication Workflow**: Draft → Review → Publish pipeline management

### 📧 Email Campaign Management
- **Newsletter Management**: Subscriber lists and campaign creation
- **Automated Sequences**: Drip campaigns and nurture flows
- **Template Editor**: Visual email template creation and customization
- **Performance Tracking**: Open rates, click-through rates, and conversions

### 🤖 AI Tools Integration
- **Content Generation**: AI-powered blog posts and social media content
- **Lead Analysis**: Automated lead scoring and qualification
- **Sentiment Analysis**: Social media sentiment monitoring
- **Predictive Analytics**: Forecasting and trend analysis

## Page Structure

### Dashboard (`app/page.tsx`)
The main administrative overview featuring:
- **Metrics Grid**: KPIs including leads, conversions, and revenue
- **Activity Feed**: Recent system activities and notifications
- **Quick Stats**: Contact counts, active campaigns, and social metrics
- **Action Items**: Tasks requiring immediate attention

```tsx
export default function AdminDashboard() {
  const { data: dashboardStats } = trpc.admin.getDashboardStats.useQuery();
  const { data: recentActivity } = trpc.admin.getRecentActivity.useQuery();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your CRE Platform operations"
      />
      
      <StatsGrid stats={dashboardStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityFeed activities={recentActivity} />
        <QuickActions />
      </div>
      
      <ChartsSection />
    </div>
  );
}
```

### Social Media Management (`app/social/page.tsx`)
Comprehensive social media operations center:
- **Content Calendar**: Visual scheduling interface
- **Approval Queue**: Review AI-generated posts before publishing
- **Performance Dashboard**: Analytics and engagement tracking
- **Lead Discovery**: Social media prospect identification

```tsx
export default function SocialMediaPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Social Media Hub"
        description="Manage your social media presence and lead discovery"
      />
      
      <SocialDashboard />
    </div>
  );
}
```

## Component Architecture

### Social Dashboard (`components/social/social-dashboard.tsx`)
The main social media management interface:

```tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@cre-platform/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cre-platform/ui';

export function SocialDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: socialStats } = trpc.social.getStats.useQuery();
  const { data: pendingPosts } = trpc.social.getPendingApproval.useQuery();
  const { data: recentMentions } = trpc.social.getRecentMentions.useQuery();

  return (
    <div className="space-y-6">
      {/* Social Media Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialStats?.totalFollowers}</div>
            <p className="text-xs text-muted-foreground">
              +{socialStats?.followerGrowth} this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialStats?.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">
              +{socialStats?.engagementGrowth}% vs last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{socialStats?.socialLeads}</div>
            <p className="text-xs text-muted-foreground">
              From social platforms this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPosts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Posts awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentPostsCard />
            <UpcomingPostsCard />
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentApprovalQueue posts={pendingPosts} />
          <ContentCalendar />
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          <MentionsTimeline mentions={recentMentions} />
          <SentimentAnalysis />
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <SocialLeadsTable />
          <LeadDiscoverySettings />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <EngagementCharts />
          <PlatformPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### Providers Setup (`components/providers.tsx`)
Application-wide providers for state management:

```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

import { trpc } from '@/lib/trpc';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        cacheTime: 300 * 1000, // 5 minutes
      },
    },
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

## API Integration

### tRPC Client Configuration (`lib/trpc.ts`)
```typescript
import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

import type { AppRouter } from '@cre-platform/api';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3002';
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            return {
              // Add authentication headers here
            };
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors
              if (error.data?.httpStatus && error.data.httpStatus < 500) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      },
    };
  },
});
```

### Admin-Specific API Usage
```typescript
// Social media management
export function useSocialMediaStats() {
  return trpc.social.getStats.useQuery(undefined, {
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useApprovePost() {
  const utils = trpc.useContext();
  
  return trpc.social.approvePost.useMutation({
    onSuccess: () => {
      utils.social.getPendingApproval.invalidate();
      utils.social.getStats.invalidate();
    },
  });
}

// CRM operations
export function useUpdateLeadScore() {
  const utils = trpc.useContext();
  
  return trpc.leads.updateScore.useMutation({
    onSuccess: (data) => {
      utils.leads.getById.setData({ id: data.id }, data);
      utils.admin.getDashboardStats.invalidate();
    },
  });
}
```

## Authentication & Security

### Admin Route Protection
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@cre-platform/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.getSession({
    headers: request.headers
  });

  // Check if user is authenticated
  if (!session?.user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if user has admin privileges
  if (session.user.role !== 'admin' && session.user.role !== 'super_admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|unauthorized).*)',
  ],
};
```

### Role-Based Access Control
```tsx
interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'super_admin';
  fallback?: React.ReactNode;
}

export function AdminGuard({ 
  children, 
  requiredRole = 'admin',
  fallback = <UnauthorizedMessage />
}: AdminGuardProps) {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session?.user) {
    return <LoginPrompt />;
  }

  const hasRequiredRole = requiredRole === 'admin' 
    ? ['admin', 'super_admin'].includes(session.user.role)
    : session.user.role === 'super_admin';

  if (!hasRequiredRole) {
    return fallback;
  }

  return <>{children}</>;
}
```

## Data Management

### Real-time Updates
```typescript
// Real-time dashboard updates
export function useDashboardUpdates() {
  const utils = trpc.useContext();
  
  useEffect(() => {
    const interval = setInterval(() => {
      utils.admin.getDashboardStats.invalidate();
      utils.social.getStats.invalidate();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [utils]);
}

// WebSocket integration for real-time notifications
export function useRealTimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev.slice(0, 99)]);
    };

    return () => ws.close();
  }, []);

  return notifications;
}
```

### Data Export Capabilities
```typescript
export function useDataExport() {
  const exportContacts = trpc.admin.exportContacts.useMutation();
  const exportAnalytics = trpc.admin.exportAnalytics.useMutation();

  const handleExport = async (type: 'contacts' | 'analytics', format: 'csv' | 'xlsx') => {
    try {
      const exportFn = type === 'contacts' ? exportContacts : exportAnalytics;
      const result = await exportFn.mutateAsync({ format });
      
      // Download the file
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = result.filename;
      link.click();
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  return { handleExport, isExporting: exportContacts.isLoading || exportAnalytics.isLoading };
}
```

## Performance Optimization

### Caching Strategy
```typescript
// Optimistic updates for better UX
export function useOptimisticContactUpdate() {
  const utils = trpc.useContext();
  
  return trpc.contacts.update.useMutation({
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await utils.contacts.getById.cancel({ id: newData.id });
      
      // Snapshot the previous value
      const previousContact = utils.contacts.getById.getData({ id: newData.id });
      
      // Optimistically update
      utils.contacts.getById.setData(
        { id: newData.id },
        old => ({ ...old, ...newData })
      );
      
      return { previousContact };
    },
    onError: (err, newData, context) => {
      // Rollback on error
      utils.contacts.getById.setData(
        { id: newData.id },
        context?.previousContact
      );
    },
    onSettled: (data) => {
      // Sync with server
      if (data) {
        utils.contacts.getById.invalidate({ id: data.id });
      }
    },
  });
}
```

### Virtual Scrolling for Large Lists
```tsx
import { FixedSizeList as List } from 'react-window';

interface ContactListProps {
  contacts: Contact[];
}

export function VirtualizedContactList({ contacts }: ContactListProps) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ContactRow contact={contacts[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={contacts.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

## Development Tools

### Scripts
```json
{
  "scripts": {
    "dev": "next dev --port 3002",
    "build": "next build",
    "start": "next start --port 3002",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Environment Configuration
```bash
# Admin App Configuration
NEXT_PUBLIC_ADMIN_URL=https://admin.creplatform.com
NEXT_PUBLIC_APP_NAME=CRE Platform Admin

# Feature Flags
NEXT_PUBLIC_ENABLE_SOCIAL_AUTOMATION=true
NEXT_PUBLIC_ENABLE_AI_CONTENT=true  
NEXT_PUBLIC_ENABLE_ADVANCED_ANALYTICS=true

# WebSocket for real-time updates
NEXT_PUBLIC_WS_URL=wss://ws.creplatform.com

# External Service Integration
NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL=https://analytics.creplatform.com
```

### Next.js Configuration (`next.config.ts`)
```typescript
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize for admin dashboard usage
  experimental: {
    optimizeCss: true,
    swcMinify: true,
  },
  
  // Security headers for admin interface
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
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
          },
        ],
      },
    ];
  },
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
```

## Testing Strategy

### Component Testing
```typescript
// __tests__/components/social-dashboard.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { SocialDashboard } from '@/components/social/social-dashboard';
import { createMockTRPCProvider } from '../utils/mock-trpc';

describe('SocialDashboard', () => {
  it('displays social media statistics', async () => {
    const MockProvider = createMockTRPCProvider({
      social: {
        getStats: {
          totalFollowers: 1250,
          engagementRate: 4.2,
          socialLeads: 15,
        },
      },
    });

    render(
      <MockProvider>
        <SocialDashboard />
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('1,250')).toBeInTheDocument();
      expect(screen.getByText('4.2%')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
    });
  });
});
```

### Integration Testing
```typescript
// __tests__/api/social.integration.test.ts
import { createTRPCMsw } from 'msw-trpc';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  createTRPCMsw<AppRouter>().social.getStats.query(() => {
    return {
      totalFollowers: 1000,
      engagementRate: 3.5,
      socialLeads: 10,
    };
  })
);

describe('Social API Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('fetches social media statistics', async () => {
    const result = await trpc.social.getStats.query();
    expect(result.totalFollowers).toBe(1000);
  });
});
```

## Monitoring & Analytics

### Error Tracking
```typescript
// lib/error-tracking.ts
import * as Sentry from '@sentry/nextjs';

export function setupErrorTracking() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      // Filter out development errors
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },
  });
}

export function trackAdminAction(action: string, data?: any) {
  Sentry.addBreadcrumb({
    message: `Admin action: ${action}`,
    data,
    level: 'info',
  });
}
```

### Performance Monitoring
```typescript
// lib/performance.ts
export function trackPageLoad(pageName: string) {
  if (typeof window !== 'undefined') {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      
      // Track to analytics
      gtag('event', 'page_load_time', {
        page_name: pageName,
        load_time: Math.round(loadTime),
      });
    });
  }
}
```

## Security Considerations

### Data Protection
- **Audit Logging**: All admin actions are logged for compliance
- **Access Control**: Role-based permissions for different admin functions
- **Data Encryption**: Sensitive data encrypted at rest and in transit
- **Session Management**: Secure session handling with automatic timeout

### Compliance Features
- **GDPR Compliance**: Data export and deletion capabilities
- **SOC 2 Controls**: Security controls for enterprise customers
- **Audit Trail**: Complete history of data changes and admin actions

The admin dashboard provides a comprehensive, secure, and efficient interface for managing all aspects of the CRE Platform, from lead management to social media automation and business intelligence.