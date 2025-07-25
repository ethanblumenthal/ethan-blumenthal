'use client';

import FadeIn from '@/components/fade-in';
import BlogHeader from '@/components/blog/blog-header';
import BlogCard from '@/components/blog/blog-card';
import { trpc } from '@/lib/trpc';
import { addReadingTimeToMeta } from '@/lib/blog';

export default function BlogPage() {
  const { data: blogData, isLoading, error } = trpc.blog.getAll.useQuery({
    status: 'published',
    limit: 50,
    offset: 0,
  });

  const posts = blogData?.posts?.map(post => addReadingTimeToMeta({
    ...post,
    excerpt: post.excerpt || '',
    featuredImage: post.featuredImage || undefined,
    createdAt: post.createdAt.toString(),
    updatedAt: post.updatedAt.toString(),
    publishedAt: post.publishedAt?.toString(),
  })) || [];

  if (isLoading) {
    return (
      <div>
        <FadeIn>
          <BlogHeader />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <FadeIn>
          <BlogHeader />
        </FadeIn>
        <div className="col-span-2 text-center py-12">
          <p className="text-red-400 text-lg">Error loading blog posts</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FadeIn>
        <BlogHeader />
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <FadeIn key={post.slug} delay={0.2 * (index + 1)}>
              <BlogCard 
                title={post.title}
                date={post.publishedAt || post.createdAt}
                image={post.featuredImage || '/placeholder.svg'}
                slug={post.slug}
                excerpt={post.excerpt}
                readingTime={post.readingTime}
                tags={post.tags}
              />
            </FadeIn>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-400 text-lg">No blog posts available yet.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for insights on PropTech, Bitcoin, and commercial real estate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
