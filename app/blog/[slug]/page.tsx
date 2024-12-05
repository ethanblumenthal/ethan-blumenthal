'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/fade-in';
import { useParams } from 'next/navigation';

const posts = {
  'designing-for-accessibility': {
    title: 'Designing for Accessibility: Making the Web Inclusive for All',
    date: 'Jun 19, 2024',
    content: `
      Accessibility in web design is not just a trend but a necessity. As the internet becomes an integral part of daily life, it's crucial to ensure that websites are usable by everyone, including people with disabilities. Designing for accessibility means creating digital experiences that are inclusive and considerate of all users, regardless of their abilities. This article explores the importance of web accessibility and offers practical steps for implementing it effectively.

      ## The Importance of Accessibility

      ### 1. Legal Compliance

      Many countries have laws and regulations requiring websites to be accessible to people with disabilities. In the United States, the Americans with Disabilities Act (ADA) and Section 508 of the Rehabilitation Act mandate web accessibility for government and public sector websites. Non-compliance can result in legal actions and fines, making it imperative for organizations to prioritize accessibility.
    `,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <FadeIn>
        <Button variant="outline" className="mb-8 border-gray-800" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">{post.title}</h1>
          <time className="text-gray-400 block">{post.date}</time>
        </div>
      </FadeIn>

      <div className="prose prose-invert mt-12">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('##')) {
            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                  {paragraph.replace('## ', '')}
                </h2>
              </FadeIn>
            );
          }
          if (paragraph.startsWith('###')) {
            return (
              <FadeIn key={index} delay={0.3 + index * 0.1}>
                <h3 className="text-2xl font-bold text-white mt-6 mb-4">
                  {paragraph.replace('### ', '')}
                </h3>
              </FadeIn>
            );
          }
          return (
            <FadeIn key={index} delay={0.3 + index * 0.1}>
              <p className="text-gray-400 text-lg leading-relaxed mb-4">
                {paragraph}
              </p>
            </FadeIn>
          );
        })}
      </div>
    </article>
  );
}
