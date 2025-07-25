'use client';

import { Button } from '@personal-app/ui';
import Link from 'next/link';
import { trpc } from '@/lib/trpc';
import { formatDate } from '@/lib/blog';

export default function RecentPosts() {
  const { data: blogData, isLoading } = trpc.blog.getAll.useQuery({
    status: 'published',
    limit: 3,
    offset: 0,
  });

  const posts = blogData?.posts || [];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">Recent Blog Posts</h2>
        <Button
          variant="outline"
          className="border-gray-800 hover:bg-gray-800"
          asChild
        >
          <Link href="/blog">View Blog</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeleton
          [...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
              <div className="bg-gray-800 h-4 rounded mb-2"></div>
              <div className="bg-gray-800 h-4 rounded w-3/4"></div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border border-dashed border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <img
                  src={post.featuredImage || '/placeholder.svg'}
                  alt=""
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <time className="text-sm text-gray-400">
                  {formatDate(post.publishedAt?.toString() || post.createdAt.toString())}
                </time>
                <h3 className="text-xl font-semibold mt-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-400">No blog posts available yet.</p>
            <p className="text-gray-500 text-sm mt-1">Check back soon for insights on PropTech and CRE.</p>
          </div>
        )}
      </div>
    </section>
  );
}
