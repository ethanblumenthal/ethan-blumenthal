import { db, blogPosts } from '@personal-app/db';
import { eq, desc } from 'drizzle-orm';

// Mock blog data for when database is not available
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of PropTech in Commercial Real Estate',
    slug: 'future-of-proptech-commercial-real-estate',
    content: `# The Future of PropTech in Commercial Real Estate

The commercial real estate industry is experiencing a technological revolution. PropTech innovations are transforming how we buy, sell, manage, and invest in properties.

## Key Trends to Watch

### 1. AI-Powered Valuation
Machine learning algorithms are now capable of analyzing vast amounts of data to provide more accurate property valuations in real-time.

### 2. Blockchain and Tokenization
Real estate tokenization is opening up new investment opportunities, allowing fractional ownership and improved liquidity.

### 3. Smart Building Technology
IoT sensors and automation systems are optimizing energy usage and improving tenant experiences.

## The Investment Opportunity

PropTech investments have grown from $1 billion in 2010 to over $32 billion in 2023. This exponential growth shows no signs of slowing down.

## Conclusion

The future of commercial real estate is digital. Investors who embrace PropTech today will be the market leaders of tomorrow.`,
    excerpt: 'Explore how PropTech is revolutionizing commercial real estate through AI, blockchain, and smart building technologies.',
    author: 'Ethan Blumenthal',
    status: 'published' as const,
    tags: ['PropTech', 'Commercial Real Estate', 'Innovation', 'Technology'],
    featuredImage: '/images/proptech-future.jpg',
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  }
];

// Helper to check if database is available
function isDatabaseAvailable(): boolean {
  return !!process.env.DATABASE_URL;
}

// Get all published blog posts for static generation
export async function getPublishedPostSlugs() {
  if (!isDatabaseAvailable()) {
    return mockBlogPosts.filter(post => post.status === 'published').map(post => ({ slug: post.slug }));
  }
  
  try {
    return await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.status, 'published'));
  } catch (error) {
    console.error('Failed to fetch blog post slugs:', error);
    return mockBlogPosts.filter(post => post.status === 'published').map(post => ({ slug: post.slug }));
  }
}

// Get a single blog post by slug for the blog page
export async function getBlogPostBySlug(slug: string) {
  if (!isDatabaseAvailable()) {
    return mockBlogPosts.find(post => post.slug === slug) || null;
  }
  
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return post || null;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return mockBlogPosts.find(post => post.slug === slug) || null;
  }
}

// Get related posts for database
export async function getRelatedPostsFromDb(currentSlug: string, tags: string[], limit = 3) {
  if (!isDatabaseAvailable()) {
    return mockBlogPosts
      .filter(post => post.slug !== currentSlug && post.status === 'published')
      .slice(0, limit);
  }
  
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .limit(10);
    
    // Filter and sort by relevance
    const relatedPosts = posts
      .filter((p: any) => p.slug !== currentSlug)
      .map((p: any) => {
        const commonTags = p.tags.filter((tag: string) => 
          tags.some((currentTag: string) => currentTag.toLowerCase() === tag.toLowerCase())
        );
        return {
          ...p,
          relevanceScore: commonTags.length,
        };
      })
      .filter((p: any) => p.relevanceScore > 0)
      .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
      
    return relatedPosts;
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return mockBlogPosts
      .filter(post => post.slug !== currentSlug && post.status === 'published')
      .slice(0, limit);
  }
}