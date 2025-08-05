import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/blog';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SocialShare from '@/components/blog/social-share';
import { db, blogPosts } from '@personal-app/db';
import { eq } from 'drizzle-orm';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.status, 'published'));
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Ethan Blumenthal`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

const markdownComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 {...props} className="text-4xl font-bold text-white mb-6 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 {...props} className="text-3xl font-bold text-white mb-4 mt-8 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 {...props} className="text-2xl font-bold text-white mb-3 mt-6">
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p {...props} className="text-gray-300 mb-4 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul {...props} className="text-gray-300 mb-4 pl-6 space-y-2 list-disc">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol {...props} className="text-gray-300 mb-4 pl-6 space-y-2 list-decimal">
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li {...props} className="text-gray-300 leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote {...props} className="border-l-4 border-primary pl-4 py-2 mb-4 bg-gray-800/50 rounded-r-lg text-gray-300 italic">
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: any) => (
    <code {...props} className="bg-gray-800 text-primary px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre {...props} className="bg-gray-900 text-gray-300 p-4 rounded-lg mb-4 overflow-x-auto">
      {children}
    </pre>
  ),
  table: ({ children, ...props }: any) => (
    <div className="overflow-x-auto mb-4">
      <table {...props} className="min-w-full border-collapse border border-gray-700">
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: any) => (
    <th {...props} className="border border-gray-700 bg-gray-800 px-4 py-2 text-left text-white font-semibold">
      {children}
    </th>
  ),
  td: ({ children, ...props }: any) => (
    <td {...props} className="border border-gray-700 px-4 py-2 text-gray-300">
      {children}
    </td>
  ),
  a: ({ children, ...props }: any) => (
    <a 
      {...props}
      className="text-primary hover:text-primary/80 underline underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

  if (!post) {
    notFound();
  }

  // Get related posts based on tags
  const relatedPostsQuery = await db.select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .limit(10);
  
  const relatedPosts = relatedPostsQuery
    .filter(p => p.slug !== slug)
    .map(p => {
      const commonTags = p.tags.filter(tag => 
        post.tags.some(currentTag => currentTag.toLowerCase() === tag.toLowerCase())
      );
      return {
        ...p,
        relevanceScore: commonTags.length,
      };
    })
    .filter(p => p.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6 text-gray-400 hover:text-white">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt?.toISOString() || post.createdAt.toISOString())}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>
        </div>

        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Share */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <SocialShare
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/blog/${slug}`}
            excerpt={post.excerpt || undefined}
          />
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none mb-8">
        <ReactMarkdown components={markdownComponents}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Post Footer - Share & Engagement */}
      <div className="border-t border-b border-gray-800 py-8 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Found this article helpful?</h3>
            <p className="text-gray-400 text-sm">Share it with your network and help others discover valuable insights.</p>
          </div>
          <SocialShare
            title={post.title}
            url={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/blog/${slug}`}
            excerpt={post.excerpt || undefined}
            className="ml-6"
          />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{formatDate(relatedPost.publishedAt?.toISOString() || relatedPost.createdAt.toISOString())}</span>
                    <span>{Math.ceil(relatedPost.content.split(' ').length / 200)} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="border-t border-gray-800 pt-12 mt-12">
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-gray-300 mb-6">
            Subscribe to get more insights on PropTech, Bitcoin, and commercial real estate investing.
          </p>
          <Button asChild>
            <Link href="/#newsletter">Subscribe to Newsletter</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}