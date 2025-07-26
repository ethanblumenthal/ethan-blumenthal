// Mock database client for development without a real database
import { sql } from 'drizzle-orm';

// Mock data
const mockContacts = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    website: 'https://acme.com',
    status: 'qualified',
    group: 'venture_capital',
    labels: ['proptech', 'early_stage'],
    notes: 'Interested in PropTech investments',
    xProfile: '@johndoe',
    linkedinProfile: 'linkedin.com/in/johndoe',
    source: 'linkedin',
    leadScore: 85,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@vc.com',
    phone: '+1 (555) 987-6543',
    company: 'Tech Ventures',
    website: 'https://techventures.com',
    status: 'engaged',
    group: 'private_equity',
    labels: ['bitcoin', 'crypto'],
    notes: 'Looking for Bitcoin real estate opportunities',
    xProfile: '@janesmith',
    linkedinProfile: 'linkedin.com/in/janesmith',
    source: 'website',
    leadScore: 92,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@angelinvestor.com',
    phone: '+1 (555) 555-5555',
    company: 'Angel Investments LLC',
    website: 'https://angelinvestments.com',
    status: 'prospect',
    group: 'angel_investor',
    labels: ['multifamily', 'office'],
    notes: 'Interested in multifamily properties',
    xProfile: '@bobjohnson',
    linkedinProfile: 'linkedin.com/in/bobjohnson',
    source: 'twitter',
    leadScore: 65,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice@broker.com',
    phone: '+1 (555) 111-2222',
    company: 'Premier Realty',
    website: 'https://premierrealty.com',
    status: 'converted',
    group: 'broker',
    labels: ['retail', 'industrial'],
    notes: 'Successfully closed deal on industrial property',
    xProfile: '@alicewilliams',
    linkedinProfile: 'linkedin.com/in/alicewilliams',
    source: 'manual',
    leadScore: 95,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@lender.com',
    phone: '+1 (555) 333-4444',
    company: 'Capital Finance',
    website: 'https://capitalfinance.com',
    status: 'qualified',
    group: 'lender',
    labels: ['vertical_saas', 'prop_tech'],
    notes: 'Provides financing for PropTech companies',
    xProfile: '@charliebrown',
    linkedinProfile: 'linkedin.com/in/charliebrown',
    source: 'linkedin',
    leadScore: 78,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
  },
];

const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Commercial Real Estate: AI and Automation',
    slug: 'future-of-cre-ai-automation',
    content: 'Commercial real estate is undergoing a transformation...',
    excerpt: 'Exploring how AI and automation are reshaping the CRE industry',
    author: 'Ethan Blumenthal',
    status: 'published',
    tags: ['AI', 'PropTech', 'Automation'],
    featuredImage: null,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    title: 'Bitcoin and Commercial Real Estate: A New Era',
    slug: 'bitcoin-commercial-real-estate',
    content: 'The intersection of cryptocurrency and real estate...',
    excerpt: 'How Bitcoin is revolutionizing real estate transactions',
    author: 'Ethan Blumenthal',
    status: 'published',
    tags: ['Bitcoin', 'Crypto', 'Real Estate'],
    featuredImage: null,
    publishedAt: new Date('2024-01-20'),
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 3,
    title: 'PropTech Trends to Watch in 2024',
    slug: 'proptech-trends-2024',
    content: 'The PropTech industry continues to evolve...',
    excerpt: 'Key trends shaping the future of property technology',
    author: 'Ethan Blumenthal',
    status: 'draft',
    tags: ['PropTech', 'Trends', '2024'],
    featuredImage: null,
    publishedAt: null,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
];

const mockLeads = [
  {
    id: 1,
    name: 'Tech Innovator',
    platform: 'twitter',
    profileUrl: 'https://twitter.com/techinnovator',
    xProfile: '@techinnovator',
    linkedinProfile: null,
    followerCount: 5200,
    engagementScore: 0.82,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 2,
    name: 'PropTech Expert',
    platform: 'linkedin',
    profileUrl: 'https://linkedin.com/in/proptechexpert',
    xProfile: null,
    linkedinProfile: 'linkedin.com/in/proptechexpert',
    followerCount: 3800,
    engagementScore: 0.75,
    createdAt: new Date('2024-01-22'),
  },
];

// Mock database functions
export const mockDb = {
  select: (columns?: any) => ({
    from: (table: any) => ({
      where: (condition?: any) => ({
        orderBy: (order?: any) => ({
          limit: (limit: number) => ({
            offset: (offset: number) => Promise.resolve(
              table === 'contacts' ? mockContacts.slice(offset, offset + limit) :
              table === 'blog_posts' ? mockBlogPosts.slice(offset, offset + limit) :
              table === 'leads' ? mockLeads.slice(offset, offset + limit) :
              []
            ),
          }),
        }),
        limit: (limit: number) => Promise.resolve(
          table === 'contacts' ? mockContacts.slice(0, limit) :
          table === 'blog_posts' ? mockBlogPosts.slice(0, limit) :
          table === 'leads' ? mockLeads.slice(0, limit) :
          []
        ),
        groupBy: (column: any) => Promise.resolve(
          table === 'contacts' && column === 'status' ? 
            [
              { status: 'prospect', count: 1 },
              { status: 'qualified', count: 2 },
              { status: 'engaged', count: 1 },
              { status: 'converted', count: 1 },
              { status: 'lost', count: 0 },
            ] :
          table === 'contacts' && column === 'group' ?
            [
              { group: 'venture_capital', count: 1 },
              { group: 'private_equity', count: 1 },
              { group: 'angel_investor', count: 1 },
              { group: 'broker', count: 1 },
              { group: 'lender', count: 1 },
            ] :
          table === 'blog_posts' && column === 'status' ?
            [
              { status: 'draft', count: 1 },
              { status: 'published', count: 2 },
              { status: 'archived', count: 0 },
            ] :
          []
        ),
      }),
      groupBy: (column: any) => Promise.resolve(
        columns?.count ? [{ count: 
          table === 'contacts' ? mockContacts.length :
          table === 'blog_posts' ? mockBlogPosts.length :
          table === 'leads' ? mockLeads.length :
          0 
        }] : []
      ),
    }),
  }),
  insert: (table: any) => ({
    values: (values: any) => ({
      returning: () => Promise.resolve([{ ...values, id: Date.now() }]),
    }),
  }),
  update: (table: any) => ({
    set: (values: any) => ({
      where: (condition: any) => ({
        returning: () => Promise.resolve([values]),
      }),
    }),
  }),
  delete: (table: any) => ({
    where: (condition: any) => Promise.resolve(),
  }),
};

// Export mock implementations
export const count = () => ({ count: 0 });
export const avg = (column: any) => ({ avg: 75 });
export const desc = (column: any) => column;
export const eq = (column: any, value: any) => ({ column, value });
export const and = (...conditions: any[]) => ({ and: conditions });
export const or = (...conditions: any[]) => ({ or: conditions });
export const like = (column: any, pattern: string) => ({ column, pattern });