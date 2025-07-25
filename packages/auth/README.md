# @cre-platform/auth

Authentication package providing secure, flexible authentication services using Better Auth. This package handles user registration, login, session management, and OAuth integration for the CRE Platform.

## Overview

This package provides a comprehensive authentication solution built on Better Auth, offering secure user authentication with support for email/password login, OAuth providers (Google, GitHub), and robust session management across the monorepo.

## Architecture

```
packages/auth/
├── index.ts              # Main auth exports
├── config.ts             # Better Auth configuration
├── client.ts             # Client-side authentication utilities
├── package.json          # Package configuration
└── tsconfig.json         # TypeScript configuration
```

## Technology Stack

- **Better Auth**: Modern authentication library for TypeScript
- **Drizzle Adapter**: Database integration with PostgreSQL
- **OAuth Providers**: Google and GitHub authentication
- **Session Management**: Secure, configurable session handling

## Authentication Configuration

### Better Auth Setup (`config.ts`)

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@cre-platform/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  
  // Email/Password Authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128
  },
  
  // OAuth Providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/github`
    }
  },
  
  // Session Configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // Update every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5 // 5 minutes
    }
  },
  
  // Security Settings
  advanced: {
    crossSubDomainCookies: {
      enabled: false
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    generateId: () => crypto.randomUUID()
  },
  
  // Trusted Origins
  trustedOrigins: [
    "http://localhost:3000",  // Web app
    "http://localhost:3002"   // Admin app
  ],
  
  // User Schema Customization
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "user",
        enum: ["user", "admin", "super_admin"]
      },
      company: {
        type: "string",
        required: false
      },
      title: {
        type: "string", 
        required: false
      },
      phone: {
        type: "string",
        required: false
      }
    }
  }
});
```

### Client-Side Configuration (`client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";
import type { auth } from "./config";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000"
});

// Export auth functions for use in components
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession
} = authClient;

