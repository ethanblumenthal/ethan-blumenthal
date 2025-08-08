import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Running in development mode without Supabase.');
}

// Supabase client for authentication and storage
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

// Admin client for server-side operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null as any;

// Database connection string for Drizzle
const connectionString = process.env.DATABASE_URL;

// Create a mock database for build time when no connection string is provided
const createMockDb = () => {
  return new Proxy({} as any, {
    get: () => {
      return () => {
        console.warn('Database operation attempted without DATABASE_URL configured');
        return Promise.resolve([]);
      };
    }
  });
};

// Drizzle database instance
export const db = connectionString
  ? drizzle(postgres(connectionString, { prepare: false }))
  : createMockDb();

// Type helper for database operations
export type Database = typeof db;