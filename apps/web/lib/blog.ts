import readingTime from 'reading-time';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: string;
}

export interface BlogPostMeta {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: string;
}

// Helper function to calculate reading time from content
export function calculateReadingTime(content: string): string {
  const readTime = readingTime(content);
  return readTime.text;
}

// Helper function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to add reading time to blog posts
export function addReadingTime(post: BlogPost): BlogPost {
  return {
    ...post,
    readingTime: calculateReadingTime(post.content),
  };
}

// Helper function to add reading time to blog post metadata
export function addReadingTimeToMeta(post: Omit<BlogPostMeta, 'readingTime'> & { content?: string }): BlogPostMeta {
  return {
    ...post,
    readingTime: post.content ? calculateReadingTime(post.content) : '5 min read',
  };
}

// Legacy functions for backward compatibility - these should be replaced with tRPC calls in components
export function getBlogPostsByTag(tag: string, posts: BlogPostMeta[]): BlogPostMeta[] {
  return posts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(posts: BlogPostMeta[]): string[] {
  const tagCounts = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.keys()).sort();
}

export function getRelatedPosts(currentSlug: string, tags: string[], posts: BlogPostMeta[], limit: number = 3): BlogPostMeta[] {
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const commonTags = post.tags.filter(tag => 
        tags.some(currentTag => currentTag.toLowerCase() === tag.toLowerCase())
      );
      return {
        ...post,
        relevanceScore: commonTags.length,
      };
    })
    .filter((post: any) => post.relevanceScore > 0)
    .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);

  return relatedPosts;
}