// Enhanced sign in with error handling
export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signIn.email({
      email,
      password,
      callbackURL: "/dashboard"
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return result;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

// Enhanced sign up with validation
export async function signUpWithEmail(
  email: string, 
  password: string, 
  name: string,
  additionalFields?: {
    company?: string;
    title?: string;
    phone?: string;
  }
) {
  try {
    const result = await signUp.email({
      email,
      password,
      name,
      ...additionalFields,
      callbackURL: "/welcome"
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    return result;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

// OAuth sign in helpers
export async function signInWithGoogle() {
  return signIn.social({
    provider: "google",
    callbackURL: "/dashboard"
  });
}

export async function signInWithGitHub() {
  return signIn.social({
    provider: "github", 
    callbackURL: "/dashboard"
  });
}
```

## Environment Configuration

### Required Environment Variables

```bash
# Better Auth Core
BETTER_AUTH_SECRET=your_32_character_secret_key_minimum
BETTER_AUTH_URL=http://localhost:3000

# Database Connection (from @cre-platform/db)
DATABASE_URL=postgresql://user:password@host:port/database

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth  
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email Service (for verification emails)
RESEND_API_KEY=your_resend_api_key
```

### OAuth Provider Setup

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

#### GitHub OAuth Setup
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://yourdomain.com/api/auth/callback/github` (production)

## Database Integration

Better Auth automatically creates and manages the following tables:
- `user` - User account information
- `session` - Active user sessions
- `account` - OAuth provider account links
- `verification` - Email verification tokens

### User Schema Extensions

```sql
-- Additional fields added to Better Auth's user table
ALTER TABLE "user" ADD COLUMN "role" VARCHAR(50) DEFAULT 'user';
ALTER TABLE "user" ADD COLUMN "company" VARCHAR(255);
ALTER TABLE "user" ADD COLUMN "title" VARCHAR(255);
ALTER TABLE "user" ADD COLUMN "phone" VARCHAR(50);

-- Indexes for performance
CREATE INDEX idx_user_role ON "user"(role);
CREATE INDEX idx_user_company ON "user"(company);
```

## Usage Examples

### React Components

#### Login Form Component
```tsx
import { useState } from 'react';
import { signInWithEmail, signInWithGoogle } from '@cre-platform/auth';
import { Button, Input, Label } from '@cre-platform/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmail(email, password);
      // Redirect handled by Better Auth
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={signInWithGoogle}>
          Google
        </Button>
        <Button variant="outline" onClick={signInWithGitHub}>
          GitHub
        </Button>
      </div>
    </div>
  );
}
```

#### Session Management Hook
```tsx
import { useSession } from '@cre-platform/auth';

export function useAuthGuard() {
  const session = useSession();

  return {
    user: session.data?.user,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    isAdmin: session.data?.user?.role === 'admin',
    isSuperAdmin: session.data?.user?.role === 'super_admin'
  };
}

// Usage in components
export function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuthGuard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {user.company && <p>Company: {user.company}</p>}
    </div>
  );
}
```

### API Route Setup

#### Next.js API Route
```typescript
// apps/web/app/api/auth/[...nextauth]/route.ts
import { auth } from '@cre-platform/auth';

export const { GET, POST } = auth.handler;
```

#### Middleware for Route Protection
```typescript
// apps/web/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@cre-platform/auth';

export async function middleware(request: NextRequest) {
  const session = await auth.getSession({
    headers: request.headers
  });

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect authenticated routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

## Security Features

### Password Security
- Minimum 8 character requirement
- Maximum 128 character limit
- Automatic password hashing with bcrypt
- Password strength validation

### Session Security
- HTTP-only cookies for session storage
- Secure cookies in production
- Session rotation on login
- Automatic session cleanup

### CSRF Protection
- Built-in CSRF token validation
- SameSite cookie attributes
- Origin validation for requests

### Rate Limiting
- Configurable rate limits for login attempts
- Account lockout protection
- Suspicious activity detection

## Email Verification

### Setup Email Templates
```typescript
// In your email service configuration
export const emailTemplates = {
  verification: {
    subject: "Verify your CRE Platform account",
    html: `
      <h1>Welcome to CRE Platform</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="{{verificationUrl}}">Verify Email</a>
    `
  },
  passwordReset: {
    subject: "Reset your CRE Platform password",
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="{{resetUrl}}">Reset Password</a>
    `
  }
};
```

## Role-Based Access Control

### User Roles
- **user**: Standard user access
- **admin**: Administrative access to admin dashboard
- **super_admin**: Full system access

### Permission Checking
```typescript
export function hasPermission(user: User, permission: string): boolean {
  const rolePermissions = {
    user: ['read:own', 'update:own'],
    admin: ['read:all', 'update:all', 'delete:own', 'manage:content'],
    super_admin: ['*'] // All permissions
  };

  const userPermissions = rolePermissions[user.role] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
}

// Usage in API routes
export async function protectedApiRoute(req: Request) {
  const session = await auth.getSession({ headers: req.headers });
  
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!hasPermission(session.user, 'read:all')) {
    return new Response('Forbidden', { status: 403 });
  }

  // Protected logic here
}
```

## Integration with tRPC

### Auth Context for tRPC
```typescript
// In packages/api/trpc.ts
import { auth } from '@cre-platform/auth';

export const createContext = async (opts: { req: Request }) => {
  const session = await auth.getSession({ headers: opts.req.headers });
  
  return {
    user: session?.user,
    session
  };
};

// Protected procedure
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource'
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
```

## Testing

### Mock Authentication for Tests
```typescript
// test-utils/auth.ts
export function mockAuth(user?: Partial<User>) {
  return {
    useSession: () => ({
      data: user ? { user } : null,
      isPending: false
    }),
    signIn: jest.fn(),
    signOut: jest.fn()
  };
}

// In your tests
import { mockAuth } from '../test-utils/auth';

jest.mock('@cre-platform/auth', () => mockAuth({
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'admin'
}));
```

## Deployment Considerations

### Production Configuration
- Use secure random secrets (minimum 32 characters)
- Enable secure cookies (`useSecureCookies: true`)
- Configure proper CORS origins
- Set up proper SSL/TLS certificates
- Implement proper logging and monitoring

### Database Migrations
Better Auth handles its own table creation, but ensure:
- Proper database permissions
- Backup strategy for user data
- Migration rollback procedures

The authentication package provides enterprise-grade security features while maintaining developer experience and flexibility for the CRE Platform's authentication needs.