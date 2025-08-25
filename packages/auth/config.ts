import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@personal-app/db';

// Create a mock auth instance for build time when auth is not configured
const createMockAuth = () => {
  return new Proxy({} as any, {
    get: (target, prop) => {
      if (prop === 'api') {
        return new Proxy({} as any, {
          get: () => {
            return async () => {
              console.warn('Auth operation attempted without proper configuration');
              return new Response(JSON.stringify({ error: 'Auth not configured' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
              });
            };
          },
        });
      }
      return () => {
        console.warn('Auth operation attempted without proper configuration');
        return null;
      };
    },
  });
};

// Check if auth is properly configured
const isAuthConfigured = process.env.BETTER_AUTH_SECRET && process.env.DATABASE_URL;

export const auth = isAuthConfigured
  ? betterAuth({
      database: drizzleAdapter(db, {
        provider: 'pg',
      }),
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
      },
      socialProviders:
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
          ? {
              google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              },
              ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
                ? {
                    github: {
                      clientId: process.env.GITHUB_CLIENT_ID,
                      clientSecret: process.env.GITHUB_CLIENT_SECRET,
                    },
                  }
                : {}),
            }
          : undefined,
      plugins: [
        // Add MFA plugin when needed
        // multiFactorAuth(),
      ],
      trustedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001',
      ].filter(Boolean),
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 24 hours
      },
    })
  : createMockAuth();
